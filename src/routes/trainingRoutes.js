import express from 'express'
import TrainingController from '../controllers/trainingController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const trainingController = new TrainingController()

const trainingRoutes = [
    {
        method: 'get',
        path: '/',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getAll'
    },
    {
        method: 'get',
        path: '/details/:id',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getById'
    },
    {
        method: 'get',
        path: '/date/:date',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getByDate'
    },
    {
        method: 'get',
        path: '/count/requests',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalRequests'
    },
    {
        method: 'get',
        path: '/count/stafftrained',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalStaffTrained'
    },
    {
        method: 'get',
        path: '/count/done',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getTotalDone'
    },
    {
        method: 'get',
        path: '/rate/stafftraining',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'getStaffTrainingRate'
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
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'update'
    },
    {
        method: 'put',
        path: '/update/approve/:id',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'update'
    },
    {
        method: 'delete',
        path: '/delete/:id',
        //middleware: [authMiddleware, roleMiddleware('admin')],
        handle: 'delete'
    }
]

trainingRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        trainingController[route.handle].bind(trainingController)
    )
})

export default router