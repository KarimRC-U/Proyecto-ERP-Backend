import budgetService from "../services/budgetService.js"

export default class budgetController {
    constructor() {
        this.budgetService = new budgetService()
    }

    async getAll(req, res, next) {
        try {
            const budgets = await this.budgetService.getAll()
            res.json({ budgets })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { budgetNo } = req.params
            const budget = await this.budgetService.findByNumber(budgetNo)
            res.json({ budget })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const budget = await this.budgetService.findByDate(date)
            res.json({ budget })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const budgetData = req.body
            const budget = await this.budgetService.create(budgetData)
            res.status(201).json(budget)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const budgetData = req.body
            const budget = await this.budgetService.update(id, budgetData)
            res.json(budget)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.budgetService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.budgetService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const budget = await this.budgetService.getById(id)
            res.json({ budget })
        } catch (error) {
            next(error)
        }
    }
}