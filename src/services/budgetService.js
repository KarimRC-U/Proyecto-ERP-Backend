import budgetRepository from "../repositories/budgetRepository.js"
import { Budget } from "../models/Budget.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'

export default class budgetService {
    constructor() {
        this.budgetRepository = new budgetRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.budgetRepository.getAll()
    }

    async findByDate(date) {
        return await this.budgetRepository.findByDate(date)
    }

    async findByNumber (budgetNo) {
        const budget = await this.budgetRepository.findByNumber(budgetNo)
        if (!budget) {
            throw { message: 'El presupuesto no existe', statusCode: 404 }
        }
        return budget
    }

    async create(budgetData) {
        const { nombre, apaterno, amaterno, presupuesto, password } = budgetData;

        const uniquebudget = await this.budgetRepository.findByNumber(presupuesto);
        if (uniquebudget) {
            throw { message: 'El presupuesto ya existe', statusCode: 400 };
        }

        const uniqueFullname = await this.budgetRepository.findByNumber(nombre, apaterno, amaterno);
        if (uniqueFullname) {
            throw { message: 'Ya existe un presupuesto con el mismo nombre completo', statusCode: 400 };
        }

        const randomDigits = Math.floor(100 + Math.random() * 900);
        const budgetid = `${nombre[0]}${apaterno[0]}${amaterno[0]}${randomDigits}`.toUpperCase();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newbudget = new Budget({ ...budgetData, password: hashedPassword, budgetid });
        return this.budgetRepository.create({ ...newbudget });
    }

    async update(id, budgetData) {
        const { password } = budgetData
        const updatebudget = await this.budgetRepository.getById(id)

        if (!updatebudget) {
            throw { message: 'Presupuesto no Encontrado', statusCode: 404 }
        }

        if (password) {
            updatebudget.password = await bcrypt.hash(password, 10)
        }

        const newbudget = new Budget({ ...updatebudget, ...budgetData, password: updatebudget.password })

        return this.budgetRepository.update(id, { ...newbudget })
    }

    async delete(id) {
        const budgetExists = await this.budgetRepository.getById(id)
        if (!budgetExists) {
            throw { message: 'Budget No Encontrado', statusCode: 404 }
        }

        await this.budgetRepository.delete(id)
    }
}