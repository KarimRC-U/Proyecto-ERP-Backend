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

    async create(logisticsData) {
        const {
            title,
            purpose,
            amount,
            requestedBy,
            sentTo,
            date,
            status = "Pending"
        } = logisticsData;

        const id = await this.logisticsRepository.getNextId();

        const newLogistics = new Logistics({
            id,
            title,
            purpose,
            amount,
            requestedBy,
            sentTo,
            date,
            status
        });

        return this.logisticsRepository.create({ ...newLogistics });
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

    async getAll() {
        return await this.logisticsRepository.getAll()
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