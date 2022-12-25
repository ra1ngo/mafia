import { Server } from 'socket.io';
import Launcher from './launcher';
import { EVENT_NAME } from 'Common/stateEvent';
// import uuid from 'uuid';

const SERVER_PORT = Number(process.env.SERVER_PORT || 9080);
const CLIENT_PORT = Number(process.env.CLIENT_PORT || 8080);

const io = new Server({
  cors: {
    origin: [`http://localhost:${CLIENT_PORT}`],
  },
});

const LOGGER = (str: string) => {
  console.log(`⚡️[Server]: ${str}`);
};

io.on('connection', (socket) => {
  const launcher = new Launcher(io);
});

io.listen(SERVER_PORT).close((exc) => {
  exc?.message && LOGGER(exc.message);
});

console.log(LOGGER(`Server are working on port:${SERVER_PORT}`));
console.log(EVENT_NAME);
