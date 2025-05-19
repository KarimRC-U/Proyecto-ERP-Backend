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
        const correos = await this.collection.get()
        return correos.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
    } 
    
    async findByFullname(nombre, apaterno, amaterno) {
        const correo = await this.collection
            .where('nombre', '==', nombre)      
            .where('apaterno', '==', apaterno)      
            .where('amaterno', '==', amaterno)
            .get()      
        
        return correo.empty ? null : { id: correo.docs[0].id, ...correo.docs[0].data() } 
    } 
    
    async findByCorreo(budget) {
        const correo = await this.collection.where('correo' , '==', budget).get()   
        
        return correo.empty ? null : { id: correo.docs[0].id, ...correo.docs[0].data() } 
    } 
    
    async findByRol(rol)  {
        const correo = await this.collection.where('rol' , '==', rol).get()   
        
        return correo.empty ? null : { id: correo.docs[0].id, ...correo.docs[0].data() } 
    }
    
    async updateSessionToken(budgetId, sessionToken) {
        const budget = this.collection.doc(budgetId)
        await budget.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(budgetId) {
        const budget = this.collection.doc(budgetId)
        const budgetLogged = await budget.get()
        return budgetLogged.exists ? budgetLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const correo = await this.collection.doc(id).get() 
        
        return !correo.exists ? null : { id: correo.id, ...correo.data() } 
    } 
}