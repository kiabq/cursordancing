//? Libraries
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useManager } from '../contexts/socket';

//? Components
import Canvas from '../components/Canvas';
import Cursor from '../assets/images/Cursor';

//? Hooks
import useToast from '../hooks/useToast';
import Toast from '../components/Toast';

type Players = any;

export default function Room() {
  //! Bug: Players is not being loaded in build mode sometimes
  const [players, setPlayers] = useState<Players | undefined>();
  const [loaded, setLoaded] = useState(false);
  const { toast, showToast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const manager = useManager();
  const socket = manager?.socket(`/${params.room}`);

  //! Reroute if room is invalid
  useEffect(() => {
    socket?.connect();
    setLoaded(true);

    return (() => {
      socket?.disconnect()
    })
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
      {toast && <Toast message={toast?.message} status='fail' />}

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