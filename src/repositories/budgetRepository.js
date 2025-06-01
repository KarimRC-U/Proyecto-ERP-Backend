import IbudgetRepository from "../interfaces/IbudgetRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "./idManager.js"

export default class budgetRepository extends IbudgetRepository {

    constructor() {
        super()
        this.collection = db.collection('budget-node')
    }

    async create(budget) {
        const existing = await this.collection
            .where('date', '==', budget.date)
            .where('description', '==', budget.description)
            .get();
        if (!existing.empty) {
            throw { message: 'Ya existe un presupuesto con esta fecha y descripción', statusCode: 400 };
        }
        const id = await getNextId('budget-node');
        const budgetWithId = { ...budget, id };
        await this.collection.doc(id.toString()).set(budgetWithId);
        return {
            id,
            ...budgetWithId
        };
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, messaje: 'budget Eliminado'}
    }
    
    async getAll() {
        const presupuestos = await this.collection.get()
        return presupuestos.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    } 
    
    async findByNumber(budgetNo) {
        const numero = await this.collection
            .where('budgetNo', '==', budgetNo)      
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
        const datosDB = await this.collection
            .where('date', '>=', start.toISOString().split('T')[0])
            .where('date', '<=', end.toISOString().split('T')[0])
            .get();
        let total = 0;
        datosDB.forEach(doc => {
            const data = doc.data();
            total += Number(data.budgetedAmount) || 0;
        });
        return { year, totalBudgetedAmount: total };
    }
}