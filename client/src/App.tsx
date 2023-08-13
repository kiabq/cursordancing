//? React
import * as React from "react";

//? Libraries
import { io } from "socket.io-client";

//? Contexts
import { SocketProvider } from "./contexts/socket";

//? Components
import Room from "./components/Room";

//? Styling
import './App.css';

function App() {
  return (
    <SocketProvider>
      <div style={{ "height": "100vh", "width": "100vw", "overflow": "hidden", "backgroundColor": "#DFCCFB" }}>
        <Room />
      </div>
    </SocketProvider>
  );
}

export default App;