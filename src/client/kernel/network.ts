import { io, Socket } from 'socket.io-client';

export default class Network {
  protected connection: Socket | null;

  constructor() {
    this.connection = null;
  }

  preload() {}
  create() {}

  public connectToServer() {
    const connection = io(`http://localhost:${process.env.SERVER_PORT}`);
    this.connection = connection;

    connection.on('connect', () => {
      console.log('connect to server');
    });
  }
}
