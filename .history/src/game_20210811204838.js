"use strict";

import Field from "./field.js";
import * as sound from "./audio.js";

export default class GamePlay {
  constructor(gameTime, carrotCount, bugCount) {
    this.gameTime = gameTime;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.score = 0;
    this.timeInterver = undefined;
    this.started = false;

    this.stopBtn = document.querySelector(".stop__btn");
    this.gameScore = document.querySelector(".count");
    this.gameTimer = document.querySelector(".timer");
    this.playBtn = document.querySelector(".play__btn");

    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop("retry");
      } else {
        this.changeStartButton();
        this.start();
      }
    });

    this.GameField = new Field(carrotCount, bugCount);
  }

  start = () => {
    this.started = true;
    this.score = this.carrotCount + 1;
    this.showStopButton();
    this.showScoreAndTimer();
    this.countCarrot();
    this.timeCount();
    sound.playBackgroundSound();
    GameField.init();
  };

  stop = (text) => {
    this.started = false;
    this.hideStopButton();
    this.stopTimer();
    this.onStop && this.onStop(text);
  };

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
    this.gameScore.textContent = `${this.score}`;
    if (this.score === 0) {
      this.stop("win");
    }
  }

  timeCount() {
    let remaingTime = this.gameTime;
    this.timer(remaingTime);
    this.timeInterver = setInterval(() => {
      if (remaingTime <= 0) {
        this.stop("loose");
        return;
      }
      this.timer(--remaingTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timeInterver);
  }

  timer(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    this.gameTimer.textContent = `${min}:${sec}`;
  }

  setItem = (item) => {
    if (!this.started) {
      return;
    } else {
      if (item === "carrot") {
        this.countCarrot();
      } else if (item === "bug") {
        this.stop("loose");
      }
    }
  };
}
