import "phaser";
import Button from "../Objects/Button";
import api from "../Utils/ApiUtils";

import config from "../Config/config";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    console.log(this.sys.game.globals.gameID);
    this.title = this.add
      .text(this.game.config.width * 0.5, 100, "Game Over", {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "Bold",
        color: "red",
        align: "center",
      })
      .setOrigin(0.5);

    console.log(api.getScore(this.sys.game.gameID));
    api.getScore(this.sys.game.globals.gameID).then((score) => {
      console.log(score);
      this.score = this.add
        .text(
          this.game.config.width * 0.5,
          200,
          "Score: " + score.result[0].score,
          {
            fontFamily: "monospace",
            fontSize: 48,
            fontStyle: "Bold",
            color: "red",
            align: "center",
          }
        )
        .setOrigin(0.5);
    });
    if (this.scoreValue !== undefined) console.log(this.scoreValue);

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "blueButton1",
      "blueButton2",
      "Restart",
      "Game"
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "blueButton1",
      "blueButton2",
      "Main Menu",
      "Title"
    );
  }
}
