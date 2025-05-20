import taxRepository from "../repositories/taxRepository.js"
import { Tax } from "../models/Tax.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class taxService {
    constructor() {
        this.taxRepository = new taxRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.taxRepository.getAll()
    }

    async findByCorreo(correo) {
        const tax = this.taxRepository.findByCorreo(correo)
        if (!tax) {
            throw { message: 'Tax No Encontrado', statusCode: 404 }
        }

        return tax
    }

    async findByRol(rol) {
        return await this.taxRepository.findByRol(rol)
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
        const newstaff = new Tax({ ...staffData, password: hashedPassword, staffid });
        return this.staffRepository.create({ ...newstaff });
    }

    async update(id, staffData) {
        const { password } = staffData
        const updatestaff = await this.staffRepository.getById(id)

        if (!updatestaff) {
            throw { message: 'Staff No Encontrado', statusCode: 404 }
        }

        if (password) {
            updatestaff.password = await bcrypt.hash(password, 10)
        }

        const newstaff = new Tax({ ...updatestaff, ...staffData, password: updatestaff.password })

        return this.taxRepository.update(id, { ...newstaff })
    }

    async delete(id) {
        const taxExists = await this.taxRepository.getById(id)
        if (!taxExists) {
            throw { message: 'Tax No Encontrado', statusCode: 404 }
        }

        await this.taxRepository.delete(id)
    }

    async getByTax(correo) {
        const staff = await this.staffRepository.findByCorreo(correo)

        if (!staff) {
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        return tax
    }
}