const baseUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const gameID = (data) => {
  const string = data.result;
  return string.slice(14, -7);
};

function storeId(dataID) {
  this.sys.game.globals.gameID = dataID;
}

async function registerGame() {
  try {
    const response = await fetch(`${baseUrl}games/`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'StarShip Shooting Game',
      }),
    });
    const data = await response.json();
    return Promise.resolve(gameID(data));
  } catch (e) {
    return e.message;
  }
}

async function setScore(username, scoreValue) {
  const url = `${baseUrl}games/CMTUivGEZB8gyhrjwRwz/scores/`;
  const scoreSet = {
    user: username,
    score: scoreValue,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify(scoreSet),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e.message;
  }
}

function resetScore() {
  this.sys.game.globals.score = 0;
}

async function getScore() {
  const id = 'CMTUivGEZB8gyhrjwRwz';
  const response = await fetch(`${baseUrl}games/${id}/scores/`);
  const data = await response.json();
  window.localStorage.setItem('listing', JSON.stringify(data.result));
}

const api = {
  registerGame,
  setScore,
  getScore,
  storeId,
  resetScore,
};

export default api;
