import express from 'express'
import StockController from '../controllers/stockController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const stockController = new StockController()

const stockRoutes = [
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
        method: 'get',
        path: '/name/:productName',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getByName'
    },
    {
        method: 'get',
        path: '/details/:id',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getById'
    },
    {
        method: 'get',
        path: '/count/categories',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalCategories'
    },
    {
        method: 'get',
        path: '/count/items',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalItems'
    },
    {
        method: 'get',
        path: '/cost/total',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalItemCost'
    },
    {
        method: 'get',
        path: '/lowstock',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getItemsInLowStock'
    }
]

stockRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        stockController[route.handle].bind(stockController)
    )
})

export default router