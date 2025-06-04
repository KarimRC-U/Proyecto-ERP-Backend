import axios from 'axios'

const API_BASE = 'http://localhost:5050/api'

async function testLoginLogout() {
    const loginData = {
        correo: 'karim1@ugto.mx',
        password: '1234'
    }

    try {
        const loginRes = await axios.post(`${API_BASE}/staffs/login`, loginData)
        console.log('Login Success:', loginRes.data)
        const token = loginRes.data.token

        const logoutRes = await axios.post(
            `${API_BASE}/staffs/logout`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
        console.log('Logout Success:', logoutRes.status)
    } catch (err) {
        if (err.response) {
            console.error('Error:', err.response.status, err.response.data)
        } else {
            console.error('Error:', err.message)
        }
    }
}

testLoginLogout()