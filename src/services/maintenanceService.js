import maintenanceRepository from "../repositories/maintenanceRepository.js"
import { MaintenanceSchedule } from "../models/Maintenance.js"

export default class maintenanceService {
    constructor() {
        this.maintenanceRepository = new maintenanceRepository()
    }

    async create(maintenanceData) {
        const { id, itemName, itemNumber, date, type, isRecurring = false, status = "Unknown" } = maintenanceData;

        const allMaintenances = await this.maintenanceRepository.getAll();
        const duplicate = allMaintenances.find(
            m => m.itemName === itemName && m.itemNumber === itemNumber && m.date === date
        );
        if (duplicate) {
            throw { message: 'Ya existe un mantenimiento para este artículo y fecha', statusCode: 400 };
        }

        const newMaintenance = new MaintenanceSchedule({ id, itemName, itemNumber, date, type, isRecurring, status });
        return this.maintenanceRepository.create({ ...newMaintenance });
    }

    async update(id, maintenanceData) {
        const { itemName, itemNumber, date, type, isRecurring = false, status = "Unknown" } = maintenanceData;
        const existingMaintenance = await this.maintenanceRepository.getById(id);
        if (!existingMaintenance) {
            throw { message: 'Maintenance No Encontrado', statusCode: 404 }
        }
        const updatedMaintenance = new MaintenanceSchedule({
            ...existingMaintenance,
            itemName,
            itemNumber,
            date,
            type,
            isRecurring,
            status
        });
        return this.maintenanceRepository.update(id, { ...updatedMaintenance });
    }

    async delete(id) {
        const maintenanceExists = await this.maintenanceRepository.getById(id)
        if (!maintenanceExists) {
            throw { message: 'Maintenance No Encontrado', statusCode: 404 }
        }
        await this.maintenanceRepository.delete(id)
    }

    async getAll() {
        return await this.maintenanceRepository.getAll()
    }

    async getTotalSchedules() {
        return await this.maintenanceRepository.getTotalSchedules();
    }

    async getTotalCompleted() {
        return await this.maintenanceRepository.getTotalCompleted();
    }

    async getTotalPending() {
        return await this.maintenanceRepository.getTotalPending();
    }

    async getTotalOverdue() {
        return await this.maintenanceRepository.getTotalOverdue();
    }

    async getByItemName(itemName) {
        return await this.maintenanceRepository.getByItemName(itemName);
    }

    async getByItemNumber(itemNumber) {
        return await this.maintenanceRepository.getByItemNumber(itemNumber);
    }

    async getByDate(date) {
        return await this.maintenanceRepository.getByDate(date);
    }

    async getDetails(itemName, itemNumber) {
        return await this.maintenanceRepository.getDetails(itemName, itemNumber);
    }
}