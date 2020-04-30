const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://info1998-final.firebaseio.com"
});

const db = admin.firestore();
const replyCollection = db.collection('chatbot replies');

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.post('/addReply', async (req, res) => {
  let song = req.body;
  let doc = replyCollection.doc()
  doc.set(song);
  res.send(doc.id);
})

app.listen(port, () => console.log("backend starting"));