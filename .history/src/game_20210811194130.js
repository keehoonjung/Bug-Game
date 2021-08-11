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

  function changeStartButton() {
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
  }
  
  function hideStopButton() {
    playBtn.style.visibility = "hidden";
  }
  
  function showStopButton() {
    playBtn.style.visibility = "visible";
  }
  
  function showScoreAndTimer() {
    gameScore.style.visibility = "visible";
    gameTimer.style.visibility = "visible";
  }
}
