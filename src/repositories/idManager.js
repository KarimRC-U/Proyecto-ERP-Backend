import { db } from '../config/firebase.js'

export async function getNextId(collectionName, idField = 'id') {
    const snapshot = await db.collection(collectionName).orderBy(idField, 'desc').limit(1).get();
    if (snapshot.empty) return 'A1';

    const lastId = snapshot.docs[0].data()[idField];

    const match = /^([A-Z])(\d{1,2})$/.exec(lastId);
    if (!match) return 'A1'; 

    let [ , letter, number ] = match;
    number = parseInt(number, 10);

    if (number < 99) {
        return `${letter}${number + 1}`;
    } else {
        const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
        return `${nextLetter}1`;
    }
}