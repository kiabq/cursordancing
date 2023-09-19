//? Libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//? Context
import { useManager } from '../contexts/socket';

//? Components
import Canvas from '../components/Canvas';
import Cursor from '../assets/images/Cursor';

type Players = any;

export default function Room() {
  //! Bug: Players is not being loaded in build mode sometimes
  const [players, setPlayers] = useState<Players | undefined>({});
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const manager = useManager();
  const socket = manager?.socket(`/${params.room}`);

  //! Reroute if room is invalid
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    socket?.on("other_move", (...args: any) => {
      setPlayers(args[0]);
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