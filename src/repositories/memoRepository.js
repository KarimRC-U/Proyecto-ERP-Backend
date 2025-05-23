import ImemoRepository from "../interfaces/ImemoRepository.js"
import { db } from "../config/firebase.js";

export default class memoRepository extends ImemoRepository {

    constructor() {
        super()
        this.collection = db.collection('memo-node')
    }

    async create(memo) {
        const memoCreated = await this.collection.add(memo)

        return {
            id: memoCreated.id,
            ...memo
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete();
        return { id, messaje: 'memo Eliminado'}
    }
    
    async getAll() {
        const presupuestos = await this.collection.get()
        return presupuestos.docs.map((doc) => ({
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
    
    async findByDate(date)  {
        const presupuesto = await this.collection.where('date' , '==', date).get()   
        return presupuesto.empty ? null : { id: presupuesto.docs[0].id, ...presupuesto.docs[0].data() } 
    }
    
    async getById(id) {
        const presupuesto = await this.collection.doc(id).get() 
        return !presupuesto.exists ? null : { id: presupuesto.id, ...presupuesto.data() } 
    } 

    async getAnnualBudget() {
        const now = new Date();
        const year = now.getFullYear();
        const start = new Date(`${year}-01-01`);
        const end = new Date(`${year}-12-31`);
        const snapshot = await this.collection
            .where('date', '>=', start.toISOString().split('T')[0])
            .where('date', '<=', end.toISOString().split('T')[0])
            .get();
        let total = 0;
        snapshot.forEach(doc => {
            const data = doc.data();
            total += Number(data.memoedAmount) || 0;
        });
        return { year, totalBudgetedAmount: total };
    }
}