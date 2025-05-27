import circularService from "../services/circularService.js"

export default class circularController {
    constructor() {
        this.circularService = new circularService()
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

    async getAll(req, res, next) {
        try {
            const circulars = await this.circularService.getAll()
            res.json({ circulars })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const circular = await this.circularService.getById(id);
            res.json({ circular });
        } catch (error) {
            next(error);
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params;
            const circulars = await this.circularService.getByDate(date);
            res.json({ circulars });
        } catch (error) {
            next(error);
        }
    }

    async getByDateOrder(req, res, next) {
        try {
            const { date, order } = req.params;
            const circulars = await this.circularService.getByDateOrder(date, order || 'asc');
            res.json({ circulars });
        } catch (error) {
            next(error);
        }
    }

    async getByKeywords(req, res, next) {
        try {
            const { keywords } = req.params;
            const circulars = await this.circularService.getByKeywords(keywords);
            res.json({ circulars });
        } catch (error) {
            next(error);
        }
    }

    async getTotalCirculars(req, res, next) {
        try {
            const total = await this.circularService.getTotalCirculars();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

}