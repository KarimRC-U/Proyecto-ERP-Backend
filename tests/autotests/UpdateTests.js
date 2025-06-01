import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_BASE = 'http://localhost:5050/api'

const modelsToTest = [
  'staff',
  'training',
  'salary',
  'budget',
  'memo',
  'circular',
  'logistics',
  'stock',
  'tax',
  'payslip',
  'payroll',
  'maintenance'
]

const modelConfig = {
  staff: { endpoint: '/staffs/update/modified/', createFile: 'CreateTest_staff.json', updateFile: 'UpdateTest_staff.json', idField: 'staffid' },
  training: { endpoint: '/trainings/update/modified/', createFile: 'CreateTest_training.json', updateFile: 'UpdateTest_training.json', idField: 'id' },
  salary: { endpoint: '/payroll/salary/update/', createFile: 'CreateTest_salary.json', updateFile: 'UpdateTest_salary.json', idField: 'id' },
  budget: { endpoint: '/budgets/update/', createFile: 'CreateTest_budget.json', updateFile: 'UpdateTest_budget.json', idField: 'budgetNo' },
  memo: { endpoint: '/memos/update/', createFile: 'CreateTest_memo.json', updateFile: 'UpdateTest_memo.json', idField: 'memoNo' },
  circular: { endpoint: '/circulars/update/modified/', createFile: 'CreateTest_circular.json', updateFile: 'UpdateTest_circular.json', idField: 'id' },
  logistics: { endpoint: '/logistics/update/', createFile: 'CreateTest_logistics.json', updateFile: 'UpdateTest_logistics.json', idField: 'id' },
  stock: { endpoint: '/stocks/update/', createFile: 'CreateTest_stock.json', updateFile: 'UpdateTest_stock.json', idField: 'id' },
  tax: { endpoint: '/payroll/taxes/update/', createFile: 'CreateTest_tax.json', updateFile: 'UpdateTest_tax.json', idField: 'id' },
  payslip: { endpoint: '/payroll/payslips/update/', createFile: 'CreateTest_payslip.json', updateFile: 'UpdateTest_payslip.json', idField: 'id' },
  payroll: { endpoint: '/payroll/update/', createFile: 'CreateTest_payroll.json', updateFile: 'UpdateTest_payroll.json', idField: 'id' },
  maintenance: { endpoint: '/maintenances/update/', createFile: 'CreateTest_maintenance.json', updateFile: 'UpdateTest_maintenance.json', idField: 'id' }
}

async function runUpdateTests() {
  for (const model of modelsToTest) {
    const config = modelConfig[model]
    if (!config) {
      console.warn(`No config for model: ${model}`)
      continue
    }
    const createPath = path.join(__dirname, '../data', config.createFile)
    const updatePath = path.join(__dirname, '../data', config.updateFile)
    if (!fs.existsSync(createPath) || !fs.existsSync(updatePath)) {
      console.warn(`Data file not found for model: ${model}`)
      continue
    }
    const createData = JSON.parse(fs.readFileSync(createPath, 'utf-8'))
    const updateData = JSON.parse(fs.readFileSync(updatePath, 'utf-8'))
    console.log(`\nTesting update for model: ${model}`)
    for (let i = 0; i < Math.min(createData.length, updateData.length); i++) {
      const identifier = createData[i][config.idField]
      if (!identifier) {
        console.warn(`  [${i + 1}] No identifier (${config.idField}) found in create data for model: ${model}`)
        continue
      }
      try {
        const url = API_BASE + config.endpoint + encodeURIComponent(identifier)
        const res = await axios.put(url, updateData[i])
        console.log(`  [${i + 1}] Success:`, res.data)
      } catch (err) {
        if (err.response) {
          console.error(`  [${i + 1}] Error:`, err.response.status, err.response.data)
        } else {
          console.error(`  [${i + 1}] Error:`, err.message)
        }
      }
    }
  }
}

runUpdateTests()
  .then(() => console.log('\nAll update tests finished.'))
  .catch(err => console.error('Test runner error:', err))