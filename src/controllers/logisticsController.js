import logisticsService from "../services/logisticsService.js"

export default class logisticsController {
    constructor() {
        this.logisticsService = new logisticsService()
    }

    async getAll(req, res, next) {
        try {
            const logisticss = await this.logisticsService.getAll()
            res.json({ logisticss })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { logisticsNo } = req.params
            const logistics = await this.logisticsService.findByNumber(logisticsNo)
            res.json({ logistics })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const logistics = await this.logisticsService.findByDate(date)
            res.json({ logistics })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const logisticsData = req.body
            const logistics = await this.logisticsService.create(logisticsData)
            res.status(201).json(logistics)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const logisticsData = req.body
            const logistics = await this.logisticsService.update(id, logisticsData)
            res.json(logistics)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.logisticsService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.logisticsService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}