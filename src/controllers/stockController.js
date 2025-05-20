import stockService from "../services/stockService.js"

export default class stockController {
    constructor() {
        this.stockService = new stockService()
    }

    async getAll(req, res, next) {
        try {
            const stocks = await this.stockService.getAll()
            res.json({ stocks })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { stockNo } = req.params
            const stock = await this.stockService.findByNumber(stockNo)
            res.json({ stock })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const stock = await this.stockService.findByDate(date)
            res.json({ stock })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const stockData = req.body
            const stock = await this.stockService.create(stockData)
            res.status(201).json(stock)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const stockData = req.body
            const stock = await this.stockService.update(id, stockData)
            res.json(stock)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.stockService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.stockService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}