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

    async updateSessionToken(taxId, sessionToken) {
        const tax = this.collection.doc(taxId)
        await tax.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(taxId) {
        const tax = this.collection.doc(taxId)
        const taxLogged = await tax.get()
        return taxLogged.exists ? taxLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}