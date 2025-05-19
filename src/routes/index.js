import express from 'express'
import staffRoutes from './staffRoutes.js'
import budgetRoutes from './budgetRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staffs', staffRoutes)
router.use('/budgets', budgetRoutes)

export default router