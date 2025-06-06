import axios from 'axios'

const API_BASE = 'https://backend-node-computo-rc-fwd5afd2a3fzareb.canadacentral-01.azurewebsites.net/api'

const statisticsEndpoints = [
  // Budgets
  { name: 'Annual Budget', url: '/budgets/annual' },

  // Stocks
  { name: 'Total Items in Stock', url: '/stocks/count/items' },
  { name: 'Total Item Cost', url: '/stocks/cost/total' },
  { name: 'Total Categories in Stock', url: '/stocks/count/categories' },
  { name: 'Items in Low Stock', url: '/stocks/lowstock' },

  // Logistics
  { name: 'Total Requests in Logistics', url: '/logistics/count/total' },
  { name: 'Total Costs in Logistics', url: '/logistics/costs/total' },
  { name: 'Total Pending Logistics', url: '/logistics/count/pending' },
  { name: 'Total Approved Logistics', url: '/logistics/count/approved' },

  // Maintenance
  { name: 'Total Completed Maintenance', url: '/maintenances/count/completed' },
  { name: 'Total Pending Maintenance', url: '/maintenances/count/pending' },
  { name: 'Total Overdue Maintenance', url: '/maintenances/count/overdue' },
  { name: 'Total Schedules Maintenance', url: '/maintenances/count/total' },

  // Trainings
  { name: 'Total Trainings Done', url: '/trainings/count/done' },
  { name: 'Total Trainings Requested', url: '/trainings/count/requests' },
  { name: 'Total Staff Trained', url: '/trainings/count/stafftrained' },
  { name: 'Staff Training Rate', url: '/trainings/rate/stafftraining' },

  // Memos
  { name: 'Total Memos', url: '/memos/count/total' },

  // Circulars
  { name: 'Total Circulars', url: '/circulars/count/total' },

]

async function runStatisticsTests() {
  for (const stat of statisticsEndpoints) {
    try {
      const res = await axios.get(API_BASE + stat.url)
      console.log(`[${stat.name}] Success:`, res.data)
    } catch (err) {
      if (err.response) {
        console.error(`[${stat.name}] Error:`, err.response.status, err.response.data)
      } else {
        console.error(`[${stat.name}] Error:`, err.message)
      }
    }
  }
}

runStatisticsTests()
  .then(() => console.log('\nAll statistics tests finished.'))
  .catch(err => console.error('Test runner error:', err))