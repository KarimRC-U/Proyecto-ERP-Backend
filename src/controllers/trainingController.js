import trainingService from "../services/trainingService.js"

export default class trainingController {
    constructor() {
        this.trainingService = new trainingService()
    }

    async getAll(req, res, next) {
        try {
            const trainings = await this.trainingService.getAll()
            res.json({ trainings })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { trainingNo } = req.params
            const training = await this.trainingService.findByNumber(trainingNo)
            res.json({ training })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const training = await this.trainingService.findByDate(date)
            res.json({ training })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const trainingData = req.body
            const training = await this.trainingService.create(trainingData)
            res.status(201).json(training)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const trainingData = req.body
            const training = await this.trainingService.update(id, trainingData)
            res.json(training)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.trainingService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

}