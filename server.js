/* eslint-disable @typescript-eslint */
require('dotenv').config();
const uuid = require('uuid');
const io = require('socket.io')({
  cors: {
    origin: [`http://localhost:${process.env.CLIENT_PORT}`],
  },
});

io.on('connection', (socket) => {
  console.log(`New user connection id: ${uuid.v4()}`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', { type: 'new-message', text: message });
  });
});

io.listen(process.env.SERVER_PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
