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
})

io.on("connection", (socket) => {
  socket.join("room");

  socket.on("player_move", (...args) => {
    io.to("room").emit("other_move", ...args, socket.id);
  })

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} Disconnected: ${reason}`);
  })
});