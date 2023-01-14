import { SYSTEM_NAME } from '../contracts/eventSystems';
import sceneHooks from './sceneHooks';

export default {
  [SYSTEM_NAME.SCENE]: sceneHooks,
};
