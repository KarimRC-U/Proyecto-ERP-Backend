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
  staff:      { endpoint: '/staffs/create',        dataFile: 'CreateTest_staff.json' },
  training:   { endpoint: '/trainings/create',     dataFile: 'CreateTest_training.json' },
  salary:     { endpoint: '/payroll/salary/create',dataFile: 'CreateTest_salary.json' },
  budget:     { endpoint: '/budgets/create',       dataFile: 'CreateTest_budget.json' },
  memo:       { endpoint: '/memos/create',         dataFile: 'CreateTest_memo.json' },
  circular:   { endpoint: '/circulars/create',     dataFile: 'CreateTest_circular.json' },
  logistics:  { endpoint: '/logistics/create',     dataFile: 'CreateTest_logistics.json' },
  stock:      { endpoint: '/stocks/create',        dataFile: 'CreateTest_stock.json' },
  tax:        { endpoint: '/payroll/taxes/create', dataFile: 'CreateTest_tax.json' },
  payslip:    { endpoint: '/payroll/payslips/create', dataFile: 'CreateTest_payslip.json' },
  payroll:    { endpoint: '/payroll/create',       dataFile: 'CreateTest_payroll.json' },
  maintenance:{ endpoint: '/maintenances/create',  dataFile: 'CreateTest_maintenance.json' }
}

async function runCreateTests() {
  for (const model of modelsToTest) {
    const config = modelConfig[model]
    if (!config) {
      console.warn(`No config for model: ${model}`)
      continue
    }
    const dataPath = path.join(__dirname, '../data', config.dataFile)
    if (!fs.existsSync(dataPath)) {
      console.warn(`Data file not found: ${dataPath}`)
      continue
    }
    const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    console.log(`\nTesting create for model: ${model}`)
    for (const [i, entry] of testData.entries()) {
      try {
        const res = await axios.post(API_BASE + config.endpoint, entry)
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

runCreateTests()
  .then(() => console.log('\nAll create tests finished.'))
  .catch(err => console.error('Test runner error:', err))