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

    async findByRol(rol) {
        const datosDB = await this.collection.where('rol', '==', rol).get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return !doc.exists ? null : { id: doc.id, ...doc.data() };
    }

    async getByTitle(title) {
        const snapshot = await this.collection.where('title', '==', title).get();
        return snapshot.empty
            ? []
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getByStaff(staffid) {
        const snapshot = await this.collection.where('requestedBy.staffid', '==', staffid).get();
        return snapshot.empty
            ? []
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getTotalRequests() {
        const snapshot = await this.collection.get();
        return snapshot.size;
    }

    async getTotalCosts() {
        const snapshot = await this.collection.get();
        let total = 0;
        snapshot.forEach(doc => {
            const data = doc.data();
            total += Number(data.amount) || 0;
        });
        return total;
    }

    async getPending() {
        const snapshot = await this.collection.where('status', '==', 'Pending').get();
        return snapshot.size;
    }

    async getApproved() {
        const snapshot = await this.collection.where('status', '==', 'Approved').get();
        return snapshot.size;
    }

    async getNextId() {
        const snapshot = await this.collection.orderBy('id', 'desc').limit(1).get();
        if (snapshot.empty) return 1;
        return (snapshot.docs[0].data().id || 0) + 1;
    }
}