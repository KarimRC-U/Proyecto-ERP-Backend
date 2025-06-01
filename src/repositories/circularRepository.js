import IcircularRepository from "../interfaces/IcircularRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "./idManager.js"
export default class circularRepository extends IcircularRepository {

    constructor() {
        super()
        this.collection = db.collection('circular-node')
    }

    async create(circular) {
        const id = await getNextId('circular-node')
        const circularWithId = { ...circular, id }
        await this.collection.doc(id.toString()).set(circularWithId)
        return {
            id,
            ...circularWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'circular eliminado' }
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
        const snapshot = await this.collection.where('date', '==', date).get();
        return snapshot.empty
            ? []
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getByDateOrder(date, order = 'asc') {
        const snapshot = await this.collection
            .where('date', '==', date)
            .orderBy('title', order)
            .get();
        return snapshot.empty
            ? []
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findByKeywords(keywords) {
        const lowerKeywords = keywords.toLowerCase();
        const snapshot = await this.collection.get();
        const results = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (
                (data.title && data.title.toLowerCase().includes(lowerKeywords)) ||
                (data.message && data.message.toLowerCase().includes(lowerKeywords))
            ) {
                results.push({ id: doc.id, ...data });
            }
        });
        return results;
    }

    async getTotalCirculars() {
        const snapshot = await this.collection.get();
        return snapshot.size;
    }

}