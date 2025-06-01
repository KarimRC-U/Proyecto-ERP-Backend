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

    async create(taxData) {
        const { taxType, percentageValue } = taxData;
        const newTax = new Tax({ taxType, percentageValue });
        return this.taxRepository.create({ ...newTax });
    }

    async update(id, taxData) {
        const existingTax = await this.taxRepository.getById(id);
        if (!existingTax) {
            throw { message: 'Tax No Encontrado', statusCode: 404 }
        }
        const updatedTax = new Tax({ ...existingTax, ...taxData });
        return this.taxRepository.update(id, { ...updatedTax });
    }

    async delete(id) {
        const taxExists = await this.taxRepository.getById(id)
        if (!taxExists) {
            throw { message: 'Tax No Encontrado', statusCode: 404 }
        }

        await this.taxRepository.delete(id)
    }

    async getAll() {
        return await this.taxRepository.getAll()
    }
}