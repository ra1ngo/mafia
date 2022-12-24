import { IRole } from './role';

interface IPlayer {
  id: number;
  playerId: number; // число от 1 до 12
  color: string;
  role: IRole;
}

export { IPlayer };
