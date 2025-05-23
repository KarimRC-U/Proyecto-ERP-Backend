import IpayrollRepository from "../interfaces/IpayrollRepository.js"
import { db } from "../config/firebase.js"

export default class payrollRepository extends IpayrollRepository {

    constructor() {
        super()
        this.collection = db.collection('payroll-node')
    }

    async create(payroll) {
        const payrollCreated = await this.collection.add(payroll)
        return {
            id: payrollCreated.id,
            ...payroll
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
        const datosDB = await this.collection
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        datosDB.forEach(doc => {
            const data = doc.data();
            total += Number(data.grossSalary) || 0;
        });
        return total;
    }

    async getMonthNetSalary(month, year) {
        const datosDB = await this.collection
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        datosDB.forEach(doc => {
            const data = doc.data();
            total += Number(data.netSalary) || 0;
        });
        return total;
    }

    async getMonthTotalTax(month, year) {
        const datosDB = await this.collection
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        datosDB.forEach(doc => {
            const data = doc.data();
            total += Number(data.taxOrPaye) || 0;
        });
        return total;
    }

    async getMonthTotalLoan(month, year) {
        const datosDB = await this.collection
            .where('paymentMonth', '==', month)
            .where('paymentYear', '==', year)
            .get();
        let total = 0;
        datosDB.forEach(doc => {
            const data = doc.data();
            total += Number(data.loanAmount) || 0;
        });
        return total;
    }
}