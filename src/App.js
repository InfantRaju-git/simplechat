import React from 'react';
import logo from './logo.svg';
import './App.css';
(function(d, w, c) {
  w.ChatraID = 'hG7t4GAk7GZpMjZrN';
  var s = d.createElement('script');
  w[c] = w[c] || function() {
      (w[c].q = w[c].q || []).push(arguments);
  };
  s.async = true;
  s.src = 'https://call.chatra.io/chatra.js';
  if (d.head) d.head.appendChild(s);
})(document, window, 'Chatra');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hello click the chat icon to chat
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
