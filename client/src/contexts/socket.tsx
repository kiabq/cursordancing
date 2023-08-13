//? Libraries
import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

//? Types
import type { Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from "@backend/types";
import type { ISocketContext } from '../utils/types';

const SocketContext = createContext<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

export function SocketProvider({ children }: ISocketContext) {
    const ws = io("ws://localhost:5173");

    return (
        <SocketContext.Provider value={ws}>
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    return useContext(SocketContext);
} 