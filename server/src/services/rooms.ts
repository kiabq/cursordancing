//? Utils
import { Clients } from "./clients";

//? Types
import { IRoomList } from "../../utils/types";

export class Rooms {
    rooms: IRoomList;

    constructor() {
        this.rooms = {};
        this.connectRoom = this.connectRoom.bind(this);
        this.disconnectRoom = this.disconnectRoom.bind(this);
    }

    public createRoom(room: string, creator: string) {
        if (this.rooms[room]) {
            throw new Error("RoomError", { cause: new Error('Room Already Exists') });
        } else {
            return this.rooms[room] = {
                id: room,
                session: new Clients(),
                createdBy: creator
            };
        }
    }

    public connectRoom() { }

    public disconnectRoom() { }
};