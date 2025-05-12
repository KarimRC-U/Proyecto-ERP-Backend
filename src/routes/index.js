import express from 'express'
import staffRoutes from './staffRoutes.js'
import pacienteRoutes from './pacienteRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staffs', staffRoutes)
router.use('/pacientes', pacienteRoutes)

export default router