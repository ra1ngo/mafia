/* eslint-disable @typescript-eslint */
require('dotenv').config();

import Test from './test';

const { v4: uniqID } = require('uuid');
const io = require('socket.io')({
  cors: {
    origin: [`http://localhost:${process.env.CLIENT_PORT}`],
  },
});

io.on('connection', (socket) => {
  console.log(`New user connection id: ${uniqID()}`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', { type: 'new-message', text: message });
  });
});

io.listen(process.env.SERVER_PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${process.env.SERVER_PORT}`);
});

const test = new Test();
test.testFunc();
