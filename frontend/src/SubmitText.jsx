import React, { useState } from 'react';
import Text from './Text';
import './SubmitText.css'
import * as firebase from 'firebase/app';
import 'firebase/auth';


const genericAnswers = ["I'm doing fine", "I'm alright", "Things are pretty crazy right now", "Hi!", "Well how are you?", "I kind of don't feel like talking right now"]
const foodPreferences = ["I like pizza", "Apple pie is an oldie but a goodie", "To be honest that's a hard one to answer!"]
const sportsPreferences = ["I have to say I love soccer", "Tom Brady is the absolute GOAT", "I like playing basketball, soccer, and American football"]
const schoolTopics = ["I can multiply any number in less than a millisecond", "I'm very smart", "I like to do math", "Algorithms is my favorite class", "The DTI web app course is pretty fire"]



export default function SubmitText({ someText }) {
  const [text, setText] = useState("");

  const [textList, setTextList] = useState([])
  const changeText = (event) => {
    const textDescrip = event.currentTarget.value;
    setText(textDescrip);

  }
  const createText = async (event) => {
    //helper function to get a computer response


    if (event.key === "Enter") {
      var randomAnswer = await getRandomAnswer(text);
      console.log("random anser: " + randomAnswer)
      let updatedTextList = [...textList, text, randomAnswer]
      console.log(updatedTextList)
      setText(''); //CLEAR INPUT FIELD
      setTextList(updatedTextList)
      console.log(updatedTextList)
    }
    else if (event.key === undefined) {
      var randomAnswer = await getRandomAnswer(text);
      let updatedTextList = [...textList, text, randomAnswer]
      setText(""); //CLEAR INPUT FIELD
      setTextList(updatedTextList)
    }
  }
  const handleCheck = (event) => {
    console.log(event.target);
    console.log(event.target.checked)
  }


  return (
    <div className="inputTextContainer">
      {
        textList.map((desc, index) => (
          <Text key={index} desc={desc} />
        ))
      }
      <input
        type="text"
        placeholder="Type a text"
        value={text}
        onChange={changeText}
        onKeyPress={createText}
      />
      <button onClick={createText}> Add Text</button>
      <div>
        <input
          type="checkbox"
          value={text}
          onChange={handleCheck}
          onKeyPress={createText}
        />
      Check for bot to reply with your custom messages
      <button onClick={() => firebase.auth().signOut()}> Sign Out </button>
      </div>

    </div>
  );
}


async function getRandomAnswer(text) {
  //run firebase deploy in frontend folder
  const r = await fetch('https://quiet-ridge-95758.herokuapp.com/getRandomResponse').then(res => res.json()).then(d => d.reply);
  //console.log(r);
  let randomAnswers = genericAnswers;
  if (text === ("") || text.toLowerCase().indexOf(" ") === 0) {
    randomAnswers = ["Im sorry it doesn't look like you said anything. Can you speak louder?"];
  }
  else if (text.toLowerCase().indexOf("food") > -1 ||
    text.toLowerCase().indexOf("meal") > -1 ||
    text.toLowerCase().indexOf("snack") > -1 ||
    text.toLowerCase().indexOf("eat") > -1) {
    //
    randomAnswers = foodPreferences;
  } else if (text.toLowerCase().indexOf("football") > -1 ||
    text.toLowerCase().indexOf("soccer") > -1 ||
    text.toLowerCase().indexOf("basketball") > -1 ||
    text.toLowerCase().indexOf("sport") > -1) {
    //
    randomAnswers = sportsPreferences;
  }
  else if (text.toLowerCase().indexOf("class") > -1 ||
    text.toLowerCase().indexOf("learn") > -1 ||
    text.toLowerCase().indexOf("school") > -1 ||
    text.toLowerCase().indexOf("cornell") > -1) {
    //
    randomAnswers = schoolTopics;
  }
  let randomAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
  console.log("this is waht r looks like " + r);
  return r;
}




// export default App;
