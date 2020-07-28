import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';
import domApi from '../Entities/DomManipulation';
import api from '../Utils/ApiUtils';
import sceneUtils from './SceneUtils';

const { hideUserInput } = domApi;
const { getScore } = api;
const { compare } = sceneUtils;

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('ScoreBoard');
  }

  create() {
    this.t1 = this.add.text(config.width * 0.35, 100, 'LEADERBOARD', {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#B26FE8',
      align: 'center',
    });
    this.add.text(config.width * 0.25, 170, 'RANK', 24);
    this.add.text(config.width * 0.45, 170, 'NAME', 24);
    this.add.text(config.width * 0.65, 170, 'SCORE', 24);

    this.dataListing = JSON.parse(window.localStorage.getItem('listing'));

    const firstTenSorted = this.dataListing.sort(compare).slice(0, 10);

    let pos = 190;
    firstTenSorted.map((data, index) => {
      const { user, score } = data;
      this.add.text(config.width * 0.28, pos, index + 1, 24);
      this.add.text(config.width * 0.45, pos, user.slice(0, 14), 24);
      this.add.text(config.width * 0.65, pos, score, 24);
      pos += 20;
    });

    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 150,
      'blueButton1',
      'blueButton2',
      'Main Menu',
      'Title',
      [hideUserInput]
    );
  }
}
