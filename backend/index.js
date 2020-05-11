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

app.get('/getUser', async (req, res) => {
  console.log("getting user");
  // const replies = await replyCollection.get();
  // const arr = [];
  // for (let doc of replies.docs) {
  //   let reply = doc.data();
  //   reply.id = doc.id;
  //   arr.push(doc.id);
  // }

  let user = await db.collection('chatbot replies').doc(req.query.user).get().then();
  res.send(user);
}) 

// app.post('/addUser', (req, res) => {
//   console.log("adding user");
//   db.collection('chatbot replies').doc(req.query.user).set({ }).then(function() {
//       console.log("Document successfully written!");     
//   .catch(function(error) {
//         console.error("Error writing document: ", error);
//   });
//       res.send("maybe added user");
//     
// }) 

// create a post
app.post('/addUser', async function (req, res) {
  console.log(req.query.user)
  const replyObj = req.body
  replyObj.reply = [req.query.reply]
  const user = replyCollection.doc(req.query.user);
  user.set(replyObj);
  res.send(replyObj);
});


app.get('/', () => { res.send("Backend working!"); }); 


app.get('/getRandomResponse', async (req, res) => {
  let user = await db.collection('chatbot replies').doc(req.query.user).get().then();
  //let arr = user.data().reply
  res.send(user);
}) 

app.put('/addReply', async (req, res) => {
  const user = replyCollection.doc(req.query.user);
  const snapshot = await user.get().then();
  let temp = snapshot.data().reply;
  temp.push(req.query.reply);
  user.update( { reply : temp } );
  res.send(temp);
  // console.log(req.query.user)
  // let user = replyCollection.doc(req.query.user);
  // let temp = []
  // temp = user.data().reply.push(req.query.reply)
  // user.update({
  //   reply : temp
  // })
  // //const user = replyCollection.doc(req.query.user);
  // res.send(temp);
})
  

app.listen(process.env.PORT || 8080, () => console.log("backend starting"));    

