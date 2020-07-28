import 'phaser';
import Button from '../Objects/Button';
import api from '../Utils/ApiUtils';
import config from '../Config/config';
import domApi from '../Entities/DomManipulation';

const { showControls, hideUserInput, userInput } = domApi;

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.updateUser = () => (this.sys.game.globals.username = userInput());
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
      [hideUserInput, this.updateUser]
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
      [hideUserInput]
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 300,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
      [hideUserInput]
    );

    this.controls = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Controls',
      '_',
      [showControls, hideUserInput]
    );

    this.title = this.add.text(
      this.game.config.width * 0.1,
      70,
      'GUARDIAN OF THE GALAXIES',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#51DAFD',
        // align: "left",
      }
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
