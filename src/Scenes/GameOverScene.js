import 'phaser';
import Button from '../Objects/Button';
import api from '../Utils/ApiUtils';

import config from '../Config/config';
import domApi from '../Entities/DomManipulation';

const { hideUserInput } = domApi;
const { resetScore, setScore } = api;

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    this.title = this.add
      .text(this.game.config.width * 0.5, 100, 'Game Over', {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'Bold',
        color: 'red',
        align: 'center',
      })
      .setOrigin(0.5);

    this.score = this.add
      .text(
        this.game.config.width * 0.5,
        200,
        `Score: ${this.sys.game.globals.score}`,
        {
          fontFamily: 'monospace',
          fontSize: 48,
          fontStyle: 'Bold',
          color: 'red',
          align: 'center',
        },
      )
      .setOrigin(0.5);

    this.updateScore = () => {
      console.log(this.sys.game.globals.username);
      setScore('Cyrus Kiprop', this.sys.game.globals.score);
      this.sys.game.globals.score = this.sys.game.globals.score * 0;
    };

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Restart',
      'Game',
      [this.updateScore],
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Main Menu',
      'Title',
      [hideUserInput],
    );
  }
}
