import IlogisticsRepository from "../interfaces/IlogisticsRepository.js"
import { db } from "../config/firebase.js"

export default class logisticsRepository extends IlogisticsRepository {

    constructor() {
        super()
        this.collection = db.collection('logistics-node')
    }

    async create(logistics) {
        const logisticsCreated = await this.collection.add(logistics)
        return {
            id: logisticsCreated.id,
            ...logistics
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'logistics eliminado' }
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

    async updateSessionToken(logisticsId, sessionToken) {
        const logistics = this.collection.doc(logisticsId)
        await logistics.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(logisticsId) {
        const logistics = this.collection.doc(logisticsId)
        const logisticsLogged = await logistics.get()
        return logisticsLogged.exists ? logisticsLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}