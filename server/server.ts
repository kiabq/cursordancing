//? Libraries
import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import Router = require('koa-router');
import BodyParser = require('koa-bodyparser');
import { Server } from 'socket.io';

//? Types
import { 
  ClientToServerEvents, 
  ServerToClientEvents,
  InterServerEvents,
  SocketData 
} from "./utils/types";

const app = new Koa();
app.use(Cors());
app.use(BodyParser());

const router = new Router();

const io = new Server<
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

type ClientPosition = {
  x: number,
  y: number
} | null;

type ClientSocket = string | null;

interface IRoom {
  [key: string]: any
};

interface IClient {
  [key: string]: {
    socket: ClientSocket,
    position: ClientPosition
  },
};

class Rooms {
  rooms: IRoom;

  constructor() {
    this.rooms = {};
  }

  public connectRoom() {}

  public disconnectRoom() {}
};

class Clients {
  clients: IClient;

  constructor() {
    this.clients = {};
    this.saveClients = this.saveClients.bind(this);
    this.removeClients = this.removeClients.bind(this);
  }

  public saveClients(socket: string, position: ClientPosition) {
    this.clients[socket] = { socket: socket, position: position };
  }

  public removeClients(socket: string) {
    delete this.clients[socket];
  }
};

const session = new Clients();
const { rooms } = new Rooms();

// TODO: Add ability to create named rooms
// TODO: Allow users to create / update their username
  // - This means associating a username with a particular socket,
  // so add this sometime after the handshake and remove it when the socket is disconnected
// TODO: Allow users to select room
// TODO: Allow users to chat

io.on("connection", (socket) => {
  session.saveClients(socket.id, null);

  // io.to("room").emit("clients", session.clients);

  socket.on("connect_to", (args, callback) => {
    const room = args;

    if (room && rooms[room]) {
      socket.join(room);
      callback({ status: "ok" });
    } else {
      callback({ status: "fail" });
    }
  })

  socket.on("player_move", (...args) => {
    if (args) {
      const moveX = args[0].x;
      const moveY = args[0].y;

      session.clients[socket.id]!.position = {x: moveX, y: moveY }

      io
        .to("room")
        .emit("other_move");
    }
  })

  socket.on("disconnect", (reason) => {
    session.removeClients(socket.id);
    console.log(`${socket.id} Disconnected: ${reason}`);
  })

  console.log("Clients: ", session.clients);
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen('3001');