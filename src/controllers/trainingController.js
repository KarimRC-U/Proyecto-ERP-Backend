import trainingService from "../services/trainingService.js"

export default class trainingController {
    constructor() {
        this.trainingService = new trainingService()
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

    async getAll(req, res, next) {
        try {
            const trainings = await this.trainingService.getAll()
            res.json({ trainings })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const training = await this.trainingService.getById(id)
            res.json({ training })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const trainings = await this.trainingService.getByDate(date)
            res.json({ trainings })
        } catch (error) {
            next(error)
        }
    }

    async getTotalRequests(req, res, next) {
        try {
            const total = await this.trainingService.getTotalRequests()
            res.json({ total })
        } catch (error) {
            next(error)
        }
    }

    async getTotalStaffTrained(req, res, next) {
        try {
            const total = await this.trainingService.getTotalStaffTrained()
            res.json({ total })
        } catch (error) {
            next(error)
        }
    }

    async getTotalDone(req, res, next) {
        try {
            const total = await this.trainingService.getTotalDone()
            res.json({ total })
        } catch (error) {
            next(error)
        }
    }

    async getStaffTrainingRate(req, res, next) {
        try {
            const rate = await this.trainingService.getStaffTrainingRate()
            res.json({ rate })
        } catch (error) {
            next(error)
        }
    }
}