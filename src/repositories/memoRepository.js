import ImemoRepository from "../interfaces/ImemoRepository.js"
import { db } from "../config/firebase.js";
import { getNextId } from "./idManager.js";
export default class memoRepository extends ImemoRepository {

    constructor() {
        super()
        this.collection = db.collection('memo-node')
    }

    async create(memo) {
        const id = await getNextId('memo-node')
        const memoWithId = { ...memo, id }
        const memoCreated = await this.collection.add(memoWithId)
        return {
            id: memoCreated.id,
            ...memoWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete();
        return { id, messaje: 'Memo Eliminado' }
    }

    async getAll() {
        const memos = await this.collection.get()
        return memos.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async findByNumber(memoNo) {
        const numero = await this.collection
            .where('memoNo', '==', memoNo)
            .get()
        return numero.empty ? null : { id: numero.docs[0].id, ...numero.docs[0].data() }
    }

    async findByDate(date) {
        const memo = await this.collection.where('date', '==', date).get()
        return memo.empty ? null : { id: memo.docs[0].id, ...memo.docs[0].data() }
    }


    async getTotalCount() {
        const cuenta = await this.collection.get();
        return cuenta.size;
    }

    async findByKeywords(keywords) {
        const busqueda = await this.collection.get();
        const lowerKeywords = keywords.toLowerCase();
        const results = [];
        busqueda.forEach(doc => {
            const data = doc.data();
            if (
                (data.body && data.body.toLowerCase().includes(lowerKeywords)) ||
                (data.memoType && data.memoType.toLowerCase().includes(lowerKeywords))
            ) {
                results.push({ id: doc.id, ...data });
            }
        });
        return results;
    }

    async getMemoDetails(id) {
        const doc = await this.collection.doc(id).get();
        return !doc.exists ? null : { id: doc.id, ...doc.data() };
    }
}