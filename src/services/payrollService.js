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

    async getAll() {
        return await this.payrollRepository.getAll()
    }

    async findById(id) {
        const payroll = this.payrollRepository.findById(id)
        if (!payroll) {
            throw { message: 'Payroll No Encontrado', statusCode: 404 }
        }

        return payroll
    }

    async findByRol(rol) {
        return await this.payrollRepository.findByRol(rol)
    }

    async create(payrollData) {
        const { nombre, apaterno, amaterno, id, password } = payrollData;

        const uniquepayroll = await this.payrollRepository.findById(id);
        if (uniquepayroll) {
            throw { message: 'El id ya existe', statusCode: 400 };
        }

        const uniqueFullname = await this.payrollRepository.findByFullname(nombre, apaterno, amaterno);
        if (uniqueFullname) {
            throw { message: 'Ya existe un id con el mismo nombre completo', statusCode: 400 };
        }

        const randomDigits = Math.floor(100 + Math.random() * 900);
        const payrollid = `${nombre[0]}${apaterno[0]}${amaterno[0]}${randomDigits}`.toUpperCase();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newpayroll = new Payroll({ ...payrollData, password: hashedPassword, payrollid });
        return this.payrollRepository.create({ ...newpayroll });
    }

    async update(id, payrollData) {
        const { password } = payrollData
        const updatepayroll = await this.payrollRepository.getById(id)

        if (!updatepayroll) {
            throw { message: 'Payroll No Encontrado', statusCode: 404 }
        }

        if (password) {
            updatepayroll.password = await bcrypt.hash(password, 10)
        }

        const newpayroll = new Payroll({ ...updatepayroll, ...payrollData, password: updatepayroll.password })

        return this.payrollRepository.update(id, { ...newpayroll })
    }

    async delete(id) {
        const payrollExists = await this.payrollRepository.getById(id)
        if (!payrollExists) {
            throw { message: 'Payroll No Encontrado', statusCode: 404 }
        }

        await this.payrollRepository.delete(id)
    }

    async getByPayroll(id) {
        const payroll = await this.payrollRepository.findById(id)

        if (!payroll) {
            throw { message: 'El id no existe', statusCode: 404 }
        }

        return payroll
    }
}