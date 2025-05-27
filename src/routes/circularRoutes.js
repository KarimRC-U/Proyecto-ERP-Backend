import express from 'express'
import CircularController from '../controllers/circularController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const circularController = new CircularController()

const circularRoutes = [
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
    }
]

circularRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        circularController[route.handle].bind(circularController)
    )
})

export default router