import staffService from "../services/staffService.js"

export default class staffController {
    constructor() {
        this.staffService = new staffService()
    }

    async getAll(req, res, next) {
        try {
            const staffs = await this.staffService.getAll()
            res.json({staffs})
        } catch (error) {
            next(error)
        }
    }

    async getBystaff(req, res, next) {
        try {
            const { correo } = req.params
            const staff = await this.staffService.findByCorreo(correo)
            res.json({staff})
        } catch (error) {
            next(error)
        }
    }

    async getByRol(req, res, next) {
        try {
            const { rol } = req.params
            const staff = await this.staffService.findByRol(rol)
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
            await this.staffService.delete(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { correo, password } = req.body
            const token = await this.staffService.login(correo, password)
            res.json({token})
        } catch (error) {
            next(error)
        }
    }
    
    async logout(req, res, next) {
        try {
            const authHeader = req.headers.authorization
            if(!authHeader) {
                throw { message: 'Token no proporcionado', statusCode: 400 }
            }
            const token = authHeader.split(' ')[1]
            const staffId = req.staff.id
            await this.staffService.logout(staffId, token)
            res.status(204).json({ message: 'Sesión cerrada' })
        } catch (error) {
            next(error)
        }
    }

    async unlockstaff(req, res, next) {
        try {
            const { id } = req.params
            await this.staffService.unlockstaff(id)
            res.status(204).json({ message: 'Staff desbloqueado' })
        } catch (error) {
            next(error)
        }
    }

    async getstaffBystaffname(req, res, next) {
        try {
            const { correo } = req.staff
            if(!correo) {
                throw { message: 'Staff no encontrado', statusCode: 404 }
            }

            const staff = await this.staffService.getBystaff(correo)
            if(!staff) {
                throw { message: 'Staff no encontrado', statusCode: 404 }
            }
            res.json({staff})
        } catch (error) {
            next(staff)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const staff = await this.staffService.getById(id)
            res.json({ staff })
        } catch (error) {
            next(error)
        }
    }
}