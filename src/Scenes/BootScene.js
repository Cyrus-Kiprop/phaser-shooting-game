import 'phaser';
import domApi from '../Entities/DomManipulation';

const { hideUserInput } = domApi;

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', '../assets/logo.png');
  }

  create() {
    hideUserInput();
    this.scene.start('Preloader');
  }
}
