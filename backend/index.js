const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dti-final-project-c7413.firebaseio.com"
});

const db = admin.firestore();
const replyCollection = db.collection('chatbot replies');

const app = express();
app.use(cors()); 
  const port = 8080;
app.use(bodyParser.json());

app.post('/addReply', async (req, res) => {
  let song = req.body;
  let doc = replyCollection.doc()
  doc.set(song);
  res.send(doc.id);
})

app.get('/getReplies', async (req, res) => {
  console.log("getting all replies");
  const replies = await replyCollection.get();
  res.json(replies.docs.map(r => r.reply));
})

app.get('/', () => { res.send("Backend working!"); }); 


app.get('/getRandomResponse', async (req, res) => {
  const replies = await replyCollection.get();
  const arr = [];
  for (let doc of replies.docs) {
    let reply = doc.data();
    reply.id = doc.id;
    arr.push(reply);
  }
  
  let randomIndex = Math.floor(Math.random() * arr.length);
console.log("sending json " + arr[randomIndex].json);
  res.send(arr[randomIndex]);
}) 


app.listen(process.env.PORT || 5000, () => console.log("backend starting"));    

