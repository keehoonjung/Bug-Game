"use strict";
import * as sound from "./audio.js";
import Field from "./field.js";

GameField = new Field();

export default class GamePlay {
  constructor() {
    this.stopBtn = document.querySelector(".stop__btn");
    this.gameScore = document.querySelector(".count");
    this.playBtn = document.querySelector(".play__btn");
    this.gameTimer = document.querySelector(".timer");
    this.score;
    this.timeInterver;
    this.started = false;
  }

  start() {
    this.started = true;
    this.score = CARROT_COUNT + 1;
    this.showStopButton();
    this.showScoreAndTimer();
    this.countCarrot();
    this.timeCount();
    sound.playBackgroundSound();
    GameField.init();
  }

  changeStartButton() {
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
  }

  hideStopButton() {
    this.playBtn.style.visibility = "hidden";
  }

  showStopButton() {
    this.playBtn.style.visibility = "visible";
  }

  showScoreAndTimer() {
    this.gameScore.style.visibility = "visible";
    this.gameTimer.style.visibility = "visible";
  }

  countCarrot() {
    this.score--;
    this.gameScore.textContent = `${score}`;
    if (score === 0) {
      this.stop("win");
    }
  }
}
