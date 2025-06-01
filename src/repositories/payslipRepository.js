import IpayslipRepository from "../interfaces/IpayslipRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "../utils/getNextId.js"
export default class payslipRepository extends IpayslipRepository {

    constructor() {
        super()
        this.collection = db.collection('payslip-node')
    }

    async create(payslip) {
        const id = await getNextId('payslip-node')
        const payslipWithId = { ...payslip, id }
        const payslipCreated = await this.collection.add(payslipWithId)
        return {
            id: payslipCreated.id,
            ...payslipWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'payslip eliminado' }
    }

    async getAll() {
        const datosDB = await this.collection.get()
        return datosDB.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async findByFullname(nombre, apaterno, amaterno) {
        const datosDB = await this.collection
            .where('nombre', '==', nombre)
            .where('apaterno', '==', apaterno)
            .where('amaterno', '==', amaterno)
            .get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async findByRol(rol) {
        const datosDB = await this.collection.where('rol', '==', rol).get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }

    async findByStaffId(staffid) {
        const datosDB = await this.collection.where('staffid', '==', staffid).get();
        return datosDB.empty
            ? []
            : datosDB.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}