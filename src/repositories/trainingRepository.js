import ItrainingRepository from "../interfaces/ItrainingRepository.js"
import { db } from "../config/firebase.js"

export default class trainingRepository extends ItrainingRepository {

    constructor() {
        super()
        this.collection = db.collection('training-node')
    }

    async create(training) {
        const trainingCreated = await this.collection.add(training)
        return {
            id: trainingCreated.id,
            ...training
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'training eliminado' }
    }

    async getAll() {
        const snapshot = await this.collection.get()
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async findByFullname(nombre, apaterno, amaterno) {
        const snapshot = await this.collection
            .where('nombre', '==', nombre)
            .where('apaterno', '==', apaterno)
            .where('amaterno', '==', amaterno)
            .get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async findByCorreo(correo) {
        const snapshot = await this.collection.where('correo', '==', correo).get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async findByRol(rol) {
        const snapshot = await this.collection.where('rol', '==', rol).get()
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    }

    async updateSessionToken(trainingId, sessionToken) {
        const training = this.collection.doc(trainingId)
        await training.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(trainingId) {
        const training = this.collection.doc(trainingId)
        const trainingLogged = await training.get()
        return trainingLogged.exists ? trainingLogged.data().currentSessionToken : null
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }
}