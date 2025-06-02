import circularRepository from "../repositories/circularRepository.js"
import { Circular } from "../models/Circular.js"
export default class circularService {
    constructor() {
        this.circularRepository = new circularRepository()
    }

    async create(circularData) {
        const { id, title, sentFrom, sentTo = [], date, message } = circularData;

        const allCirculars = await this.circularRepository.getAll();
        const duplicate = allCirculars.find(
            c => c.title === title && c.date === date
        );
        if (duplicate) {
            throw { message: 'Ya existe una circular con este título y fecha', statusCode: 400 };
        }

        const newCircular = new Circular(circularData);
        return this.circularRepository.create({ ...newCircular });
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