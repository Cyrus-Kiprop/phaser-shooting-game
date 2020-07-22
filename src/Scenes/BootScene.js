import 'phaser';
import

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png')
    }

    create() {
        // execute the preloader a soon as the boot scene is complete
        this.scene.start('Preloader')
    }
};