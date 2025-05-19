import budgetService from "../services/budgetService.js"

export default class budgetController {
    constructor() {
        this.budgetService = new budgetService()
    }

    async getAll(req, res, next) {
        try {
            const budgets = await this.budgetService.getAll()
            res.json({budgets})
        } catch (error) {
            next(error)
        }
    }

    async getBystaff(req, res, next) {
        try {
            const { correo } = req.params
            const staff = await this.budgetService.findByCorreo(correo)
            res.json({staff})
        } catch (error) {
            next(error)
        }
    }

    async getByRol(req, res, next) {
        try {
            const { rol } = req.params
            const staff = await this.budgetService.findByRol(rol)
            res.json(staff)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const staffData = req.body
            console.log(staffData);
            const staff = await this.staffService.create(staffData)
            res.status(201).json(staff)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const staffData = req.body
            const staff = await this.staffService.update(id, staffData)
            res.json(staff)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const staff = await this.staffService.delete(id)
            res.json(204).end()
        } catch (error) {
            next(error)
        }
    }
    
    async getBudgetByStaff(req, res, next) {
        try {
            const { correo } = req.staff
            if(!correo) {
                throw { message: 'Staff no encontrado', statusCode: 404 }
            }

            const staff = await this.budgetService.getBystaff(correo)
            if(!staff) {
                throw { message: 'Staff no encontrado', statusCode: 404 }
            }
            res.json({staff})
        } catch (error) {
            next(error)
        }
    }
}