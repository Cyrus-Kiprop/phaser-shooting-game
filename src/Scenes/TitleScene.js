import "phaser";
import Button from "../Objects/Button";
import api from "../Utils/ApiUtils";

import config from "../Config/config";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    // regiser the game
    api.registerGame().then(
      function (result) {
        this.sys.game.globals.gameID = result;

        // set the score to board
        console.log(result.length);
        api.setScore(result, 100);
      }.bind(this)
    );

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      "blueButton1",
      "blueButton2",
      "Play",
      "Game"
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "blueButton1",
      "blueButton2",
      "Options",
      "Options"
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "blueButton1",
      "blueButton2",
      "Credits",
      "Credits"
    );

    this.title = this.add.text(
      this.game.config.width * 0.2,
      70,
      "EXECUTE BADDIES!!",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "italic",
        color: "red",
        // align: "left",
      }
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("bgMusic", { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
