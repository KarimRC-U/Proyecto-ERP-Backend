import IstaffRepository from "../interfaces/IstaffRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "./idManager.js"

export default class staffRepository extends IstaffRepository {

    constructor() {
        super()
        this.collection = db.collection('staff-node')
    }

    async create(staff) {
        const id = await getNextId('staff-node')
        const staffWithId = { ...staff, id }
        await this.collection.doc(id.toString()).set(staffWithId)
        return {
            id,
            ...staffWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete();
        return { id, messaje: 'Staff Eliminado'}
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
    
    async findByCorreo(staff) {
        const correo = await this.collection.where('correo' , '==', staff).get()   
        
        return correo.empty ? null : { id: correo.docs[0].id, ...correo.docs[0].data() } 
    } 
    
    async findByRol(rol) {
        const correo = await this.collection.where('rol' , '==', rol).get()   
        
        return correo.empty ? null : { id: correo.docs[0].id, ...correo.docs[0].data() } 
    }
    
    async updateSessionToken(staffId, sessionToken) {
        const staff = this.collection.doc(staffId)
        await staff.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(staffId) {
        const staff = this.collection.doc(staffId)
        const staffLogged = await staff.get()
        return staffLogged.exists ? staffLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const correo = await this.collection.doc(id).get() 
        
        return !correo.exists ? null : { id: correo.id, ...correo.data() } 
    } 
}