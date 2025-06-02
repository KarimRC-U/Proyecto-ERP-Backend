import axios from 'axios'
import fs from 'fs'
import path from 'path'

const API_BASE = 'http://localhost:5050/api'

// Helper to safely get a value from a test data file
function getTestValue(file, field, idx = 0) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', file), 'utf-8'))
    return data[idx][field]
  } catch {
    return undefined
  }
}

const getEndpoints = [
  // Budgets
  {
    name: 'Get Budget By Number',
    url: `/budgets/number/${getTestValue('CreateTest_budget.json', 'budgetNo')}`
  },
  {
    name: 'Get Budget By Date',
    url: `/budgets/date/${getTestValue('CreateTest_budget.json', 'date')}`
  },

  // Circulars
  {
    name: 'Get Circular By ID',
    url: `/circulars/id/${getTestValue('CreateTest_circular.json', 'id')}`
  },
  {
    name: 'Get Circular By Date',
    url: `/circulars/date/${getTestValue('CreateTest_circular.json', 'date')}`
  },

  // Logistics
  {
    name: 'Get Logistics By ID',
    url: `/logistics/id/${getTestValue('CreateTest_logistics.json', 'id')}`
  },
  {
    name: 'Get Logistics By Title',
    url: `/logistics/title/${encodeURIComponent(getTestValue('CreateTest_logistics.json', 'title'))}`
  },

  // Maintenance
  {
    name: 'Get Maintenance By Item Name',
    url: `/maintenances/item/name/${encodeURIComponent(getTestValue('CreateTest_maintenance.json', 'itemName'))}`
  },
  {
    name: 'Get Maintenance By Item Number',
    url: `/maintenances/item/number/${encodeURIComponent(getTestValue('CreateTest_maintenance.json', 'itemNumber'))}`
  },
  {
    name: 'Get Maintenance By Date',
    url: `/maintenances/date/${getTestValue('CreateTest_maintenance.json', 'date')}`
  },

  // Memo
  {
    name: 'Get Memo By Number',
    url: `/memos/number/${getTestValue('CreateTest_memo.json', 'memoNo')}`
  },
  {
    name: 'Get Memo By Date',
    url: `/memos/date/${getTestValue('CreateTest_memo.json', 'date')}`
  },

  // Payslip
  {
    name: 'Get Payslip By Staff ID',
    url: `/payroll/payslips/staff/${getTestValue('CreateTest_payslip.json', 'staffid')}`
  },

  // Payroll
  {
    name: 'Get Payroll By ID',
    url: `/payroll/${getTestValue('CreateTest_payroll.json', 'id') || 0}`
  },

  // Salary
  {
    name: 'Get Salary By ID',
    url: `/payroll/salary/${getTestValue('CreateTest_salary.json', 'id') || 0}`
  },

  // Staff
  {
    name: 'Get Staff By ID',
    url: `/staffs/${getTestValue('CreateTest_staff.json', 'id') || 0}`
  },

  // Stock
  {
    name: 'Get Stock By ID',
    url: `/stocks/id/${getTestValue('CreateTest_stock.json', 'id') || 0}`
  },
  {
    name: 'Get Stock By Name',
    url: `/stocks/name/${encodeURIComponent(getTestValue('CreateTest_stock.json', 'productName'))}`
  },

  // Tax
  {
    name: 'Get Tax By ID',
    url: `/payroll/taxes/${getTestValue('CreateTest_tax.json', 'id') || 0}`
  },

  // Training
  {
    name: 'Get Training By ID',
    url: `/trainings/id/${getTestValue('CreateTest_training.json', 'id') || 0}`
  },
  {
    name: 'Get Training By Date',
    url: `/trainings/date/${getTestValue('CreateTest_training.json', 'startDate')}`
  }
]

async function runGetTests() {
  for (const endpoint of getEndpoints) {
    try {
      const res = await axios.get(API_BASE + endpoint.url)
      console.log(`[${endpoint.name}] Success:`, res.data)
    } catch (err) {
      if (err.response) {
        console.error(`[${endpoint.name}] Error:`, err.response.status, err.response.data)
      } else {
        console.error(`[${endpoint.name}] Error:`, err.message)
      }
    }
  }
}

runGetTests()
  .then(() => console.log('\nAll GET param tests finished.'))
  .catch(err => console.error('Test runner error:', err))