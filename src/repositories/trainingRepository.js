import ItrainingRepository from "../interfaces/ItrainingRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "./idManager.js"
export default class trainingRepository extends ItrainingRepository {

    constructor() {
        super()
        this.collection = db.collection('training-node')
    }

    async create(training) {
        const id = await getNextId('training-node')
        const trainingWithId = { ...training, id }
        await this.collection.doc(id.toString()).set(trainingWithId)
        return {
            id,
            ...trainingWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'training eliminado' }
    }

    async getAll() {
        const datosDB = await this.collection.get()
        return datosDB.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return !doc.exists ? null : { id: doc.id, ...doc.data() };
    }

    async getByDate(date) {
        const snapshot = await this.collection.where('startDate', '==', date).get();
        return snapshot.empty
            ? []
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}