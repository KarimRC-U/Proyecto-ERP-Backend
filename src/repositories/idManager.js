import { db } from '../config/firebase.js'

export async function getNextId(collectionName, idField = 'id') {
    const snapshot = await db.collection(collectionName).orderBy(idField, 'desc').limit(1).get();
    if (snapshot.empty) return 1;
    return (snapshot.docs[0].data()[idField] || 0) + 1;
}