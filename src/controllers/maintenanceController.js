import maintenanceService from "../services/maintenanceService.js"

export default class maintenanceController {
    constructor() {
        this.maintenanceService = new maintenanceService()
    }

    async create(req, res, next) {
        try {
            const maintenanceData = req.body
            const maintenance = await this.maintenanceService.create(maintenanceData)
            res.status(201).json(maintenance)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const maintenanceData = req.body
            const maintenance = await this.maintenanceService.update(id, maintenanceData)
            res.json(maintenance)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.maintenanceService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

        async getAll(req, res, next) {
        try {
            const maintenances = await this.maintenanceService.getAll()
            res.json({ maintenances })
        } catch (error) {
            next(error)
        }
    }

    async getTotalSchedules(req, res, next) {
        try {
            const total = await this.maintenanceService.getTotalSchedules();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getTotalCompleted(req, res, next) {
        try {
            const total = await this.maintenanceService.getTotalCompleted();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getTotalPending(req, res, next) {
        try {
            const total = await this.maintenanceService.getTotalPending();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getTotalOverdue(req, res, next) {
        try {
            const total = await this.maintenanceService.getTotalOverdue();
            res.json({ total });
        } catch (error) {
            next(error);
        }
    }

    async getByItemName(req, res, next) {
        try {
            const { itemName } = req.params;
            const maintenances = await this.maintenanceService.getByItemName(itemName);
            res.json({ maintenances });
        } catch (error) {
            next(error);
        }
    }

    async getByItemNumber(req, res, next) {
        try {
            const { itemNumber } = req.params;
            const maintenances = await this.maintenanceService.getByItemNumber(itemNumber);
            res.json({ maintenances });
        } catch (error) {
            next(error);
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params;
            const maintenances = await this.maintenanceService.getByDate(date);
            res.json({ maintenances });
        } catch (error) {
            next(error);
        }
    }

    async getDetails(req, res, next) {
        try {
            const { itemName, itemNumber } = req.params;
            const maintenance = await this.maintenanceService.getDetails(itemName, itemNumber);
            res.json({ maintenance });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const maintenance = await this.maintenanceService.getById(id)
            res.json({ maintenance })
        } catch (error) {
            next(error)
        }
    }

}