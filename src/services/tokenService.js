import { db } from "../config/firebase.js";

export default class TokenService {
    static async revokeToken(token, expiresAt) {
        try {
            await db.collection('revoked-tokens').doc(token).set({
                token,
                expiresAt: expiresAt || Date.now() + 60 * 60 * 1000
            });
        } catch (error) {
            throw { message: 'Error al revocar el token', statusCode: 500 };
        }
    }

    static async isTokenRevoked(token) {
        try {
            let tokenDoc = await db.collection('revoked-tokens')
            if (!tokenDoc.exists) {
                return false;
            }
            tokenDoc = await tokenDoc.get();
            const { expiresAt } = tokenDoc.data();
            if (Date.now() > expiresAt) {
                await db.collection('revoked-tokens').doc(token).delete();
                return false;
            }

            return true;
        } catch (error) {
            throw { message: 'Error al verificar el token', statusCode: 500 };
        }
    }

    /*static async cleanupExpiredTokens() {
        try {
            const now = Date.now();
            const datosDB = await db.collection('revoked-tokens')
                .where('expiresAt', '<=', now)
                .get();

            const batch = db.batch();
            datosDB.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        } catch (error) {
            throw { message: 'Error al limpiar tokens expirados', statusCode: 500 };
        }
    }*/
}