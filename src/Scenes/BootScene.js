import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("logo", "../assets/logo.png");
  }

  create() {
    console.log("Already booted up");
    // execute the preloader a soon as the boot scene is complete
    this.scene.start("Preloader");
  }
}
