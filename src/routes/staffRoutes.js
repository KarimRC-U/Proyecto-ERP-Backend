import express from 'express'
import StaffController from '../controllers/staffController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const staffController = new StaffController()

const staffRoutes = [
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
        method: 'delete',
        path: '/delete/:id',
       // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'delete'
    },
    {
        method: 'post',
        path: '/login',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'login'
    },
    {
        method: 'post',
        path: '/logout',
        middleware: [authMiddleware],
        handle: 'logout'
    },
    {
        method: 'post',
        path: '/unlock/:id',
       // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'unlockstaff'
    },
    {
        method: 'get',
        path: '/staff',
       // middleware: [authMiddleware],
        handle: 'getstaffBystaffname'
    },
    {
        method: 'get',
        path: '/details/:id',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getById'
    }
]

staffRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        staffController[route.handle].bind(staffController)
    )
})

export default router