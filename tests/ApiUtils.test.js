import api from '../src/Utils/ApiUtils';
import 'regenerator-runtime/runtime.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.',
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

const { registerGame, setScore, getScore, storeId, resetScore } = api;

describe('RegisterGame', () => {
  const expected = 'Zl4d7IVkemOTTVg2fUdz';
  const expected2 = ' Zl4d7IVkemOTTVg2fUdz';
  let actual = '';
  registerGame().then((result) => {
    actual = result;
    return 0;
  });
  it('Should perform an asyc request and return a valid string gameID', () => {
    expect(actual).toBe(expected);
    expect(actual).not.toEqual(expected2);
    expect(actual.length).toBe(expected.length);
  });
});

describe('setScore', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          result: 'Leaderboard score created correctly.',
        }),
    })
  );

  const expected = {
    result: 'Leaderboard score created correctly.',
  };
  let actual;
  setScore('cyrus', 200).then((result) => {
    actual = result;
    return 0;
  });

  it('should return an object after updating the score', () => {
    expect(actual).toStrictEqual(expected);
  });
});

describe('getScore', () => {
  const expected = {
    result: [
      {
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          result: [
            {
              user: 'John Doe',
              score: 42,
            },
            {
              user: 'Peter Parker',
              score: 35,
            },
            {
              user: 'Wonder Woman',
              score: 50,
            },
          ],
        }),
    })
  );

  let actual;

  getScore().then((result) => {
    actual = result;
    return 0;
  });

  it('should return an Object with an array of Objects containing user, score as it properties', () => {
    expect(actual).toStrictEqual(expected);
  });
});
