"use strict";

let score;
let timeInterver;
let started = false;

export default class GamePlay {
  constructor(gameTime, CARROT_COUNT) {
    this.gameTime = gameTime;
    this.CARROT_COUNT = CARROT_COUNT;
    this.stopBtn = document.querySelector(".stop__btn");
    this.gameScore = document.querySelector(".count");
    this.playBtn = document.querySelector(".play__btn");
    this.gameTimer = document.querySelector(".timer");

    this.playBtn.addEventListener("click", () => {
      if (started) {
        this.stop("retry");
      } else {
        this.changeStartButton();
        this.start();
      }
    });
  }

  setStartGame(onStart) {
    this.onStart = onStart;
  }

  setStopGame(onStop) {
    this.onStop = onStop;
  }

  start = () => {
    started = true;
    score = this.CARROT_COUNT + 1;
    this.showStopButton();
    this.showScoreAndTimer();
    this.countCarrot();
    this.timeCount();
    this.onStart && this.onStart();
  };

  stop = (text) => {
    started = false;
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
    score--;
    this.gameScore.textContent = `${score}`;
    if (score === 0) {
      this.stop("win");
    }
  }

  timeCount() {
    let remaingTime = this.gameTime;
    this.timer(remaingTime);
    timeInterver = setInterval(() => {
      if (remaingTime <= 0) {
        this.stop("loose");
        return;
      }
      this.timer(--remaingTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(timeInterver);
  }

  timer(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    this.gameTimer.textContent = `${min}:${sec}`;
  }

  setItem = (item) => {
    if (!started) {
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
