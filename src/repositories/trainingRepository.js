import ItrainingRepository from "../interfaces/ItrainingRepository.js"
import { db } from "../config/firebase.js"

export default class trainingRepository extends ItrainingRepository {

    constructor() {
        super()
        this.collection = db.collection('training-node')
    }

    async getNextId() {
        const snapshot = await this.collection.orderBy('id', 'desc').limit(1).get();
        if (snapshot.empty) return 1;
        return (snapshot.docs[0].data().id || 0) + 1;
    }

    async create(training) {
        const id = await this.getNextId();
        const trainingWithId = { ...training, id };
        const trainingCreated = await this.collection.add(trainingWithId)
        return {
            id: trainingCreated.id,
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
        const snapshot = await this.collection.where('id', '==', Number(id)).get();
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }

    async getByDate(date) {
        const snapshot = await this.collection.where('startDate', '==', date).get();
        return snapshot.empty
            ? []
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}