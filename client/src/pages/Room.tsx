//? Libraries
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/socket';

//? Components
import Canvas from '../components/Canvas';
import Cursor from '../assets/images/Cursor';

//? Hooks
import useToast from '../hooks/useToast';
import Toast from '../components/Toast';

type Players = any;

interface IRoom {
    room: string
}

export default function Room({ room }: IRoom) {
    const [players, setPlayers] = useState<Players | null>(null);
    const [loaded, setLoaded] = useState(false);
    const { toast, showToast } = useToast();
    const socket = useSocket();
    const navigate = useNavigate();

    // TODO: Add unmounting functions for sockets
    // TODO: Separate this into components & lib functions
    
    useEffect(() => {
      socket?.emit("connect_to", room, (response) => {                                                                           
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
  
    socket?.on("other_move", (...args: any) => {
      const { clients } = args[0].session; 

      setPlayers(clients);
    })

    socket?.on("user_disconnected", (user) => {
      showToast(`${user} Disconnected`, 'fail');
    })

    return (
      <>
        {toast && <Toast message={toast?.message} status='fail' /> }

        <Cursor />

        {loaded && 
          <Canvas 
            room={room}
            players={players} 
          />
        }
      </>
    )
  }