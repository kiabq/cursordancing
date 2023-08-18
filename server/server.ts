//? Libraries
import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import Router = require('koa-router');
import BodyParser = require('koa-bodyparser');
import { Server } from 'socket.io';

//? Routes
import { createRoom, getRooms } from './src/routes/http';

//? Services
import { Rooms } from './src/services/rooms';

//? Types
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,

} from "./utils/types";

const app = new Koa();
app.use(Cors());
app.use(BodyParser());

const router = new Router();

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(5173, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

export const RoomHandler = new Rooms();

//! REFACTOR!!!
//! REFACTOR!!!
//! REFACTOR!!!
//! REFACTOR!!!
io.on("connection", (socket) => {
  socket.join("lobby");
  
  console.log(RoomHandler.rooms);

  socket.on("connect_to", (args, callback) => {
    const room_id = args;

    if (room_id && RoomHandler.rooms[room_id]) {
      socket.join(room_id);

      const { session } = RoomHandler.rooms[room_id];
      session.saveClients(socket.id, null, room_id);

      io
        .to("lobby")
        .emit(`attendance_change_${room_id}`, 0);

      callback({ status: "ok" });
    } else {
      callback({ status: "fail" });
    }
  })

  socket.on("player_move", (...args) => {
    try {
      if (args) {
        const { position, room_id } = args[0];
        const room = RoomHandler.rooms[room_id];
        const { clients } = room.session;

        clients[socket.id]!.position = {
          x: position.x,
          y: position.y
        }

        io
          .to(room_id)
          .emit("other_move", room);
      }
    } catch (error) {
      console.warn(error);
    }
  })

  socket.on("disconnect", () => {
    const rooms = Object.entries(RoomHandler.rooms);

    rooms.forEach((entry) => {
      const [ _, room ] = entry;

      if (room.session.clients[socket.id]) {
        room.session.removeClients(socket.id);

        io
          .to("lobby")
          .emit(`attendance_change_${room.id}`, 0);

        io
          .to(room.id)
          .emit('user_disconnected', socket.id);
      }
    })
  })
});

// router.get('/attendance', getAttendance);
router.get('/rooms', getRooms);
router.post('/create-room', createRoom);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen('3001');