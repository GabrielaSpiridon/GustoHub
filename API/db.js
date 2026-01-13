const admin = require('firebase-admin');

function initializeFirestore() {
    //Incarca fisierul de configurare Firebase
    const serviceAccount = require('./firebase-key.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    // Returneaza instanta bd Firesotore
    return admin.firestore();
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = initializeFirestore();

module.exports = db;
