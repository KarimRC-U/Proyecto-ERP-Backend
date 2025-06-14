import payslipService from "../services/payslipService.js"

export default class payslipController {
    constructor() {
        this.payslipService = new payslipService()
    }

    async getAll(req, res, next) {
        try {
            const payslips = await this.payslipService.getAll()
            res.json({ payslips })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const payslip = await this.payslipService.getById(id)
            res.json({ payslip })
        } catch (error) {
            next(error)
        }
    }

    async getByDate(req, res, next) {
        try {
            const { date } = req.params
            const payslip = await this.payslipService.findByDate(date)
            res.json({ payslip })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const payslipData = req.body
            const payslip = await this.payslipService.create(payslipData)
            res.status(201).json(payslip)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const payslipData = req.body
            const payslip = await this.payslipService.update(id, payslipData)
            res.json(payslip)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.payslipService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async getPayslipsByStaffId(req, res, next) {
        try {
            const { staffid } = req.params;
            const payslips = await this.payslipService.getPayslipsByStaffId(staffid);
            res.json({ payslips });
        } catch (error) {
            next(error);
        }
    }
}