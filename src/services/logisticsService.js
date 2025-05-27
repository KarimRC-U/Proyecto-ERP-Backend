import logisticsRepository from "../repositories/logisticsRepository.js"
import { Logistics } from "../models/Logistics.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class logisticsService {
    constructor() {
        this.logisticsRepository = new logisticsRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.logisticsRepository.getAll()
    }

    async findByCorreo(correo) {
        const logistics = this.logisticsRepository.findByCorreo(correo)
        if (!logistics) {
            throw { message: 'Logistics No Encontrado', statusCode: 404 }
        }

        return logistics
    }

    async findByRol(rol) {
        return await this.logisticsRepository.findByRol(rol)
    }

    async create(staffData) {
        const { nombre, apaterno, amaterno, correo, password } = staffData;

        const uniquestaff = await this.staffRepository.findByCorreo(correo);
        if (uniquestaff) {
            throw { message: 'El correo ya existe', statusCode: 400 };
        }

        const uniqueFullname = await this.staffRepository.findByFullname(nombre, apaterno, amaterno);
        if (uniqueFullname) {
            throw { message: 'Ya existe un correo con el mismo nombre completo', statusCode: 400 };
        }

        const randomDigits = Math.floor(100 + Math.random() * 900);
        const staffid = `${nombre[0]}${apaterno[0]}${amaterno[0]}${randomDigits}`.toUpperCase();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newstaff = new Logistics({ ...staffData, password: hashedPassword, staffid });
        return this.staffRepository.create({ ...newstaff });
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

        const newstaff = new Logistics({ ...updatestaff, ...staffData, password: updatestaff.password })

        return this.logisticsRepository.update(id, { ...newstaff })
    }

    async delete(id) {
        const logisticsExists = await this.logisticsRepository.getById(id)
        if (!logisticsExists) {
            throw { message: 'Logistics No Encontrado', statusCode: 404 }
        }

        await this.logisticsRepository.delete(id)
    }

    async getByLogistics(correo) {
        const staff = await this.staffRepository.findByCorreo(correo)

        if (!staff) {
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        return logistics
    }

    async getById(id) {
        const logistics = await this.logisticsRepository.getById(id);
        if (!logistics) {
            throw { message: 'Logistics No Encontrado', statusCode: 404 };
        }
        return logistics;
    }

    async getByTitle(title) {
        return await this.logisticsRepository.getByTitle(title);
    }

    async getByStaff(staffid) {
        return await this.logisticsRepository.getByStaff(staffid);
    }

    async getTotalRequests() {
        return await this.logisticsRepository.getTotalRequests();
    }

    async getTotalCosts() {
        return await this.logisticsRepository.getTotalCosts();
    }

    async getPending() {
        return await this.logisticsRepository.getPending();
    }

    async getApproved() {
        return await this.logisticsRepository.getApproved();
    }
}