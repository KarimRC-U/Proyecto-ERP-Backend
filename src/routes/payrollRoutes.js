import express from 'express'
import PayrollController from '../controllers/payrollController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const payrollController = new PayrollController()

const payrollRoutes = [
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
        handle: 'getPayrollByStaff'
    }
]

payrollRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        payrollController[route.handle].bind(payrollController)
    )
})

export default router