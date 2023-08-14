// React
import React, { useEffect, useState, useRef } from 'react';

// Libraries
import { useParams } from 'react-router-dom';
import { useSocket } from '../contexts/socket';
import { useNavigate } from 'react-router-dom';

type Players = any;

interface IRoom {
    room: string
}

export default function Room({ room }: IRoom) {
    const [players, setPlayers] = useState<Players | null>(null);
    const [loaded, setLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const params = useParams();
    const socket = useSocket();
    const navigate = useNavigate();

    // TODO: Add unmounting functions for sockets
    // TODO: Separate this into components & lib functions
  
    function EmitCursor(event: React.MouseEvent) {
      const pos = {
        x: event.pageX / window.innerWidth,
        y: event.pageY / window.innerHeight
      }
  
      socket?.emit("player_move", pos);
    }

    useEffect(() => {
      socket?.emit("connect_to", params[room], (response) => {                                                                           
        if (response.status === "fail") {
          navigate("/invalid-room");
        } else {
          setLoaded(true);
        }
      });
      socket?.connect();

      return () => { 
        socket?.disconnect();
      }
    }, [socket])
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas instanceof HTMLCanvasElement) {
        const ctx = (canvas as HTMLCanvasElement).getContext('2d');
        const canvasW = canvas.width;
        const canvasH = canvas.height;
  
        // TODO: Draw SVG image to canvas
  
        ctx!.fillStyle = "#DFCCFB";
        ctx!.fillRect(0, 0, canvasW, canvasH);
  
        if (players) {
          {
            Object.keys(players).forEach((key) => {
              if (socket?.id !== key && players[key].position) {
                ctx!.fillStyle = 'black';
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
    }, [players])

    socket?.on("other_move", (...args: any) => {
      setPlayers(args[2]);
    })
  
    return (
      <>
        {/* Render users' cursors to screen except self (temporary) */}
        {players && Object.keys(players).map((key) => {
          if (players[key].position !== null) {
            return (
              <span style={{
                "position": "absolute",
                "top": `${window.innerHeight * players[key].position.y}px`,
                "marginLeft": `${window.innerWidth * players[key].position.x}px`
              }}>
                {key}
              </span>
            )
          }
        })}
        {loaded && 
          <canvas
            className="App"
            style={{"backgroundColor": "#DFCCFB"}}
            height={window.innerHeight}
            width={window.innerWidth}
            onMouseMove={(e) => { EmitCursor(e) }}
            ref={canvasRef}
          >
          </canvas>
        }
      </>
    )
  }