import express from 'express'
import staffRoutes from './staffRoutes.js'
import budgetRoutes from './budgetRoutes.js'
import salaryRoutes from './salaryRoutes.js'
import taxRoutes from './taxRoutes.js'
import payslipRoutes from './payslipRoutes.js'
import payrollRoutes from './payrollRoutes.js'
import trainingRoutes from './trainingRoutes.js'
import memoRoutes from './memoRoutes.js'
import circularRoutes from './circularRoutes.js'
import logisticsRoutes from './logisticsRoutes.js'
import stockRoutes from './stockRoutes.js'
import maintenanceRoutes from './maintenanceRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staffs', staffRoutes)
router.use('/budgets', budgetRoutes)
router.use('/payroll/salary', salaryRoutes)
router.use('/payroll/taxes', taxRoutes)
router.use('/payroll/payslips', payslipRoutes)
router.use('/payroll', payrollRoutes)
router.use('/trainings', trainingRoutes)
router.use('/memos', memoRoutes)
router.use('/circulars', circularRoutes)
router.use('/logistics', logisticsRoutes)
router.use('/stocks', stockRoutes)
router.use('/maintenances', maintenanceRoutes)

export default router