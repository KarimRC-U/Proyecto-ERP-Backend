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

    async findByRol(rol) {
        const datosDB = await this.collection.where('rol', '==', rol).get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }

    async getTotalSchedules() {
        const datosDB = await this.collection.get();
        return datosDB.size;
    }

    async getTotalCompleted() {
        const datosDB = await this.collection.where('status', '==', 'Completed').get();
        return datosDB.size;
    }

    async getTotalPending() {
        const datosDB = await this.collection.where('status', '==', 'Pending').get();
        return datosDB.size;
    }

    async getTotalOverdue() {
        const today = new Date().toISOString().split('T')[0];
        const datosDB = await this.collection
            .where('status', 'in', ['Pending', 'Unknown'])
            .where('date', '<', today)
            .get();
        return datosDB.size;
    }

    async getByItemName(itemName) {
        const datosDB = await this.collection.where('itemName', '==', itemName).get();
        return datosDB.empty
            ? []
            : datosDB.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getByItemNumber(itemNumber) {
        const datosDB = await this.collection.where('itemNumber', '==', itemNumber).get();
        return datosDB.empty
            ? []
            : datosDB.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getByDate(date) {
        const datosDB = await this.collection.where('date', '==', date).get();
        return datosDB.empty
            ? []
            : datosDB.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getDetails(itemName, itemNumber) {
        const datosDB = await this.collection
            .where('itemName', '==', itemName)
            .where('itemNumber', '==', itemNumber)
            .get();
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() };
    }
}