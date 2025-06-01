import logisticsService from "../services/logisticsService.js"

export default class logisticsController {
    constructor() {
        this.logisticsService = new logisticsService()
    }

    async getAll(req, res, next) {
        try {
            const logistics = await this.logisticsService.getAll()
            res.json({ logistics })
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

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const logistics = await this.logisticsService.getById(id);
            res.json({ logistics });
        } catch (error) {
            next(error);
        }
    }

    async getByTitle(req, res, next) {
        try {
            const { title } = req.params;
            const logistics = await this.logisticsService.getByTitle(title);
            res.json({ logistics });
        } catch (error) {
            next(error);
        }
    }

    async getByStaff(req, res, next) {
        try {
            const { staffid } = req.params;
            const logistics = await this.logisticsService.getByStaff(staffid);
            res.json({ logistics });
        } catch (error) {
            next(error);
        }
    }

    async getTotalRequests(req, res, next) {
        try {
            const total = await this.logisticsService.getTotalRequests();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getTotalCosts(req, res, next) {
        try {
            const total = await this.logisticsService.getTotalCosts();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getPending(req, res, next) {
        try {
            const total = await this.logisticsService.getPending();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getApproved(req, res, next) {
        try {
            const total = await this.logisticsService.getApproved();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }
}