import staffRepository from "../repositories/staffRepository.js"
import TokenService from "./tokenService.js"
import { Usuario } from "../models/Usuario.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class staffService {
    constructor() {
        this.staffRepository = new staffRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.staffRepository.getAll()
    }

    async findByStaff(usuario) {
        const staff = this.staffRepository.findByStaff(usuario)
        if(!staff) {
            throw { message: 'Usuario No Encontrado', statusCode: 404 }
        }

        return staff
    }

    async findByRol(rol) {
        return await this.staffRepository.findByRol(rol)
    }

    async create(staffData) {
        const { nombre, apaterno, amaterno, usuario, password } = staffData

        // Verificar que sea un usuario único
        const uniquestaff = await this.staffRepository.findByStaff(usuario)
        if(uniquestaff) {
            throw { message: 'El usuario ya existe', statusCode: 400 }
        }

        // Verificar si no hay otro registro con el mismo nombre
        const uniqueFullname = await this.staffRepository.findByFullname(nombre, apaterno, amaterno)
        if(uniqueFullname) {
            throw { message: 'Ya existe un usuario con el mismo nombre completo', statusCode: 400 }
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newstaff = new Usuario({ ...staffData, password: hashedPassword })
        return this.staffRepository.create({...newstaff})
    }

    async update(id, staffData) {
        const { password } = staffData
        const updatestaff = await this.staffRepository.getById(id)

        if (!updatestaff) {
            throw { message: 'Usuario No Encontrado', statusCode: 404 }
        }

        if(password) {
            updatestaff.password = await bcrypt.hash(password, 10)
        }

        const newstaff = new Usuario({ ...updatestaff, ...staffData, password: updatestaff.password })

        return this.staffRepository.update(id, { ...newstaff })
    }

    async delete(id) {
        const staffExists = await this.staffRepository.getById(id)
        if(!staffExists) {
            throw { message: 'Usuario No Encontrado', statusCode: 404 }
        }

        await this.staffRepository.delete(id)
    }

    async login(usuario, password) {
        const staff = await this.staffRepository.findByStaff(usuario)
        if(!staff) {
            throw { message: 'El usuario no existe', statusCode: 404 }
        }

        if(staff.bloqueado) {
            throw { message: 'Usuario Bloqueado, contacta al administrador.', statusCode: 401 }
        }

        const existingToken = await this.staffRepository.getSessionToken(staff.id)
        console.log(existingToken);
        if(existingToken) {
            throw { message: 'Ya hay un sesión activa', statusCode: 401 }
        }

        const validPassword = await bcrypt.compare(password, staff.password)
        if(!validPassword) {
            await this.handleFailedLogin(staff.id)
            throw { message: 'Contraseña Incorrecta', statusCode: 401 }
        }

        const token = jwt.sign({ 
            id: staff.id, 
            usuario: staff.usuario, 
            rol: staff.rol
        }, process.env.JWT_SECRET, { expiresIn: '1h' })

        await this.staffRepository.updateSessionToken(staff.id, token)
        return token
    }

    async logout(staffId, token) {
        const sessionToken = await this.staffRepository.getSessionToken(staffId)

        if(sessionToken !== token) {
            throw { message: 'Token Invalido', statusCode: 401 }
        }

        await this.staffRepository.updateSessionToken(staffId, null)
        await TokenService.revokedToken(token)
    }

    async unlockstaff(id) {
        const staff = await this.staffRepository.getById(id)
        if(!staff) {
            throw { message: 'El usuario no existe', statusCode: 404 }
        }

        await this.staffRepository.update(id, { bloqueado: false, intentos: 0 })
    }

    async handleFailedLogin(id) {
        const staff = await this.staffRepository.getById(id)
        const intentos = parseInt(staff.intentos) + 1
        console.log('@@@ intentos => ', intentos, staff)
        if(intentos >= 3) {
            await this.staffRepository.update(id, { bloqueado: true })
            throw { message: 'Usuario Bloqueado despues de 3 intentos, contacta al Administrados', statusCode: 401 }
        }
        await this.staffRepository.update(id, { intentos })
    }
    
    async getBystaff(usuario) {
        const staff = await this.staffRepository.findByStaff(usuario)

        if(!staff) {
            throw { message: 'El usuario no existe', statusCode: 404 }
        }

        return staff
    }
}