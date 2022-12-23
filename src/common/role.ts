enum ROLE_NAME {
  CITIZEN = 'citizen',
  MAFIA = 'mafia',
  DON = 'don',
  SHERIFF = 'sheriff',
  DOCTOR = 'doctor',
  TEST_NEUTRAL = 'test-neutral',
}

enum PARTY_NAME {
  PEACE = 'peace',
  MAFIA = 'mafia',
  NEUTRAL = 'neutral',
}

interface IRole {
  name: ROLE_NAME;
  party: PARTY_NAME;
}

const PARTY_ROLE = {
  [PARTY_NAME.PEACE]: [ROLE_NAME.CITIZEN, ROLE_NAME.SHERIFF, ROLE_NAME.DOCTOR],
  [PARTY_NAME.MAFIA]: [ROLE_NAME.MAFIA, ROLE_NAME.DON],
  [PARTY_NAME.NEUTRAL]: [ROLE_NAME.TEST_NEUTRAL],
};

const getPartyForRole = (role: ROLE_NAME) => {
  let partyForRole = null;
  Object.entries(PARTY_ROLE).forEach(([party, roles]) => {
    if (roles.includes(role)) partyForRole = party;
  });

  if (!partyForRole) {
    throw 'ВЫ ТАМ ОШАЛЕЛИ?\r\nParty for role not found';
  }

  return partyForRole;
};

export { IRole, ROLE_NAME, PARTY_NAME, getPartyForRole };
