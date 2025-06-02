import axios from 'axios'

const API_BASE = 'http://localhost:5050/api'

const getEndpoints = [
  // Budgets
  {
    name: 'Get Budget By Date',
    url: `/budgets/date/2025-07-01`
  },
  {
    name: 'Get Annual Budget',
    url: '/budgets/annual'
  },
  {
    name: 'Get Budget By ID',
    url: `/budgets/details/1`
  },

  // Circulars
  {
    name: 'Get Circular By ID',
    url: `/circulars/details/1`
  },
  {
    name: 'Get Circular By Date',
    url: `/circulars/date/2025-07-01`
  },
  {
    name: 'Get Circulars By Date and Order',
    url: `/circulars/date/2025-07-01/order/asc`
  },

  // Logistics
  {
    name: 'Get Logistics By ID',
    url: `/logistics/details/1`
  },
  {
    name: 'Get Logistics By Title',
    url: `/logistics/title/Office Supplies`
  },
  {
    name: 'Get Logistics By Staff',
    url: `/logistics/staff/FCR123`
  },

  // Maintenance
  {
    name: 'Get Maintenance By ID',
    url: `/maintenances/details/1`
  },
  {
    name: 'Get Maintenance By Item Name',
    url: `/maintenances/item/name/Printer`
  },
  {
    name: 'Get Maintenance By Item Number',
    url: `/maintenances/item/number/PR001`
  },
  {
    name: 'Get Maintenance By Date',
    url: `/maintenances/date/2025-07-01`
  },
  {
    name: 'Get Maintenance Details',
    url: `/maintenances/details/Printer/PR001`
  },

  // Memo
  {
    name: 'Get Memo By ID',
    url: `/memos/details/1`
  },
  {
    name: 'Get Memo By Date',
    url: `/memos/date/2025-07-05`
  },
  {
    name: 'Get Memo By Keywords',
    url: `/memos/keywords/Policy`
  },

  // Payslip
  {
    name: 'Get Payslip By ID',
    url: `/payroll/payslips/details/1`
  },
  {
    name: 'Get Payslip By Staff ID',
    url: `/payroll/payslips/staff/FCR123`
  },

  // Payroll
  {
    name: 'Get Payroll By ID',
    url: `/payroll/details/1`
  },
  {
    name: 'Get Payroll Gross Salary for Month',
    url: `/payroll/gross/6/2025`
  },
  {
    name: 'Get Payroll Net Salary for Month',
    url: `/payroll/net/6/2025`
  },
  {
    name: 'Get Payroll Tax for Month',
    url: `/payroll/tax/6/2025`
  },
  {
    name: 'Get Payroll Loan for Month',
    url: `/payroll/loan/6/2025`
  },

  // Salary
  {
    name: 'Get Salary By ID',
    url: `/payroll/salary/details/1`
  },

  // Staff
  {
    name: 'Get Staff By ID',
    url: `/staffs/details/1`
  },

  // Stock
  {
    name: 'Get Stock By ID',
    url: `/stocks/details/1`
  },
  {
    name: 'Get Stock By Name',
    url: `/stocks/name/Laptop`
  },

  // Tax
  {
    name: 'Get Tax By ID',
    url: `/payroll/taxes/details/1`
  },

  // Training
  {
    name: 'Get Training By ID',
    url: `/trainings/details/1`
  },
  {
    name: 'Get Training By Date',
    url: `/trainings/date/2025-07-01`
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