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
        const { id, title, sentFrom, sentTo = [], date, message } = circularData;

        const uniqueCircular = await this.circularRepository.getById(id);
        if (uniqueCircular) {
            throw { message: 'Este circular ya existe', statusCode: 400 };
        }

        const newCircular = new Circular({ id, title, sentFrom, sentTo, date, message });
        const docRef = this.collection.doc(circular.id.toString());
        await docRef.set(circular);
        return {
            id: circular.id,
            ...circular
        }
    }

    async update(id, circularData) {
        const existingCircular = await this.circularRepository.getById(id);

        if (!existingCircular) {
            throw { message: 'Circular No Encontrado', statusCode: 404 }
        }

        const updatedCircular = new Circular({ ...existingCircular, ...circularData });

        return this.circularRepository.update(id, { ...updatedCircular });
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