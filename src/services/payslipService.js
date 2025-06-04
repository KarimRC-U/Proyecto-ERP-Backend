import payslipRepository from "../repositories/payslipRepository.js"
import { Payslip } from "../models/Payslip.js"

export default class payslipService {
    constructor() {
        this.payslipRepository = new payslipRepository()
    }

    async create(payslipData) {
        const {
            staffid,
            staffName,
            title,
            level,
            basicSalary,
            housingAllowance = 0,
            transportAllowance = 0,
            utilityAllowance = 0,
            productivityAllowance = 0,
            communicationAllowance = 0,
            inconvenienceAllowance = 0,
            taxOrPaye = 0,
            pension = 0
        } = payslipData;

        const newPayslip = new Payslip({
            staffid,
            staffName,
            title,
            level,
            basicSalary,
            housingAllowance,
            transportAllowance,
            utilityAllowance,
            productivityAllowance,
            communicationAllowance,
            inconvenienceAllowance,
            taxOrPaye,
            pension
        });
        return this.payslipRepository.create({ ...newPayslip });
    }

    async update(id, payslipData) {
        const existingPayslip = await this.payslipRepository.getById(id)
        if (!existingPayslip) {
            throw { message: 'No se pudo encontrar un payslip con estos datos.', statusCode: 404 }
        }
        const updatedPayslip = new Payslip({ ...existingPayslip, ...payslipData })
        return this.payslipRepository.update(id, { ...updatedPayslip })
    }

    async delete(id) {
        const payslipExists = await this.payslipRepository.getById(id)
        if (!payslipExists) {
            throw { message: 'No se pudo encontrar un payslip con estos datos.', statusCode: 404 }
        }
        await this.payslipRepository.delete(id)
    }

    async getAll() {
        return await this.payslipRepository.getAll()
    }

    async getPayslipsByStaffId(staffid) {
        return await this.payslipRepository.findByStaffId(staffid)
    }

    async getById(id) {
        const payslip = await this.payslipRepository.getById(id)
        if (!payslip) {
            throw { message: 'El payslip no existe', statusCode: 404 }
        }
        return payslip
    }
}