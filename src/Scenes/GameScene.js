import "phaser";
import Button from "../Objects/Button";
import { Player, GunShip, CarrierShip, ChaserShip } from "../Entities/Entities";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("sprBg0", "assets/ui/sprBg0.png");
    this.load.image("sprBg1", "assets/ui/sprBg1.png");
    this.load.spritesheet("sprExplosion", "assets/ui/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("sprEnemy0", "assets/ui/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("sprEnemy1", "assets/ui/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "assets/ui/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("sprLaserEnemy0", "assets/ui/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "assets/ui/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "assets/ui/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio("sndExplode0", "assets/sndExplode0.wav");
    this.load.audio("sndExplode1", "assets/sndExplode1.wav");
    this.load.audio("sndLaser", "assets/sndLaser.wav");
  }
  create() {
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
        key: "sprEnemy0",
        frameValue: "sprEnemy0",
        frameRate: 20,
        repeat: -1,
      },
      {
        key: "sprEnemy2",
        frameValue: "sprEnemy2",
        frameRate: 20,
        repeat: -1,
      },
      {
        key: "sprExplosion",
        frameValue: "sprExplosion",
        frameRate: 20,
        repeat: -1,
      },
      {
        key: "sprPlayer",
        frameValue: "sprPlayer",
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

    // this.anims.create({
    // key: "sprEnemy0",
    // frames: this.anims.generateFrameNumbers("sprEnemy0"),
    // frameRate: 20,
    // repeat: -1,
    // });

    // this.anims.create({
    // key: "sprEnemy2",
    // frames: this.anims.generateFrameNumbers("sprEnemy2"),
    // frameRate: 20,
    // repeat: -1,
    // });

    // this.anims.create({
    // key: "sprExplosion",
    // frames: this.anims.generateFrameNumbers("sprExplosion"),
    // frameRate: 20,
    // repeat: 0,
    // });

    // this.anims.create({
    // key: "sprPlayer",
    // frames: this.anims.generateFrameNumbers("sprPlayer"),
    // frameRate: 20,
    // repeat: -1,
    // });

    // this needs to be in the global scope
    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1"),
      ],
      laser: this.sound.add("sndLaser"),
    };

    // instantiate a new player
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );

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
      callback: function () {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {
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

    if (this.keyD.isDown) {
      this.player.moveRight();
    }

    if (this.keyW.isDown) {
      this.player.moveUp();
    } else if (this.keyS.isDown) {
      this.player.moveDown();
    } else if (this.keyA.isDown) {
      this.player.moveLeft();
    }

    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
    } else {
      this.player.setData(
        "timerShootTick",
        this.player.getData("timerShootDelay") - 1
      );
      this.player.setData("isShooting", false);
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];

      enemy.update();
    }
  }

  getEnemiesByType(type) {
    let arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}
