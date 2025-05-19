import staffRepository from "../repositories/staffRepository.js"
import { Staff } from "../models/Staff.js"
import TokenService from "./tokenService.js"
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

    async findByCorreo(correo) {
        const staff = this.staffRepository.findByCorreo(correo)
        if(!staff) {
            throw { message: 'Staff No Encontrado', statusCode: 404 }
        }

        return staff
    }

    async findByRol(rol) {
        return await this.staffRepository.findByRol(rol)
    }

    async create(staffData) {
        const { nombre, apaterno, amaterno, correo, password } = staffData;

        const uniquestaff = await this.staffRepository.findByCorreo(correo);
        if (uniquestaff) {
            throw { message: 'El correo ya existe', statusCode: 400 };
        }

        const uniqueFullname = await this.staffRepository.findByFullname(nombre, apaterno, amaterno);
        if (uniqueFullname) {
            throw { message: 'Ya existe un correo con el mismo nombre completo', statusCode: 400 };
        }

        const randomDigits = Math.floor(100 + Math.random() * 900);
        const staffid = `${nombre[0]}${apaterno[0]}${amaterno[0]}${randomDigits}`.toUpperCase();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newstaff = new Staff({ ...staffData, password: hashedPassword, staffid });
        return this.staffRepository.create({ ...newstaff });
    }

    async update(id, staffData) {
        const { password } = staffData
        const updatestaff = await this.staffRepository.getById(id)

        if (!updatestaff) {
            throw { message: 'Staff No Encontrado', statusCode: 404 }
        }

        if(password) {
            updatestaff.password = await bcrypt.hash(password, 10)
        }

        const newstaff = new Staff({ ...updatestaff, ...staffData, password: updatestaff.password })

        return this.staffRepository.update(id, { ...newstaff })
    }

    async delete(id) {
        const staffExists = await this.staffRepository.getById(id)
        if(!staffExists) {
            throw { message: 'Staff No Encontrado', statusCode: 404 }
        }

        await this.staffRepository.delete(id)
    }

    async login(correo, password) {
        const staff = await this.staffRepository.findByCorreo(correo)
        if(!staff) {
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        if(staff.bloqueado) {
            throw { message: 'Staff Bloqueado, contacta al administrador.', statusCode: 401 }
        }

        const existingToken = await this.staffRepository.getSessionToken(staff.id)
        console.log(existingToken);
        
        if (TokenService.isTokenRevoked(existingToken)) {
            await this.staffRepository.updateSessionToken(staff.id, null)
        }else if(existingToken) {
            throw { message: 'Ya hay un sesión activa', statusCode: 401 }
        }

        const validPassword = await bcrypt.compare(password, staff.password)
        if(!validPassword) {
            await this.handleFailedLogin(staff.id)
            throw { message: 'Contraseña Incorrecta', statusCode: 401 }
        }

        const token = jwt.sign({ 
            id: staff.id, 
            correo: staff.correo, 
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
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        await this.staffRepository.update(id, { bloqueado: false, intentos: 0 })
    }

    async handleFailedLogin(id) {
        const staff = await this.staffRepository.getById(id)
        const intentos = parseInt(staff.intentos) + 1
        console.log('@@@ intentos => ', intentos, staff)
        if(intentos >= 3) {
            await this.staffRepository.update(id, { bloqueado: true })
            throw { message: 'Staff Bloqueado despues de 3 intentos, contacta al Administrados', statusCode: 401 }
        }
        await this.staffRepository.update(id, { intentos })
    }
    
    async getBystaff(correo) {
        const staff = await this.staffRepository.findByCorreo(correo)

        if(!staff) {
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        return staff
    }
}