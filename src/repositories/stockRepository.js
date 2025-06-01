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

    async getNextProductId() {
        const snapshot = await this.collection.orderBy('productId', 'desc').limit(1).get();
        if (snapshot.empty) return 1;
        return (snapshot.docs[0].data().productId || 0) + 1;
    }
}