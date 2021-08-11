"use strict";

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
    score = CARROT_COUNT + 1;
    showStopButton();
    showScoreAndTimer();
    countCarrot();
    timeCount();
    sound.playBackgroundSound();
    GameField.init();
  }
}
