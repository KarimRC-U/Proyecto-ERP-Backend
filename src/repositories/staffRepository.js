import IstaffRepository from "../interfaces/IstaffRepository.js"
import { db } from "../config/firebase.js";

export default class staffRepository extends IstaffRepository {

    constructor() {
        super()
        this.collection = db.collection('usuarios-node')
    }

    async create(staff) {
        const staffCreated = await this.collection.add(staff)

        return {
            id: staffCreated.id,
            ...staff
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete();
        return { id, messaje: 'Usuario Eliminado'}
    }
    
    async getAll() {
        const usuarios = await this.collection.get()
        return usuarios.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
    } 
    
    async findByFullname(nombre, apaterno, amaterno) {
        const usuario = await this.collection
            .where('nombre', '==', nombre)      
            .where('apaterno', '==', apaterno)      
            .where('amaterno', '==', amaterno)
            .get()      
        
        return usuario.empty ? null : { id: usuario.docs[0].id, ...usuario.docs[0].data() } 
    } 
    
    async findByStaff(staff) {
        const usuario = await this.collection.where('usuario' , '==', staff).get()   
        
        return usuario.empty ? null : { id: usuario.docs[0].id, ...usuario.docs[0].data() } 
    } 
    
    async findByRol(rol) {
        const usuario = await this.collection.where('rol' , '==', rol).get()   
        
        return usuario.empty ? null : { id: usuario.docs[0].id, ...usuario.docs[0].data() } 
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
        const usuario = await this.collection.doc(id).get() 
        
        return !usuario.exists ? null : { id: usuario.id, ...usuario.data() } 
    } 
}