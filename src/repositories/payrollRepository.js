import IpayrollRepository from "../interfaces/IpayrollRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "../utils/getNextId.js"
export default class payrollRepository extends IpayrollRepository {

    constructor() {
        super()
        this.collection = db.collection('payroll-node')
    }

    async create(payroll) {
        const id = await getNextId('payroll-node')
        const payrollWithId = { ...payroll, id }
        const payrollCreated = await this.collection.add(payrollWithId)
        return {
            id: payrollCreated.id,
            ...payrollWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'payroll eliminado' }
    }

    async getAll() {
        const datosDB = await this.collection.get()
        return datosDB.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }

    async getMonthGrossSalary(month, year) {
        const payslips = await db.collection('payslip-node')
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        payslips.forEach(doc => {
            const data = doc.data();
            total += Number(data.grossSalary) || 0;
        });
        return total;
    }

    async getMonthNetSalary(month, year) {
        const payslips = await db.collection('payslip-node')
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        payslips.forEach(doc => {
            const data = doc.data();
            total += Number(data.netSalary) || 0;
        });
        return total;
    }

    async getMonthTotalTax(month, year) {
        const payslips = await db.collection('payslip-node')
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        payslips.forEach(doc => {
            const data = doc.data();
            total += Number(data.taxOrPaye) || 0;
        });
        return total;
    }

    async getMonthTotalLoan(month, year) {
        const payslips = await db.collection('payslip-node')
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        payslips.forEach(doc => {
            const data = doc.data();
            total += Number(data.loanAmount) || 0;
        });
        return total;
    }
}