type UserPos = {
    x: number,
    y: number
}

export interface ServerToClientEvents {
    other_move: () => void;
    room_error: (message: string) => void;
}

export interface ClientToServerEvents {
    connect_to: (room: string | undefined) => void;
    player_move: ({ x, y }: UserPos) => void;
}

export interface InterServerEvents {}

export interface SocketData {}