import IbudgetRepository from "../interfaces/IbudgetRepository.js"
import { db } from "../config/firebase.js";

export default class budgetRepository extends IbudgetRepository {

    constructor() {
        super()
        this.collection = db.collection('budget-node')
    }

    async create(budget) {
        const budgetCreated = await this.collection.add(budget)

        return {
            id: budgetCreated.id,
            ...budget
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete();
        return { id, messaje: 'budget Eliminado'}
    }
    
    async getAll() {
        const presupuestos = await this.collection.get()
        return presupuestos.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
    } 
    
    async findByNumber(budgetNo) {
        const numero = await this.collection
            .where('numero', '==', budgetNo)      
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
}