const fetch = require('node-fetch');
const DOMParser = require('dom-parser');
const admin = require("firebase-admin");
const { v4: uuid } = require('uuid');

const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_ADMIN_KEY,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
},
    uuid()
);

const db = firebase.firestore();
const messaging = firebase.messaging();

let lastData, lastDocId;

const isEqual = function (a, b) {
    a.sort((x, y) => {
        return x.percentage - y.percentage;
    });
    b.sort((x, y) => {
        return x.percentage - y.percentage;
    });
    if (a.length != b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if ((a[i].title !== b[i].title) || (a[i].percentage !== b[i].percentage)) {
            return false;
        }
    }

    return true;
}


const getProgressData = async function () {
    let data = [];

    await fetch("https://www.brandonsanderson.com/", {
    })
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let labels = doc.getElementsByClassName("vc_label");

            for (let i = 0; i < labels.length; i++) {
                let label = labels[i].textContent;
                let splitted = label.split(' ');
                data.push({
                    title: splitted.slice(0, -1).join(' '),
                    percentage: parseInt(splitted.slice(-1)[0].slice(0, -1)),
                });
            }
        })
    return data;
}

const checkDataAndUpdate = async function (req, res) {
    if (lastDocId !== null) {
        const querySnapshot = await db.collection("progressData")
            .orderBy("checkedOn", "desc")
            .limit(1)
            .get();
        if (querySnapshot.empty) {
            await getProgressData().then(async (data) => {
                const docRef = await db.collection('progressData').add({
                    data: data,
                    updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                    checkedOn: admin.firestore.FieldValue.serverTimestamp()
                });
                lastData = data;
                lastDocId = docRef.id;
            });
            res.statusCode = 200;
            res.json({ message: "Data updated for the first time." });
            return;
        } else {
            const doc = querySnapshot.docs[0].data();
            lastData = doc.data;
            lastDocId = querySnapshot.docs[0].id;
        }
    }
    await getProgressData().then(async (data) => {
        if (isEqual(data, lastData)) {
            await db.collection('progressData').doc(lastDocId).update({
                checkedOn: admin.firestore.FieldValue.serverTimestamp()
            });

            res.statusCode = 200;
            res.json({ message: "Done checking. Data hasn't updated. Same old, same old." });
        } else {
            const docRef = await db.collection('progressData').add({
                data: data,
                updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                checkedOn: admin.firestore.FieldValue.serverTimestamp()
            });

            lastDocId = docRef.id;
            lastData = data;

            const message = {
                notification: {
                    title: 'Brandon Sanderson Progress Updated',
                    body: "Check out the new update in Brandon Sanderson's progress bars.",
                    icon: "https://bransan.vercel.app/apple-touch-icon.png",
                    click_action: "https://bransan.vercel.app"
                }
            };
            await messaging.sendToTopic('bransanupdate', message).then((response) => {
                console.log('Successfully sent message:', response);
            })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });

            res.statusCode = 200;
            res.json({ message: "Data updated! New document created." });
        }
    });
}

module.exports = async (req, res) => {
    await checkDataAndUpdate(req, res);
}
