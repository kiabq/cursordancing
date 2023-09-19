//? Libraries
import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import Router = require('koa-router');
import BodyParser = require('koa-bodyparser');
import { Server } from 'socket.io';
import { Redis } from 'ioredis';

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
export const redis = new Redis();

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

/*  
  When user joins room, their socket should be subscribed to something so
  the server can keep track of their connection. I'm thinking of using a pub/sub
  to keep track of their connection to a room, and then using streams to keep track
  of their position
*/

/* Use a set to manage rooms w/ it's players? */

// TODO: Look into Redis Pipeline for these functions

roomNamespace.on('connection', async (socket) => {
  const room_name = (socket.nsp.name).split('/')[1];
  const player_id = `${room_name}:${socket.id}`;

  socket.join(room_name);

  roomNamespace
    .to(room_name)
    .emit('user_connected', socket.id);

  //! Temp Obj
  await redis.hset(player_id, {
    name: socket.id,
    x: null,
    y: null
  });

  socket.on("player_move", async (...args) => {
    try {
      if (args) {
        const { position } = args[0];
        const players: any = {};

        await redis.hset(player_id, { x: position.x, y: position.y })
        const room_scan = await redis.scan(0, "MATCH", `${room_name}:*`);

        for (const p in room_scan[1]) {
          const player = await redis.hgetall(room_scan[1][p]);
          players[player.name] = [player.x, player.y];
        }

        roomNamespace
          .to(room_name)
          .emit("other_move", players);
      }
    } catch (err) {
      //! Add handling here or something
    }
  })

  socket.on("disconnect", () => {
    // TODO: Add error handling
    redis.hdel(player_id, "name", "x", "y");
    redis.srem(room_name, socket.id);
    roomNamespace
      .to(room_name)
      .emit('user_disconnected', socket.id);
  });
})

router.get('/rooms', getRooms);
router.post('/create-room', createRoom);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen('3001');