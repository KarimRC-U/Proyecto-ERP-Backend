import maintenanceRepository from "../repositories/maintenanceRepository.js"
import { Maintenance } from "../models/Maintenance.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class maintenanceService {
    constructor() {
        this.maintenanceRepository = new maintenanceRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.maintenanceRepository.getAll()
    }

    async findByCorreo(correo) {
        const maintenance = this.maintenanceRepository.findByCorreo(correo)
        if (!maintenance) {
            throw { message: 'Maintenance No Encontrado', statusCode: 404 }
        }

        return maintenance
    }

    async findByRol(rol) {
        return await this.maintenanceRepository.findByRol(rol)
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
        const newstaff = new Maintenance({ ...staffData, password: hashedPassword, staffid });
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

        const newstaff = new Maintenance({ ...updatestaff, ...staffData, password: updatestaff.password })

        return this.maintenanceRepository.update(id, { ...newstaff })
    }

    async delete(id) {
        const maintenanceExists = await this.maintenanceRepository.getById(id)
        if (!maintenanceExists) {
            throw { message: 'Maintenance No Encontrado', statusCode: 404 }
        }

        await this.maintenanceRepository.delete(id)
    }

    async getByMaintenance(correo) {
        const staff = await this.staffRepository.findByCorreo(correo)

        if (!staff) {
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        return maintenance
    }
}