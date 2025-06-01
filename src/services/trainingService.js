import trainingRepository from "../repositories/trainingRepository.js"
import { Training } from "../models/Training.js"
import TokenService from "./tokenService.js"
import staffRepository from "../repositories/staffRepository.js"
export default class trainingService {
    constructor() {
        this.trainingRepository = new trainingRepository()
        this.tokenService = new TokenService()
    }

    async create(trainingData) {
        const { description, startDate, type, duration, mode, status, staffList = [] } = trainingData;
        const newTraining = new Training({ description, startDate, type, duration, mode, status });
        return this.trainingRepository.create({ ...newTraining, staffList });
    }

    async update(id, trainingData) {
        const existingTraining = await this.trainingRepository.getById(id);
        if (!existingTraining) {
            throw { message: 'Training No Encontrado', statusCode: 404 }
        }
        const updatedTraining = new Training({ ...existingTraining, ...trainingData });
        return this.trainingRepository.update(id, { ...updatedTraining, staffList: trainingData.staffList || existingTraining.staffList });
    }

    async delete(id) {
        const trainingExists = await this.trainingRepository.getById(id)
        if (!trainingExists) {
            throw { message: 'Training No Encontrado', statusCode: 404 }
        }
        await this.trainingRepository.delete(id)
    }

    async getAll() {
        return await this.trainingRepository.getAll()
    }

    async getById(id) {
        const training = await this.trainingRepository.getById(id);
        if (!training) {
            throw { message: 'Training No Encontrado', statusCode: 404 }
        }
        return training;
    }

    async getByDate(date) {
        return await this.trainingRepository.getByDate(date);
    }

    async getTotalRequests() {
        const allTrainings = await this.trainingRepository.getAll();
        return allTrainings.length;
    }

    async getTotalStaffTrained() {
        const allTrainings = await this.trainingRepository.getAll();
        let total = 0;
        allTrainings.forEach(t => {
            if (Array.isArray(t.staffList)) {
                total += t.staffList.length;
            }
        });
        return total;
    }

    async getTotalDone() {
        const allTrainings = await this.trainingRepository.getAll();
        return allTrainings.filter(t => t.status === "Completed").length;
    }

    async getStaffTrainingRate() {
        const totalStaffTrained = await this.getTotalStaffTrained();
       const staffRepo = new staffRepository();
        const totalStaff = (await staffRepo.getAll()).length;
        if (!totalStaff || totalStaff === 0) return 0;
        return (totalStaffTrained / totalStaff) * 100;
    }
}