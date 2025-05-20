import IstockRepository from "../interfaces/IstockRepository.js"
import { db } from "../config/firebase.js"

export default class stockRepository extends IstockRepository {

    constructor() {
        super()
        this.collection = db.collection('stock-node')
    }

    async create(stock) {
        const stockCreated = await this.collection.add(stock)
        return {
            id: stockCreated.id,
            ...stock
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'stock eliminado' }
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

    async updateSessionToken(stockId, sessionToken) {
        const stock = this.collection.doc(stockId)
        await stock.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(stockId) {
        const stock = this.collection.doc(stockId)
        const stockLogged = await stock.get()
        return stockLogged.exists ? stockLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}