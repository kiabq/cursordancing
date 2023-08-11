// React
import React, { useEffect, useState, useRef } from 'react';

// Libraries
import { io } from "socket.io-client";
import type { Socket } from 'socket.io-client';

// Styling
import './App.css';

type DefaultEventsMap = any;
type Players = {
  x: number,
  y: number
}

function Game({ socket }: { socket: Socket<DefaultEventsMap, DefaultEventsMap> }) {
  const [players, setPlayers] = useState<Players | null>(null);
  const [prev, setPrev] = useState<any>();
  const [id, setId] = useState<string | undefined>(socket.id);
  const canvasRef = useRef(null);

  function EmitCursor(event: React.MouseEvent) {
    const pos = {
      x: event.pageX / window.innerWidth,
      y: event.pageY / window.innerHeight
    }

    socket.emit("player_move", pos);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext('2d');
      if (prev) {
        ctx!.fillStyle = 'white';
        ctx!.rect(
          prev.x,
          prev.y,
          20,
          20
        )

        ctx!.strokeStyle = 'white';
        ctx!.lineWidth = 5;
        ctx!.stroke();
        ctx!.fill();
      }
      
      if (players) {
        ctx!.fillStyle = "red";
        ctx!.fillRect(
          window.innerWidth * players?.x, 
          window.innerHeight * players?.y,
          20,
          20
        )
      }
    }

    setPrev(
      {
        x: players ? window.innerWidth * players?.x : null, 
        y: players ? window.innerHeight * players?.y : null,
        
      }
    )
  }, [players])

  socket.on("connect", () => {
    setId(socket.id);
  })

  socket.on("other_move", (...args: any) => {
    const movingSocket = args[1];

    if (movingSocket !== socket.id) {
      setPlayers(args[0]);
    }
  })

  return (
    <>
      <canvas
        className="App"
        height={window.innerHeight}
        width={window.innerWidth}
        onMouseMove={(e) => { EmitCursor(e) }}
        ref={canvasRef}
      >
      </canvas>
    </>
  )
}

function App() {
  const socket = io("ws://localhost:5173");

  return (
    <div style={{ "height": "100vh", "width": "100vw", "overflow": "hidden" }}>
      <Game socket={socket} />
    </div>
  );
}

export default App;