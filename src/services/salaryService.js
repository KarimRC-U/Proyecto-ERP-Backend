import salaryRepository from "../repositories/salaryRepository.js"
import { Salary } from "../models/Salary.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class salaryService {
    constructor() {
        this.salaryRepository = new salaryRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.salaryRepository.getAll()
    }

    async getById(id) {
        const salary = this.salaryRepository.getById(id)
        if (!salary) {
            throw { message: 'Salary No Encontrado', statusCode: 404 }
        }

        return salary
    }

    async findByRol(rol) {
        return await this.salaryRepository.findByRol(rol)
    }

    async create(salaryData) {
        const { title, level } = salaryData;

        const existing = await this.salaryRepository.findByTitleAndLevel(title, level);
        if (existing) {
            throw { message: 'Salario ya existe para este titulo y rango.', statusCode: 400 };
        }

        const {
            basicSalary,
            allowance = 0,
            deductions = 0
        } = salaryData;

        const newsalary = new Salary({
            title,
            level,
            basicSalary,
            allowance,
            deductions
        });

        return this.salaryRepository.create({ ...newsalary });
    }

    async update(id, salaryData) {
        const updatesalary = await this.salaryRepository.getById(id);

        if (!updatesalary) {
            throw { message: 'Salary No Encontrado', statusCode: 404 };
        }

        const newsalary = new Salary({ ...updatesalary, ...salaryData });

        return this.salaryRepository.update(id, { ...newsalary });
    }

    async delete(id) {
        const salaryExists = await this.salaryRepository.getById(id)
        if (!salaryExists) {
            throw { message: 'Salary No Encontrado', statusCode: 404 }
        }

        await this.salaryRepository.delete(id)
    }

}