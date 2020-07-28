import 'phaser';
import config from '../Config/config';
import domApi from '../Entities/DomManipulation';
import api from '../Utils/ApiUtils';

const { getScore } = api;

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.add.image(400, 200, 'assets/logo.png');

    // add a progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'loading...',
      style: {
        font: '20px monospace',
        fill: '#fff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    // percentage indicator
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update the progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${value * 100}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update the progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`loading assets:${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    // initiate some delay
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

    // main game assets

    this.load.image('sprBg0', 'assets/ui/sprBg0.png');
    this.load.image('sprBg1', 'assets/ui/sprBg1.png');
    this.load.spritesheet('sprExplosion', 'assets/ui/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', 'assets/ui/sprEnemy0.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', 'assets/ui/frozenmoons/enemypodcharged.png');
    this.load.spritesheet('sprEnemy2', 'assets/ui/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', 'assets/ui/sprLaserEnemy0.png');
    this.load.spritesheet('sprLaserPlayer', 'assets/ui/playerBullet.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    // this.load.image("sprPlayer", "assets/ui/sprPlayer1.png");
    this.load.spritesheet('sprPlayer', 'assets/ui/sprPlayer.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio('sndExplode0', 'assets/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/sndLaser.wav');

    this.load.image('phaserLogo', 'assets/logo.png');

    // load some bavkground images
    this.load.image('Planet3', 'assets/ui/bg-sprites/Planet3.png');
    this.load.image('Space', 'assets/ui/bg-sprites/Space.png');
    this.load.image('Space_1', 'assets/ui/bg-sprites/Space_1.png');
  }

  create() {}

  init() {
    getScore();
    this.readyCount = 0;
  }

  ready() {
    domApi.hideUserInput();
    this.scene.start('Title');
    this.readCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
