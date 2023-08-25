//? Libraries
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//? Context
import { useManager } from '../contexts/socket';

//? Components
import Canvas from '../components/Canvas';
import Cursor from '../assets/images/Cursor';


//? Hooks
import useToast from '../hooks/useToast';
import RoomWrapper from '../components/RoomWrapper';

type Players = any;

export default function Room() {
  //! Bug: Players is not being loaded in build mode sometimes
  const [players, setPlayers] = useState<Players | undefined>();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const manager = useManager();
  const socket = manager?.socket(`/${params.room}`);

  //! Reroute if room is invalid
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    socket?.on("other_move", (...args: any) => {
      const { clients } = args[0].session;
  
      setPlayers(clients);
    })

    return () => {
      socket?.off("other_move");
    }
  }, []);

  return (
    <>
      <Cursor />

      {loaded && params.room &&
        <Canvas
          room={params.room}
          players={players}
        />
      }
    </>
  )
}