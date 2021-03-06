import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import GameOverScene from './Scenes/GameOverScene';
import Model from './Model';
import ScoreBoard from './Scenes/ScoreBoard';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model,
      username: '',
      bgMusic: null,
      score: 0,
      gameID: '',
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('ScoreBoard', ScoreBoard);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
