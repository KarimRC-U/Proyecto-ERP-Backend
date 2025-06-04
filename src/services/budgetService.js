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
        const { title, date } = budgetData;

        const allBudgets = await this.budgetRepository.getAll();
        const duplicate = allBudgets.find(
            b => b.title === title && b.date === date
        );
        if (duplicate) {
            throw { message: 'Ya existe un presupuesto con este título y fecha', statusCode: 400 };
        }

        const newBudget = new Budget(budgetData);
        return this.budgetRepository.create({ ...newBudget });
    }

    async update(id, budgetData) {
        const existingBudget = await this.budgetRepository.getById(id);

        if (!existingBudget) {
            throw { message: 'Presupuesto no Encontrado', statusCode: 404 };
        }

        const updatedBudget = new Budget({ ...existingBudget, ...budgetData });

        return this.budgetRepository.update(id, { ...updatedBudget });
    }

    async delete(id) {
        const budgetExists = await this.budgetRepository.getById(id)
        if (!budgetExists) {
            throw { message: 'No se pudo encontrar un presupuesto con estos datos.', statusCode: 404 }
        }
        await this.budgetRepository.delete(id)
    }

    async getAnnualBudget() {
        return await this.budgetRepository.getAnnualBudget();
    }

    async getById(id) {
        const budget = await this.budgetRepository.getById(id);
        if (!budget) {
            throw { message: 'Presupuesto no encontrado', statusCode: 404 };
        }
        return budget;
    }
}