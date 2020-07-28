const baseUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const id = 'CMTUivGEZB8gyhrjwRwz';

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
    console.log(e);
  }
}

async function setScore(username, scoreValue) {
  console.log(scoreValue);
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
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

function resetScore() {
  this.sys.game.globals.score = 0;
}

async function getScore(id) {
  id = 'CMTUivGEZB8gyhrjwRwz';
  const response = await fetch(`${baseUrl}games/${id}/scores/`);
  const result = await response.json();
  return result;
}

const api = {
  registerGame,
  setScore,
  getScore,
  storeId,
  resetScore,
};

export default api;
