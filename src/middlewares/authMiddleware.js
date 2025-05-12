import jwt from 'jsonwebtoken'
import TokenService from '../services/tokenService.js'
import staffRepository from '../repositories/staffRepository.js'

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(401).json({ message: 'No se proporciono un token' })
    }

    const token = authHeader.split(' ')[1]
    const staffRepository = new staffRepository()

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const existingToken = await staffRepository.getSessionToken(decoded.id)
        if(existingToken !== token || await TokenService.isTokenRevoked(token)) {
            throw { message: 'Token invalido', statusCode: 401 }
        }
        req.staff = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: 'token invalido' })
    }
}

export default authMiddleware