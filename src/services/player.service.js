/**
 *
 * @param {*} name : Name provided to check
 * It checks if the name is valid
 * @returns true if is Valid
 */
export const isValidName = name => {
  const pattern = /^[a-z ,.'-]+$/i;
  const matches = pattern.exec(name);
  if (matches) return true;
  else return false;
};

/**
 *
 * @param {*} name : Name provided to save
 * @param {*} score : Score provided to save
 *
 * Saves the player name and score into localstorage
 *
 */
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

/**
 *
 * @param {*} name : Name provided to get the rest of the info
 * Gets the rest of the player info
 * @returns The object  with all the info
 */
export const getPlayerInfo = name => {
  const players = getPlayers();
  if (!players) return undefined;
  const player = players.find(player => player.name === name);
  return player;
};

/**
 *
 * @returns Gets the current player stored in the session storage
 */
export const getCurrentPlayer = () => {
  return sessionStorage.getItem('current-player');
};

/**
 *
 * @param {*} name : Players name
 * Saves the player name in the session storage
 */
export const setCurrentPlayer = name => {
  sessionStorage.setItem('current-player', name);
};

/**
 *
 * @returns List of players and scores stored in local storage
 */
const getPlayers = () => {
  const players = JSON.parse(localStorage.getItem('players'));
  return players ?? undefined;
};
