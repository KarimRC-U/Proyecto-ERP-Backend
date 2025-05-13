import { db } from "../config/firebase.js";

export default class TokenService {
    static async revokeToken(token, expiresAt) {
        try {
            await db.collection('revoked_tokens').doc(token).set({
                token,
                expiresAt: expiresAt || Date.now() + 60 * 60 * 1000
            });
        } catch (error) {
            throw { message: 'Error al revocar el token', statusCode: 500 };
        }
    }

    static async isTokenRevoked(token) {
        try {
            const tokenDoc = await db.collection('revoked_tokens').doc(token).get();
            if (!tokenDoc.exists) {
                return false;
            }

            const { expiresAt } = tokenDoc.data();
            if (Date.now() > expiresAt) {
                await db.collection('revoked_tokens').doc(token).delete();
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
            const snapshot = await db.collection('revoked_tokens')
                .where('expiresAt', '<=', now)
                .get();

            const batch = db.batch();
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        } catch (error) {
            throw { message: 'Error al limpiar tokens expirados', statusCode: 500 };
        }
    }*/
}