import ImaintenanceRepository from "../interfaces/ImaintenanceRepository.js"
import { db } from "../config/firebase.js"

export default class maintenanceRepository extends ImaintenanceRepository {

    constructor() {
        super()
        this.collection = db.collection('maintenance-node')
    }

    async create(maintenance) {
        const maintenanceCreated = await this.collection.add(maintenance)
        return {
            id: maintenanceCreated.id,
            ...maintenance
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'maintenance eliminado' }
    }

    async getAll() {
        const datosDB = await this.collection.get()
        return datosDB.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async findByFullname(nombre, apaterno, amaterno) {
        const datosDB = await this.collection
            .where('nombre', '==', nombre)
            .where('apaterno', '==', apaterno)
            .where('amaterno', '==', amaterno)
            .get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async findByCorreo(correo) {
        const datosDB = await this.collection.where('correo', '==', correo).get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async findByRol(rol) {
        const datosDB = await this.collection.where('rol', '==', rol).get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async updateSessionToken(maintenanceId, sessionToken) {
        const maintenance = this.collection.doc(maintenanceId)
        await maintenance.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(maintenanceId) {
        const maintenance = this.collection.doc(maintenanceId)
        const maintenanceLogged = await maintenance.get()
        return maintenanceLogged.exists ? maintenanceLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}