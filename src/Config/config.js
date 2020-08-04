import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'shooting-game',
  width: 800,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
};
