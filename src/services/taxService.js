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

        const allTaxes = await this.taxRepository.getAll();
        const duplicate = allTaxes.find(t => t.taxType === taxType);
        if (duplicate) {
            throw { message: 'Ya existe un impuesto con este tipo', statusCode: 400 };
        }

        const newTax = new Tax({ taxType, percentageValue });
        return this.taxRepository.create({ ...newTax });
    }

    async update(id, taxData) {
        const existingTax = await this.taxRepository.getById(id);
        if (!existingTax) {
            throw { message: 'No se pudo encontrar un impuesto con estos datos.', statusCode: 404 }
        }
        const updatedTax = new Tax({ ...existingTax, ...taxData });
        return this.taxRepository.update(id, { ...updatedTax });
    }

    async delete(id) {
        const taxExists = await this.taxRepository.getById(id)
        if (!taxExists) {
            throw { message: 'No se pudo encontrar un impuesto con estos datos.', statusCode: 404 }
        }

        await this.taxRepository.delete(id)
    }

    async getAll() {
        return await this.taxRepository.getAll()
    }

    async getById(id) {
        const tax = await this.taxRepository.getById(id)
        if (!tax) {
            throw { message: 'No se pudo encontrar un impuesto con estos datos.', statusCode: 404 }
        }
        return tax
    }
}