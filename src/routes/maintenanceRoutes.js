import express from 'express'
import MaintenanceController from '../controllers/maintenanceController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const maintenanceController = new MaintenanceController()

const maintenanceRoutes = [
    {
        method: 'get',
        path: '/',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getAll'
    },
    {
        method: 'post',
        path: '/create',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'create'
    },
    {
        method: 'put',
        path: '/update/modified/:id',
       // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'update'
    },
    {
        method: 'put',
        path: '/update/approve/:id',
       // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'update'
    },
    {
        method: 'delete',
        path: '/delete/:id',
       // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'delete'
    },
    {
        method: 'get',
        path: '/staff',
       // middleware: [authMiddleware],
        handle: 'getMaintenanceByStaff'
    }
]

maintenanceRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        maintenanceController[route.handle].bind(maintenanceController)
    )
})

export default router