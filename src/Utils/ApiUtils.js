const baseUrl =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";

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
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "StarShip Shooting Game",
      }),
    });
    const data = await response.json();
    return Promise.resolve(gameID(data));
  } catch (e) {
    console.log(e);
  }
}

async function setScore(gameId, scoreValue = 0) {
  const url = `${baseUrl}games/${gameId}/scores/`;

  const scoreSet = {
    user: "Cyrus Kiprop",
    score: scoreValue,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Method": "POST",
      },
      body: JSON.stringify(scoreSet),
    });
    const data = await response.json();
    console.log(data.result);
  } catch (e) {
    console.log(e);
  }
}

async function getScore(id) {
  const response = await fetch(`${baseUrl}games/${id}/scores/`);
  const result = await response.json();
  return result;
}

const api = {
  registerGame,
  setScore,
  getScore,
  storeId,
};

export default api;
