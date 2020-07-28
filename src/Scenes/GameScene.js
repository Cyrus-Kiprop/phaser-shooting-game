import 'phaser';
import api from '../Utils/ApiUtils';
import Button from '../Objects/Button';
import ParallaxBg from '../Entities/parallaxBg';

import { Player, GunShip, CarrierShip, ChaserShip } from '../Entities/Entities';

const { setScore } = api;

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
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

  create() {
    console.log(this.sys.game.globals.username);
    this.leaderBoard = this.add
      .text(
        this.game.config.width * 0.9,
        30,
        `Score: ${this.sys.game.globals.score}`,
        {
          fontFamily: 'monospace',
          fontSize: 18,
          fontStyle: 'Bold',
          color: 'green',
          align: 'center',
        }
      )
      .setOrigin(1);
    const animationCreator = (key, frameValue, frameRate, repeat) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(frameValue),
        frameRate,
        repeat,
      });
    };

    [
      {
        key: 'sprEnemy0',
        frameValue: 'sprEnemy0',
        frameRate: 20,
        repeat: -1,
      },
      {
        key: 'sprEnemy2',
        frameValue: 'sprEnemy2',
        frameRate: 20,
        repeat: -1,
      },
      {
        key: 'sprExplosion',
        frameValue: 'sprExplosion',
        frameRate: 20,
        repeat: -1,
      },
      {
        key: 'sprPlayer',
        frameValue: 'sprPlayer',
        frameRate: 20,
        repeat: -1,
      },
    ].forEach((animation) => {
      animationCreator(
        animation.key,
        animation.frameValue,
        animation.frameRate,
        animation.repeat
      );
    });

    // add the parallax  background image
    this.backgrounds = [];
    for (let i = 0; i < 2; i += 1) {
      const keys = ['Planet3', 'Space', 'Space_1'];
      const bg = new ParallaxBg(this, keys[i], i * 10);
      this.backgrounds.push(bg);
    }

    // this needs to be in the global scope
    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    // instantiate a new player
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer'
    );

    // enemy dies on contact with player bullet

    // key Inputs
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // player Motions
  }

  update() {
    this.player.update();

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1
        );
        this.player.setData('isShooting', false);
      }
    }
    // define the kill rules
    // player dies on contact with enemy ship
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        setScore(this.sys.game.globals.username, this.sys.game.globals.score);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.explode(false);
        setScore(this.sys.game.globals.username, this.sys.game.globals.score);
        player.onDestroy();
        laser.destroy();
      }
    });

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      (playerLaser, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            this.sys.game.globals.score += 100;
            enemy.onDestroy();
          }

          enemy.explode(true);
          playerLaser.destroy();
        }
      }
    );

    // update the background stars
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }

    // End of kill rules

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }
    // Destroy enemy lasers out of bound
    for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // Destroy player laser
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
      this.y = Phaser.Math.Clamp(
        this.y,
        0,
        this.scene.scene.game.config.height
      );
    }
    return arr;
  }
}
