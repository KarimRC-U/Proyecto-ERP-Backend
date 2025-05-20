import express from 'express'
import BudgetController from '../controllers/budgetController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const budgetController = new BudgetController()

const budgetRoutes = [
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
        path: '/number/:budgetNo',
        // middleware: [authMiddleware],
        handle: 'getByNumber'
    },
    {
        method: 'get',
        path: '/date/:date',
        // middleware: [authMiddleware],
        handle: 'getByDate'
    },
    {
        method: 'get',
        path: '/annual',
        // middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getAnnualBudget'
    }
]

budgetRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        budgetController[route.handle].bind(budgetController)
    )
})

export default router