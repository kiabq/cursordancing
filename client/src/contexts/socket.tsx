//? Libraries
import React, { createContext, useContext } from 'react';
import { io, Manager } from 'socket.io-client';


//? Types
import type { ServerToClientEvents, ClientToServerEvents } from "@backend/types";
import type { ISocketContext } from '../utils/types';

const SocketContext = createContext<Manager<ServerToClientEvents, ClientToServerEvents> | null>(null);

export function SocketProvider({ children }: ISocketContext) {
    const ws = new Manager(`ws://localhost:5173`);

    return (
        <SocketContext.Provider value={ws}>
            {children}
        </SocketContext.Provider>
    )
}

export function useManager() {
    return useContext(SocketContext);
} 