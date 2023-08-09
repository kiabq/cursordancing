import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import { Server } from 'socket.io';

const app = new Koa();
app.use(Cors(
    
));

const io = new Server(3000, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    console.log("goodbye")
    // ...
  });
});

app.use(async (ctx: any, next: any ) => {
  ctx.body = 'Hello World';
});

app.listen(5173);