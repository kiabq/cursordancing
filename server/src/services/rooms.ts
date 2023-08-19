//? Utils
import { Clients } from "./clients";
import { Attendance } from "./attendance";

//? Types
import { IRoomList } from "../../utils/types";


export class Rooms {
    rooms: IRoomList;

    constructor() {
        this.rooms = {};
    }

    public createRoom(room: string, creator: string) {
        if (this.rooms[room]) {
            throw new Error("RoomError", { cause: new Error('Room Already Exists') });
        } else {
            return this.rooms[room] = {
                id: room,
                session: new Clients(),
                createdBy: creator,
                attendance: new Attendance()
            };
        }
    }
};