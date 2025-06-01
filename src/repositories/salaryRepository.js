import IsalaryRepository from "../interfaces/IsalaryRepository.js"
import { db } from "../config/firebase.js"
import { getNextId } from "../utils/idGenerator.js"

export default class salaryRepository extends IsalaryRepository {

    constructor() {
        super()
        this.collection = db.collection('salary-node')
    }

    async create(salary) {
        const id = await getNextId('salary-node')
        const salaryWithId = { ...salary, id }
        const salaryCreated = await this.collection.add(salaryWithId)
        return {
            id: salaryCreated.id,
            ...salaryWithId
        }
    }

    async update(id, updateData) {
        await this.collection.doc(id).update(updateData)
        return { id, ...updateData }
    }

    async delete(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'salary eliminado' }
    }

    async getAll() {
        const datosDB = await this.collection.get()
        return datosDB.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get()
        return !doc.exists ? null : { id: doc.id, ...doc.data() }
    }

    async findByTitleAndLevel(title, level) {
        const datosDB = await this.collection
            .where('title', '==', title)
            .where('level', '==', level)
            .get()
        return datosDB.empty ? null : { id: datosDB.docs[0].id, ...datosDB.docs[0].data() }
    }
}