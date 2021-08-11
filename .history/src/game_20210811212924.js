"use strict";

import Field from "./field.js";
import * as sound from "./audio.js";

export default class GameBuilder {
  withgameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
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
    this.GameField.setClickItem(this.setItem);
  }

  setOnGameStop(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start = () => {
    this.started = true;
    this.score = this.carrotCount + 1;
    this.showStopButton();
    this.showScoreAndTimer();
    this.countCarrot();
    this.timeCount();
    sound.playBackgroundSound();
    this.GameField.init();
  };

  stop = (text) => {
    this.started = false;
    this.hideStopButton();
    this.stopTimer();
    if (text == "win") {
      sound.playWinSound();
    } else {
      sound.playAlertSound();
    }
    sound.stopBackgroundSound();
    this.onGameStop && this.onGameStop(text);
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
