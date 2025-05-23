import express from 'express'
import staffRoutes from './staffRoutes.js'
import budgetRoutes from './budgetRoutes.js'
import salaryRoutes from './salaryRoutes.js'
import taxRoutes from './taxRoutes.js'
import payslipRoutes from './payslipRoutes.js'
import payrollRoutes from './payrollRoutes.js'

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

export default router