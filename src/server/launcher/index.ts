import { Server } from 'socket.io';

export default class Launcher {
  readonly io: Server;
  constructor(io: Server) {
    this.io = io;

    this.init();
  }

  private init(): void {
    console.log('init');
  }
}
