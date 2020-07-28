import 'phaser';
import Entity from './Entities';

export default class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy2', 'CarrierShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play('sprEnemy2');
    this.setScale(0.9);
  }
}
