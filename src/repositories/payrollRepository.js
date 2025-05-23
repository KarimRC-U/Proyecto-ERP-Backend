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
        const snapshot = await this.collection.get()
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async findByFullname(nombre, apaterno, amaterno) {
        const snapshot = await this.collection
            .where('nombre', '==', nombre)
            .where('apaterno', '==', apaterno)
            .where('amaterno', '==', amaterno)
            .get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async findById(id) {
        const snapshot = await this.collection.where('id', '==', id).get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async findByRol(rol) {
        const snapshot = await this.collection.where('rol', '==', rol).get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async updateSessionToken(payrollId, sessionToken) {
        const payroll = this.collection.doc(payrollId)
        await payroll.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(payrollId) {
        const payroll = this.collection.doc(payrollId)
        const payrollLogged = await payroll.get()
        return payrollLogged.exists ? payrollLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}