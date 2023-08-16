//? Types
import type { Clients } from "../src/services/clients";

//? Socket Types
type UserInfo = {
    position: {
        x: number,
        y: number,
    }
    room_id: string
}

export interface ServerToClientEvents {
    other_move: (clients: any) => void;
    room_error: (message: string) => void;
    room_new: (room_created: IRoom) => void;
    clients: any;
}

export interface ClientToServerEvents {
    connect_to: (
        room: string | undefined,
        callback: (response: any) => void
    ) => void;
    player_move: (
        user_info: UserInfo
    ) => void;
}

export interface InterServerEvents { }

export interface SocketData { }

//? Room Types

export interface IRoom {
    id: string,
    createdBy: string,
    session: Clients,
}

export interface IRoomList {
    [key: string]: IRoom
};

//? Client Types

export type ClientPosition = {
    x: number,
    y: number
} | null;

export type ClientSocket = string | null;

export interface IClient {
    [key: string]: {
        socket: ClientSocket,
        position: ClientPosition
        connected_id: string | null
    },
};