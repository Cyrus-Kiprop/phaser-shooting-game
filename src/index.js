import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add("Game", GameScene);
        this.scene.start("Game");
    }
}

window.game = new Game();