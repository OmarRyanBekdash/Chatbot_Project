import React from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './Text.jsx';
import SubmitText from './SubmitText.jsx';
import Authenticated from './Authenticated.jsx';

function App() {
  return (
    <div>
      <Authenticated>
        <SubmitText someText="RIP" />
      </Authenticated>

    </div>
  );
}

export default App;
