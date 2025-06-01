import trainingRepository from "../repositories/trainingRepository.js"
import { Training } from "../models/Training.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class trainingService {
    constructor() {
        this.trainingRepository = new trainingRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.trainingRepository.getAll()
    }

    async findByCorreo(correo) {
        const training = this.trainingRepository.findByCorreo(correo)
        if (!training) {
            throw { message: 'Training No Encontrado', statusCode: 404 }
        }

        return training
    }

    async findByRol(rol) {
        return await this.trainingRepository.findByRol(rol)
    }

    async create(trainingData) {
        const { description, startDate, type, duration, mode, status } = trainingData;

        const newTraining = new Training({ description, startDate, type, duration, mode, status });
        return this.trainingRepository.create({ ...newTraining });
    }

    async update(id, trainingData) {
        const existingTraining = await this.trainingRepository.getById(id);
        if (!existingTraining) {
            throw { message: 'Training No Encontrado', statusCode: 404 }
        }
        const updatedTraining = new Training({ ...existingTraining, ...trainingData });
        return this.trainingRepository.update(id, { ...updatedTraining });
    }

    async delete(id) {
        const trainingExists = await this.trainingRepository.getById(id)
        if (!trainingExists) {
            throw { message: 'Training No Encontrado', statusCode: 404 }
        }

        await this.trainingRepository.delete(id)
    }

    async getByTraining(correo) {
        const staff = await this.staffRepository.findByCorreo(correo)

        if (!staff) {
            throw { message: 'El correo no existe', statusCode: 404 }
        }

        return training
    }
}