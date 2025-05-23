import IcircularRepository from "../interfaces/IcircularRepository.js"
import { db } from "../config/firebase.js"

export default class circularRepository extends IcircularRepository {

    constructor() {
        super()
        this.collection = db.collection('circular-node')
    }

    async create(circular) {
        const circularCreated = await this.collection.add(circular)
        return {
            id: circularCreated.id,
            ...circular
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

    async updateSessionToken(circularId, sessionToken) {
        const circular = this.collection.doc(circularId)
        await circular.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(circularId) {
        const circular = this.collection.doc(circularId)
        const circularLogged = await circular.get()
        return circularLogged.exists ? circularLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}