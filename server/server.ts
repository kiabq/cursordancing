//? Libraries
import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import Router = require('koa-router');
import BodyParser = require('koa-bodyparser');
import { Server } from 'socket.io';

//? Routes
import { createRoom, getRooms, getAttendance } from './src/routes/http';

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

export const lobbyNamespace = io.of('/lobby');
export const roomNamespace = io.of(/^\/[a-zA-Z0-9]{6}/);

lobbyNamespace.on("connection", (socket) => {
  socket.join("lobby");
})

roomNamespace.on('connection', (socket) => {
  const room_name = (socket.nsp.name).split('/')[1];
  const room = RoomHandler.rooms[room_name];

  if (RoomHandler.rooms && room) {
    const { session, attendance } = room;

    socket.join(room_name);
    session.saveClients(socket.id, null, room_name);
    attendance.incrementAttendance();

    lobbyNamespace.emit(`attendance_change_${room_name}`, attendance.amount);
  }

  socket.on("player_move", (...args) => {
    try {
      if (args) {
        const { position } = args[0];
        const { clients } = room.session;

        clients[socket.id]!.position = {
          x: position.x,
          y: position.y
        }

        roomNamespace
          .to(room_name)
          .emit("other_move", room);
      }
    } catch (error) {
      console.warn(error);
    }
  })

  socket.on("disconnect", () => {
    if (room && room.session.clients[socket.id]) {
      const { session, attendance } = room;

      session.removeClients(socket.id);
      attendance.decrementAttendance();
      lobbyNamespace.emit(`attendance_change_${room_name}`, attendance.amount);
      roomNamespace
        .to(room_name)
        .emit('user_disconnected', socket.id);
    }
  })
})

router.get('/attendance', getAttendance);
router.get('/rooms', getRooms);
router.post('/create-room', createRoom);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen('3001');