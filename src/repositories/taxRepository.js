import ItaxRepository from "../interfaces/ItaxRepository.js"
import { db } from "../config/firebase.js"

export default class taxRepository extends ItaxRepository {

    constructor() {
        super()
        this.collection = db.collection('tax-node')
    }

    async create(tax) {
        const taxCreated = await this.collection.add(tax)
        return {
            id: taxCreated.id,
            ...tax
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'tax eliminado' }
    }

    async getAll() {
        const datosDB = await this.collection.get()
        return datosDB.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async findByRol(rol) {
        const datosDB = await this.collection.where('rol', '==', rol).get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}