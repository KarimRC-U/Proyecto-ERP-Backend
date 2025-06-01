import logisticsRepository from "../repositories/logisticsRepository.js"
import { Logistics } from "../models/Logistics.js"
import TokenService from "./tokenService.js"

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

        const allLogistics = await this.logisticsRepository.getAll();
        const duplicate = allLogistics.find(
            l => l.title === title && l.date === date
        );
        if (duplicate) {
            throw { message: 'Ya existe una solicitud logística con este título y fecha', statusCode: 400 };
        }

        const id = await this.logisticsRepository.();

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

    async update(id, logisticsData) {
        const existingLogistics = await this.logisticsRepository.getById(id);
        if (!existingLogistics) {
            throw { message: 'Logistics No Encontrado', statusCode: 404 }
        }
        const updatedLogistics = new Logistics({ ...existingLogistics, ...logisticsData });
        return this.logisticsRepository.update(id, { ...updatedLogistics });
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