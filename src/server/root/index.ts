import Launcher from '../launcher';
import { Server, Socket } from 'socket.io';

interface IConfig {
  CLIENT_PORT?: number;
  SERVER_PORT?: number;
}

export default class Root {
  readonly io: Server;
  readonly config: IConfig = {};
  readonly Launcher: Launcher = new Launcher();

  constructor(config: IConfig) {
    this.config = { ...config };

    this.io = new Server({
      cors: {
        origin: [`http://localhost:${this.config.CLIENT_PORT}`],
      },
    });

    this.init();
  }

  private init(): void {
    this.io.on('connection', (socket: Socket) => {
      this.startLauncher(socket);

      socket.on('disconnect', (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
      });
    });

    this.io.listen(this.config.SERVER_PORT).close((exc) => {
      exc?.message && this.LOG(exc.message);
    });
  }

  private LOG(str: string): void {
    console.log(`⚡️[Server]: ${str}`);
  }

  private startLauncher(socket: Socket): void {
    this.Launcher.init(socket);
  }
}