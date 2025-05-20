import salaryService from "../services/salaryService.js"

export default class salaryController {
    constructor() {
        this.salaryService = new salaryService()
    }

    async getAll(req, res, next) {
        try {
            const salarys = await this.salaryService.getAll()
            res.json({ salarys })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { salaryNo } = req.params
            const salary = await this.salaryService.findByNumber(salaryNo)
            res.json({ salary })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const salary = await this.salaryService.findByDate(date)
            res.json({ salary })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const salaryData = req.body
            const salary = await this.salaryService.create(salaryData)
            res.status(201).json(salary)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const salaryData = req.body
            const salary = await this.salaryService.update(id, salaryData)
            res.json(salary)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.salaryService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.salaryService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}