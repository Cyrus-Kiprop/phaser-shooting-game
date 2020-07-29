import 'jest-canvas-mock';
import Phaser from 'phaser';

import BootScene from '../src/Scenes/BootScene';
import CreditsScene from '../src/Scenes/CreditsScene';
import GameOverScene from '../src/Scenes/GameOverScene';
import GameScene from '../src/Scenes/GameScene';
import OptionsScene from '../src/Scenes/OptionsScene';
import ScoreBoard from '../src/Scenes/ScoreBoard';
import PreloaderScene from '../src/Scenes/PreloaderScene';
import config from '../src/Config/config';

const mainGamestart = () => {
  config.scene = [
    BootScene,
    CreditsScene,
    GameOverScene,
    GameScene,
    OptionsScene,
    ScoreBoard,
    PreloaderScene,
  ];
  const game = new Phaser.Game(config);
  return game;
};

export default mainGamestart;
