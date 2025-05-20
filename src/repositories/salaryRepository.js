import IsalaryRepository from "../interfaces/IsalaryRepository.js"
import { db } from "../config/firebase.js"

export default class salaryRepository extends IsalaryRepository {

    constructor() {
        super()
        this.collection = db.collection('salary-node')
    }

    async create(salary) {
        const salaryCreated = await this.collection.add(salary)
        return {
            id: salaryCreated.id,
            ...salary
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'salary eliminado' }
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

    async findByCorreo(correo) {
        const snapshot = await this.collection.where('correo', '==', correo).get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async findByRol(rol) {
        const snapshot = await this.collection.where('rol', '==', rol).get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async updateSessionToken(salaryId, sessionToken) {
        const salary = this.collection.doc(salaryId)
        await salary.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(salaryId) {
        const salary = this.collection.doc(salaryId)
        const salaryLogged = await salary.get()
        return salaryLogged.exists ? salaryLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}