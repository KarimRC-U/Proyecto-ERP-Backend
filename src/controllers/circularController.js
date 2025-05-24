import circularService from "../services/circularService.js"

export default class circularController {
    constructor() {
        this.circularService = new circularService()
    }

    async getAll(req, res, next) {
        try {
            const circulars = await this.circularService.getAll()
            res.json({ circulars })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { circularNo } = req.params
            const circular = await this.circularService.findByNumber(circularNo)
            res.json({ circular })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const circular = await this.circularService.findByDate(date)
            res.json({ circular })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const circularData = req.body
            const circular = await this.circularService.create(circularData)
            res.status(201).json(circular)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const circularData = req.body
            const circular = await this.circularService.update(id, circularData)
            res.json(circular)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.circularService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

}