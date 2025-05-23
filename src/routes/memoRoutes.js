import express from 'express'
import MemoController from '../controllers/memoController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const memoController = new MemoController()

const memoRoutes = [
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
        path: '/number/:memoNo',
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
        path: '/keywords/:keywords',
        // middleware: [authMiddleware],
        handle: 'getByKeywords'
    },
    {
        method: 'get',
        path: '/count/total',
        // middleware: [authMiddleware],
        handle: 'getTotalCount'
    },
    {
        method: 'get',
        path: '/details/:id',
        // middleware: [authMiddleware],
        handle: 'getMemoDetails'
    }
]

memoRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        memoController[route.handle].bind(memoController)
    )
})

export default router