import payslipRepository from "../repositories/payslipRepository.js"
import { Payslip } from "../models/Payslip.js"

export default class payslipService {
    constructor() {
        this.payslipRepository = new payslipRepository()
    }

    async create(payslipData) {
        const newPayslip = new Payslip(payslipData)
        return this.payslipRepository.create({ ...newPayslip })
    }

    async update(id, payslipData) {
        const existingPayslip = await this.payslipRepository.getById(id)
        if (!existingPayslip) {
            throw { message: 'Payslip No Encontrado', statusCode: 404 }
        }
        const updatedPayslip = new Payslip({ ...existingPayslip, ...payslipData })
        return this.payslipRepository.update(id, { ...updatedPayslip })
    }

    async delete(id) {
        const payslipExists = await this.payslipRepository.getById(id)
        if (!payslipExists) {
            throw { message: 'Payslip No Encontrado', statusCode: 404 }
        }
        await this.payslipRepository.delete(id)
    }

    async getAll() {
        return await this.payslipRepository.getAll()
    }

    async getPayslipsByStaffId(staffid) {
        return await this.payslipRepository.findByStaffId(staffid)
    }
}