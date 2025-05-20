import maintenanceService from "../services/maintenanceService.js"

export default class maintenanceController {
    constructor() {
        this.maintenanceService = new maintenanceService()
    }

    async getAll(req, res, next) {
        try {
            const maintenances = await this.maintenanceService.getAll()
            res.json({ maintenances })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { maintenanceNo } = req.params
            const maintenance = await this.maintenanceService.findByNumber(maintenanceNo)
            res.json({ maintenance })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const maintenance = await this.maintenanceService.findByDate(date)
            res.json({ maintenance })
        } catch (error) {
            next(error)
        }
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

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.maintenanceService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}