enum EVENT_NAME {
  MESSAGE = 'message',
  JOIN = 'join',
  LEAVE = 'leave',
  START = 'start',
  CONNECT = 'connect',
  MESSAGE_COMMON = 'message-common',
  TO_NIGHT = 'to-night',
  MESSAGE_MAFIA = 'message-mafia',
  ACTION = 'action',
  TO_CALCULATION_NIGHT = 'to-calculation-night',
  TO_MORNING = 'to-morning',
  TO_GAME_OVER = 'to-game-over',
  TO_VOTE = 'to-vote',
  MESSAGE_PLAYER = 'message-player',
  VOTE = 'vote',
  NEXT_VOTE = 'next-vote',
  TO_CALCULATION_VOTE = 'to-calculation-vote',
  TO_RE_VOTE = 'to-re-vote',
  TO_LAST_SPEECH = 'to-last-speech',
}

enum STATE_NAME {
  GAME_CREATED = 'game-created',
  WAIT_PLAYERS = 'wait-players',
  DAY_ONE = 'day-one',
  NIGHT = 'night',
  CALCULATION_NIGHT = 'calculation-night',
  MORNING = 'morning',
  VOTE = 'vote',
  CALCULATION_VOTE = 'calculation-vote',
  RE_VOTE = 're-vote',
  LAST_SPEECH = 'last-speech',
  GAME_OVER = 'game-over',
}

const VALID_STATE_EVENT = {
  [STATE_NAME.GAME_CREATED]: [EVENT_NAME.MESSAGE, EVENT_NAME.JOIN, EVENT_NAME.LEAVE, EVENT_NAME.START],
  [STATE_NAME.WAIT_PLAYERS]: [EVENT_NAME.CONNECT],
  [STATE_NAME.DAY_ONE]: [EVENT_NAME.MESSAGE_COMMON, EVENT_NAME.TO_NIGHT],
  [STATE_NAME.NIGHT]: [EVENT_NAME.MESSAGE_MAFIA, EVENT_NAME.ACTION, EVENT_NAME.TO_CALCULATION_NIGHT],
  [STATE_NAME.CALCULATION_NIGHT]: [EVENT_NAME.TO_MORNING, EVENT_NAME.TO_GAME_OVER],
  [STATE_NAME.MORNING]: [EVENT_NAME.MESSAGE_COMMON, EVENT_NAME.TO_VOTE],
  [STATE_NAME.VOTE]: [EVENT_NAME.MESSAGE_PLAYER, EVENT_NAME.VOTE, EVENT_NAME.NEXT_VOTE, EVENT_NAME.TO_CALCULATION_VOTE],
  [STATE_NAME.CALCULATION_VOTE]: [EVENT_NAME.TO_RE_VOTE, EVENT_NAME.TO_LAST_SPEECH],
  [STATE_NAME.RE_VOTE]: [EVENT_NAME.MESSAGE_COMMON, EVENT_NAME.VOTE, EVENT_NAME.TO_CALCULATION_VOTE],
  [STATE_NAME.LAST_SPEECH]: [EVENT_NAME.MESSAGE_PLAYER, EVENT_NAME.TO_NIGHT, EVENT_NAME.TO_GAME_OVER],
  [STATE_NAME.GAME_OVER]: [EVENT_NAME.MESSAGE_COMMON, EVENT_NAME.LEAVE],
};

const validateStateEvent = (state: STATE_NAME, event: EVENT_NAME) => {
  if (!VALID_STATE_EVENT[state]) return false;
  return VALID_STATE_EVENT[state].includes(event);
};

export { EVENT_NAME, STATE_NAME, validateStateEvent };
