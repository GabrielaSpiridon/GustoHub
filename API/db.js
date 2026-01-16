const admin = require('firebase-admin');

function initializeFirestore() {
    //Incarca fisierul de configurare Firebase
    const keyPath = process.env.FIREBASE_KEY_PATH;
    const serviceAccount = require(keyPath);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    // Returneaza instanta bd Firesotore
    return admin.firestore();
}

const db = initializeFirestore();

module.exports = db;
