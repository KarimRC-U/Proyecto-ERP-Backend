import memoService from "../services/memoService.js"

export default class memoController {
    constructor() {
        this.memoService = new memoService()
    }

    async getAll(req, res, next) {
        try {
            const memos = await this.memoService.getAll()
            res.json({ memos })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { memoNo } = req.params
            const memo = await this.memoService.findByNumber(memoNo)
            res.json({ memo })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const memo = await this.memoService.findByDate(date)
            res.json({ memo })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const memoData = req.body
            const memo = await this.memoService.create(memoData)
            res.status(201).json(memo)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const memoData = req.body
            const memo = await this.memoService.update(id, memoData)
            res.json(memo)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.memoService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.memoService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}