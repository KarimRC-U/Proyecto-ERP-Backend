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

// Map model to delete endpoint, delete data, and identifier field
const modelConfig = {
  staff:      { endpoint: '/staffs/delete/',        deleteFile: 'DeleteTest_staff.json',      idField: 'correo' },
  training:   { endpoint: '/trainings/delete/',     deleteFile: 'DeleteTest_training.json',   idField: 'description' },
  salary:     { endpoint: '/payroll/salary/delete/',deleteFile: 'DeleteTest_salary.json',     idField: 'title' }, // Adjust if needed
  budget:     { endpoint: '/budgets/delete/',       deleteFile: 'DeleteTest_budget.json',     idField: 'budgetNo' },
  memo:       { endpoint: '/memos/delete/',         deleteFile: 'DeleteTest_memo.json',       idField: 'memoNo' },
  circular:   { endpoint: '/circulars/delete/',     deleteFile: 'DeleteTest_circular.json',   idField: 'id' },
  logistics:  { endpoint: '/logistics/delete/',     deleteFile: 'DeleteTest_logistics.json',  idField: 'title' },
  stock:      { endpoint: '/stocks/delete/',        deleteFile: 'DeleteTest_stock.json',      idField: 'productName' },
  tax:        { endpoint: '/payroll/taxes/delete/', deleteFile: 'DeleteTest_tax.json',        idField: 'taxType' },
  payslip:    { endpoint: '/payroll/payslips/delete/', deleteFile: 'DeleteTest_payslip.json', idField: 'staffid' },
  payroll:    { endpoint: '/payroll/delete/',       deleteFile: 'DeleteTest_payroll.json',    idField: 'paymentName' },
  maintenance:{ endpoint: '/maintenances/delete/',  deleteFile: 'DeleteTest_maintenance.json',idField: 'itemNumber' }
}

async function runDeleteTests() {
  for (const model of modelsToTest) {
    const config = modelConfig[model]
    if (!config) {
      console.warn(`No config for model: ${model}`)
      continue
    }
    const deletePath = path.join(__dirname, '../data', config.deleteFile)
    if (!fs.existsSync(deletePath)) {
      console.warn(`Delete data file not found for model: ${model}`)
      continue
    }
    const deleteData = JSON.parse(fs.readFileSync(deletePath, 'utf-8'))
    console.log(`\nTesting delete for model: ${model}`)
    for (let i = 0; i < deleteData.length; i++) {
      const identifier = deleteData[i][config.idField]
      if (!identifier) {
        console.warn(`  [${i + 1}] No identifier (${config.idField}) found in delete data for model: ${model}`)
        continue
      }
      try {
        const url = API_BASE + config.endpoint + encodeURIComponent(identifier)
        const res = await axios.delete(url)
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

runDeleteTests()
  .then(() => console.log('\nAll delete tests finished.'))
  .catch(err => console.error('Test runner error:', err))