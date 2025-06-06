import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_BASE = 'https://backend-node-computo-rc-fwd5afd2a3fzareb.canadacentral-01.azurewebsites.net/api'

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
  staff:      { endpoint: '/staffs/delete/',            deleteFile: 'DeleteTest_staff.json',      idField: 'id' },
  training:   { endpoint: '/trainings/delete/',         deleteFile: 'DeleteTest_training.json',   idField: 'id' },
  salary:     { endpoint: '/payroll/salary/delete/',    deleteFile: 'DeleteTest_salary.json',     idField: 'id' },
  budget:     { endpoint: '/budgets/delete/',           deleteFile: 'DeleteTest_budget.json',     idField: 'id' },
  memo:       { endpoint: '/memos/delete/',             deleteFile: 'DeleteTest_memo.json',       idField: 'id' },
  circular:   { endpoint: '/circulars/delete/',         deleteFile: 'DeleteTest_circular.json',   idField: 'id' },
  logistics:  { endpoint: '/logistics/delete/',         deleteFile: 'DeleteTest_logistics.json',  idField: 'id' },
  stock:      { endpoint: '/stocks/delete/',            deleteFile: 'DeleteTest_stock.json',      idField: 'id' },
  tax:        { endpoint: '/payroll/taxes/delete/',     deleteFile: 'DeleteTest_tax.json',        idField: 'id' },
  payslip:    { endpoint: '/payroll/payslips/delete/',  deleteFile: 'DeleteTest_payslip.json',    idField: 'id' },
  payroll:    { endpoint: '/payroll/delete/',           deleteFile: 'DeleteTest_payroll.json',    idField: 'id' },
  maintenance:{ endpoint: '/maintenances/delete/',      deleteFile: 'DeleteTest_maintenance.json',idField: 'id' }
}

async function runDeleteTests() {
  for (const model of modelsToTest) {
    const config = modelConfig[model]
    if (!config) {
      console.warn(`No config for model: ${model}`)
      continue
    }
    console.log(`\nTesting delete for model: ${model}`)
    for (let i = 1; i <= 5; i++) {
      const id = `A${i}`
      try {
        const url = API_BASE + config.endpoint + encodeURIComponent(id)
        const res = await axios.delete(url)
        console.log(`  [${id}] Success:`, res.data)
      } catch (err) {
        if (err.response) {
          console.error(`  [${id}] Error:`, err.response.status, err.response.data)
        } else {
          console.error(`  [${id}] Error:`, err.message)
        }
      }
    }
  }
}

runDeleteTests()
  .then(() => console.log('\nAll delete tests finished.'))
  .catch(err => console.error('Test runner error:', err))