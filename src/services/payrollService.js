import payrollRepository from "../repositories/payrollRepository.js"
import { Payroll } from "../models/Payroll.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class payrollService {
    constructor() {
        this.payrollRepository = new payrollRepository()
        this.tokenService = new TokenService()
    }

    async create(payrollData) {
        const { paymentMonth, paymentYear } = payrollData;
        
        const allPayrolls = await this.payrollRepository.getAll();
        const duplicate = allPayrolls.find(
            p => p.paymentMonth === paymentMonth && p.paymentYear === paymentYear
        );
        if (duplicate) {
            throw { message: 'Ya existe una nómina para este mes y año', statusCode: 400 };
        }

        const newPayroll = new Payroll(payrollData);
        return this.payrollRepository.create({ ...newPayroll });
    }

    async update(id, payrollData) {
        const existingPayroll = await this.payrollRepository.getById(id);
        if (!existingPayroll) {
            throw { message: 'No se pudo encontrar un payroll con estos datos.', statusCode: 404 }
        }
        const updatedPayroll = new Payroll({ ...existingPayroll, ...payrollData });
        return this.payrollRepository.update(id, { ...updatedPayroll });
    }

    async delete(id) {
        const payrollExists = await this.payrollRepository.getById(id)
        if (!payrollExists) {
            throw { message: 'No se pudo encontrar un payroll con estos datos.', statusCode: 404 }
        }

        await this.payrollRepository.delete(id)
    }

    async getAll() {
        return await this.payrollRepository.getAll()
    }

    async getById(id) {
        const payroll = await this.payrollRepository.getById(id)
        if (!payroll) {
            throw { message: 'No se pudo encontrar un payroll con estos datos.', statusCode: 404 }
        }

        return payroll
    }

    async getMonthGrossSalary(month, year) {
        return await this.payrollRepository.getMonthGrossSalary(month, year);
    }

    async getMonthNetSalary(month, year) {
        return await this.payrollRepository.getMonthNetSalary(month, year);
    }

    async getMonthTotalTax(month, year) {
        return await this.payrollRepository.getMonthTotalTax(month, year);
    }

    async getMonthTotalLoan(month, year) {
        return await this.payrollRepository.getMonthTotalLoan(month, year);
    }
}