import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import { Server } from 'socket.io';

const app = new Koa();
app.use(Cors());

const io = new Server(5173, {
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

interface IClient {
  [key: string]: {
    socket: ClientSocket,
    position: ClientPosition
  },
}

class Clients {
  clients: Partial<IClient>

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
}

const session = new Clients();

io.on("connection", (socket) => {
  socket.join("room");
  session.saveClients(socket.id, null);

  io.to("room").emit("clients", session.clients);

  socket.on("player_move", (...args) => {
    session.clients[socket.id]!.position = {x: args[0].x, y: args[0].y }

    io.to("room").emit("other_move", ...args, socket.id, session.clients);
  })

  socket.on("disconnect", (reason) => {
    session.removeClients(socket.id);
    console.log(`${socket.id} Disconnected: ${reason}`);
  })

  console.log("Clients: ", session.clients);
});