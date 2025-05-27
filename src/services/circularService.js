import circularRepository from "../repositories/circularRepository.js"
import { Circular } from "../models/Circular.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class circularService {
    constructor() {
        this.circularRepository = new circularRepository()
        this.tokenService = new TokenService()
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
        const newstaff = new Circular({ ...staffData, password: hashedPassword, staffid });
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

        const newstaff = new Circular({ ...updatestaff, ...staffData, password: updatestaff.password })

        return this.circularRepository.update(id, { ...newstaff })
    }

    async delete(id) {
        const circularExists = await this.circularRepository.getById(id)
        if (!circularExists) {
            throw { message: 'Circular No Encontrado', statusCode: 404 }
        }

        await this.circularRepository.delete(id)
    }

    async getAll() {
        return await this.circularRepository.getAll()
    }

    async getById(id) {
        const circular = await this.circularRepository.getById(id);
        if (!circular) {
            throw { message: 'Circular no encontrado', statusCode: 404 };
        }
        return circular;
    }

    async getByDate(date) {
        return await this.circularRepository.getByDate(date);
    }

    async getByDateOrder(date, order = 'asc') {
        return await this.circularRepository.getByDateOrder(date, order);
    }

    async getByKeywords(keywords) {
        return await this.circularRepository.findByKeywords(keywords);
    }

    async getTotalCirculars() {
        return await this.circularRepository.getTotalCirculars();
    }
}