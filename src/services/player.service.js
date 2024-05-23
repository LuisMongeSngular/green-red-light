export const isValidName = name => {
  const pattern = /^[a-z ,.'-]+$/i;
  const matches = pattern.exec(name);
  if (matches) return true;
  else return false;
};

export const existsPlayer = (name, playersParam = undefined) => {
  let players;
  if (!playersParam) {
    players = getPlayers();
    if (!players) {
      return false;
    } else {
      players = playersParam;
    }
  } else {
    players = playersParam;
  }
  return players.find(player => player.name === name) ? true : false;
};

export const savePlayerInfo = (name, score = 0) => {
  let players = getPlayers();
  if (!players) {
    players = [{ name, score }];
  } else if (!players.find(item => item.name === name)) {
    players.push({ name, score });
  } else {
    players = players.map(player => {
      if (player.name === name) {
        return {
          ...player,
          score: player.score > score ? player.score : score,
        };
      }
      return player;
    });
  }

  localStorage.setItem('players', JSON.stringify(players));
  return true;
};
export const getPlayerInfo = name => {
  const players = getPlayers();
  if (!players) return undefined;
  const player = players.find(player => player.name === name);
  return player;
};

export const getCurrentPlayer = () => {
  return sessionStorage.getItem('current-player');
};

export const setCurrentPlayer = name => {
  sessionStorage.setItem('current-player', name);
};

const getPlayers = () => {
  const players = JSON.parse(localStorage.getItem('players'));
  return players ?? undefined;
};
