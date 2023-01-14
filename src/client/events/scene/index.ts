import { AEvent, ISystems, SYSTEM_NAME } from '../../contracts/eventSystems';

export class EventSceneUpdate extends AEvent {
  system = SYSTEM_NAME.SCENE;
  name = 'update';
  data: {
    fps: number;
    time: number;
    delta: number;
  };
}

export const updateHandler = ({ data }: EventSceneUpdate, systems: ISystems) => {
  //console.log(systems, data);
};
