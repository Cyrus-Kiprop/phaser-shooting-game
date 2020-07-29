import mainGamestart from './GameMock';
import 'jest-canvas-mock';

let game;
beforeEach(() => {
  game = mainGamestart();
});

describe('Game', () => {
  test('check for the game initialization', () => {
    expect(typeof game).toBe('object');
  });
  test('Check if all of the game scenes are instantiated ', () => {
    expect(game.scene._pending.length).toBe(7);
  });

  test('expect game scenes not to be less than 1 at any given time', () => {
    expect(game.scene._pending.length).toBeGreaterThan(0);
  });
});
