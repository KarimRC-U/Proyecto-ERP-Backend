import payrollService from "../services/payrollService.js"

export default class payrollController {
    constructor() {
        this.payrollService = new payrollService()
    }

    async getAll(req, res, next) {
        try {
            const payrolls = await this.payrollService.getAll()
            res.json({ payrolls })
        } catch (error) {
            next(error)
        }
    }

    async getByNumber(req, res, next) {
        try {
            const { payrollNo } = req.params
            const payroll = await this.payrollService.findByNumber(payrollNo)
            res.json({ payroll })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const payroll = await this.payrollService.findByDate(date)
            res.json({ payroll })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const payrollData = req.body
            const payroll = await this.payrollService.create(payrollData)
            res.status(201).json(payroll)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const payrollData = req.body
            const payroll = await this.payrollService.update(id, payrollData)
            res.json(payroll)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.payrollService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getAnnualBudget(req, res, next) {
        try {
            const result = await this.payrollService.getAnnualBudget()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}