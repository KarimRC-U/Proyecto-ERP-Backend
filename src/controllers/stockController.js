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

    async getByName(req, res, next) {
        try {
            const { productName } = req.params
            const stocks = await this.stockService.getByName(productName)
            res.json({ stocks })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const stock = await this.stockService.getById(id)
            res.json({ stock })
        } catch (error) {
            next(error)
        }
    }

    async getTotalCategories(req, res, next) {
        try {
            const total = await this.stockService.getTotalCategories()
            res.json({ total })
        } catch (error) {
            next(error)
        }
    }

    async getTotalItems(req, res, next) {
        try {
            const total = await this.stockService.getTotalItems()
            res.json({ total })
        } catch (error) {
            next(error)
        }
    }

    async getTotalItemCost(req, res, next) {
        try {
            const total = await this.stockService.getTotalItemCost()
            res.json({ total })
        } catch (error) {
            next(error)
        }
    }

    async getItemsInLowStock(req, res, next) {
        try {
            const items = await this.stockService.getItemsInLowStock()
            res.json({ items })
        } catch (error) {
            next(error)
        }
    }
}