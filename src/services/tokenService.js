const revokedToken = new Set()

export default class TokenService {
    static revokedToken(token) {
        try {
            revokedToken.add(token)
        } catch (error) {
            throw { message: 'Error al revocar el token', statusCode: 500 }
        }
    }

    static async isTokenRevoked(token) {
        return revokedToken.has(token)
    }
}