// React
import React, { useEffect, useState, useRef } from 'react';

// Libraries
import { io } from "socket.io-client";
import type { Socket } from 'socket.io-client';

// Styling
import './App.css';

type DefaultEventsMap = any;
type Players = any;

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
    socket.connect();

    return () => { socket.disconnect() }
  }, [socket])

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
        {
          Object.keys(players).forEach((key) => {
            if (socket.id !== key && players[key].position) {
              let color = `rgb(${Math.random() * 255, Math.random() * 255, Math.random() * 255})`;

              ctx!.fillStyle = color;
              ctx!.fillRect(
                window.innerWidth * players[key]?.position.x | 0,
                window.innerHeight * players[key]?.position.y | 0,
                20,
                20
              )
            }
          })
        }
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
    setPlayers(args[2]);
  })

  return (
    <>
      {players && Object.keys(players).map((key) => {
        if (players[key].position !== null) {
          return (
            <span style={{
              "position": "absolute",
              "top": `${window.innerHeight* players[key].position.y}px`,
              "marginLeft": `${window.innerWidth * players[key].position.x}px`
            }}>
              {key}
            </span>
          )
        }
      })}
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