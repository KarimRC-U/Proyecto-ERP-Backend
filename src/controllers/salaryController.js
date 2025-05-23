import salaryService from "../services/salaryService.js"

export default class salaryController {
    constructor() {
        this.salaryService = new salaryService()
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

    async getAll(req, res, next) {
        try {
            const salarys = await this.salaryService.getAll()
            res.json({ salarys })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const salary = await this.salaryService.getById(id)
            res.json({ salary })
        } catch (error) {
            next(error)
        }
    }

}