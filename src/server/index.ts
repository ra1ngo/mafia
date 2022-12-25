import { Server } from 'socket.io';
import uuid from 'uuid';

const SERVER_PORT = Number(process.env.SERVER_PORT || 9080);
const CLIENT_PORT = Number(process.env.CLIENT_PORT || 8080);

console.log('Test husk')

const io = new Server({
  cors: {
    origin: [`http://localhost:${CLIENT_PORT}`],
  },
});

const LOGGER = (str: string) => {
  console.log(`⚡️[Server]: ${str}`);
};

io.on('connection', (socket) => {
  LOGGER(`New user connection id: ${uuid.v4()}`);

  socket.on('disconnect', () => {
    LOGGER('User disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', { type: 'new-message', text: message });
  });
});

io.listen(SERVER_PORT);

io.close((exc) => {
  exc?.message && LOGGER(exc.message);
});

console.log(LOGGER(`Server are working on port:${SERVER_PORT}`));