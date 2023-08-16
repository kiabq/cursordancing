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

//? Utils
import roomhash from './utils/roomhash';

//? Types
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,

} from "./utils/types";

// TODO: Make folders for models/entities
// TODO: Make folders for routes (WS and HTTP should be separate)

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

// TODO: Add ability to create named rooms
// TODO: Allow users to create / update their username
// - This means associating a username with a particular socket,
// so add this sometime after the handshake and remove it when the socket is disconnected
// TODO: Allow users to select room
// TODO: Allow users to chat

//! REFACTOR!!!
//! REFACTOR!!!
//! REFACTOR!!!
//! REFACTOR!!!
io.on("connection", (socket) => {
  socket.on("connect_to", (args, callback) => {
    const room = args;

    if (room && RoomHandler.rooms[room]) {
      socket.join(room);
      //! Change this
      RoomHandler.rooms[room].session.saveClients(socket.id, null, room);
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

    rooms.forEach((room) => {
      const [ _, info ] = room;

      if (info.session.clients[socket.id]) {
        info.session.removeClients(socket.id);
      }
    })
  })
});

router.get('/rooms', getRooms);
router.post('/create-room', createRoom);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen('3001');