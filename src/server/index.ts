
import express, { Express } from 'express';
import { createServer } from 'http';
import { v4 } from 'uuid'
import dotenv from 'dotenv';
import socketio from 'socket.io'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const server = createServer(app);
const io = new socketio.Server(server)

// app.use(express.static(join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`New user connection id: ${v4()}`)
});


server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
