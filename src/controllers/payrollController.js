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

    async getMonthGrossSalary(req, res, next) {
        try {
            const { month, year } = req.params;
            const total = await this.payrollService.getMonthGrossSalary(month, year);
            res.json({ month, year, grossSalary: total });
        } catch (error) {
            next(error);
        }
    }

    async getMonthNetSalary(req, res, next) {
        try {
            const { month, year } = req.params;
            const total = await this.payrollService.getMonthNetSalary(month, year);
            res.json({ month, year, netSalary: total });
        } catch (error) {
            next(error);
        }
    }

    async getMonthTotalTax(req, res, next) {
        try {
            const { month, year } = req.params;
            const total = await this.payrollService.getMonthTotalTax(month, year);
            res.json({ month, year, totalTax: total });
        } catch (error) {
            next(error);
        }
    }

    async getMonthTotalLoan(req, res, next) {
        try {
            const { month, year } = req.params;
            const total = await this.payrollService.getMonthTotalLoan(month, year);
            res.json({ month, year, totalLoan: total });
        } catch (error) {
            next(error);
        }
    }

}