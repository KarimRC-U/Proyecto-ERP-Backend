import express from 'express'
import LogisticsController from '../controllers/logisticsController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const logisticsController = new LogisticsController()

const logisticsRoutes = [
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
        path: '/details/:id',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getById'
    },
    {
        method: 'get',
        path: '/title/:title',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getByTitle'
    },
    {
        method: 'get',
        path: '/staff/:staffid',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getByStaff'
    },
    {
        method: 'get',
        path: '/count/total',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalRequests'
    },
    {
        method: 'get',
        path: '/costs/total',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalCosts'
    },
    {
        method: 'get',
        path: '/count/pending',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getPending'
    },
    {
        method: 'get',
        path: '/count/approved',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getApproved'
    }
]

logisticsRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        logisticsController[route.handle].bind(logisticsController)
    )
})

export default router