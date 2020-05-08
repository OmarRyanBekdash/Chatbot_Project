import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyDGtCGt80rmkH6QlfDWnYl9mzhp44F2MlA",
  authDomain: "dti-final-project-c7413.firebaseapp.com",
  databaseURL: "https://dti-final-project-c7413.firebaseio.com",
  projectId: "dti-final-project-c7413",
  storageBucket: "dti-final-project-c7413.appspot.com",
  messagingSenderId: "411724043939",
  appId: "1:411724043939:web:24ba94d108b9613632d116",
  measurementId: "G-J90PV45QJZ"
};

firebase.initializeApp(firebaseConfig);
export default (props) => {
  const [user, setUser] = useState(null);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }

  useEffect(() => onAuthStateChange(), []);
  return (
    <div>
      {user && props.children}
      {!user && (
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      )}
    </div>
  );
}