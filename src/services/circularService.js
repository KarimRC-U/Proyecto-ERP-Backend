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

    async create(circularData) {
        const { circularNo, title, body, date, attachments = false, circularType } = circularData;

        const uniqueCircular = await this.circularRepository.findByNumber(circularNo);
        if (uniqueCircular) {
            throw { message: 'Este circular ya existe', statusCode: 400 };
        }

        const newCircular = new Circular({ circularNo, title, body, date, attachments, circularType });
        return this.circularRepository.create({ ...newCircular });
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