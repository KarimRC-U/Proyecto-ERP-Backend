import taxService from "../services/taxService.js"

export default class taxController {
    constructor() {
        this.taxService = new taxService()
    }

    async getAll(req, res, next) {
        try {
            const taxs = await this.taxService.getAll()
            res.json({ taxs })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { taxNo } = req.params
            const tax = await this.taxService.findByNumber(taxNo)
            res.json({ tax })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const tax = await this.taxService.findByDate(date)
            res.json({ tax })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const taxData = req.body
            const tax = await this.taxService.create(taxData)
            res.status(201).json(tax)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const taxData = req.body
            const tax = await this.taxService.update(id, taxData)
            res.json(tax)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.taxService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

}