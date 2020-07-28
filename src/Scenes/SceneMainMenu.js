import 'phaser';

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super('SceneMainMenu');
  }

  preload() {
    this.load.image('sprBtnPlay', 'assets/ui/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'assets/ui/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'assets/ui/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', 'assets/ui/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'assets/ui/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'assets/ui/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', 'assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sndBtnDown.wav');
  }

  create() {}
}
