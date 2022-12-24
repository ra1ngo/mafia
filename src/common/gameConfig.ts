import { ROLE_NAME } from './role';
import { STATE_NAME } from './stateEvent';

// Конфиг, отвечающий за состав игры и длительность хода
// Сейчас он статикой, но в дальнейшем можно сделать игры с разным составом ролей и разными таймерами
const config = {
  roles: {
    [ROLE_NAME.MAFIA]: 2,
    [ROLE_NAME.DON]: 1,
    [ROLE_NAME.SHERIFF]: 1,
    [ROLE_NAME.DOCTOR]: 1,
    // все остальные исходя из этого конфига становятся ROLE_NAME.CITIZEN
  },
  timers: {
    [STATE_NAME.DAY_ONE]: 120000,
    [STATE_NAME.NIGHT]: 120000,
    [STATE_NAME.MORNING]: 120000,
    [STATE_NAME.VOTE]: 30000,
    [STATE_NAME.RE_VOTE]: 20000,
    [STATE_NAME.LAST_SPEECH]: 30000,
  },
};

export default config;
