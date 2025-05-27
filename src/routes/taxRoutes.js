import express from 'express'
import TaxController from '../controllers/taxController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const taxController = new TaxController()

const taxRoutes = [
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
]

taxRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        taxController[route.handle].bind(taxController)
    )
})

export default router