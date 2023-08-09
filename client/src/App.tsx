import React from 'react';
import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";

function App() {
  const socket = io("ws://localhost:3000");

  // send a message to the server
  socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
  
  // receive a message from the server
  socket.on("hello from server", (...args) => {
    console.log("hello")
    // ...
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
