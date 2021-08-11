"use strict";

export default class GamePlay {
  constructor(gameTim, CARROT_COUNT) {
    this.gameTime = gameTime;
    this.CARROT_COUNT = CARROT_COUNT;
    this.stopBtn = document.querySelector(".stop__btn");
    this.gameScore = document.querySelector(".count");
    this.playBtn = document.querySelector(".play__btn");
    this.gameTimer = document.querySelector(".timer");
    this.score;
    this.timeInterver;
    this.started = false;

    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop("retry");
      } else {
        this.changeStartButton();
        this.start();
      }
    });
  }

  start = () => {
    this.started = true;
    this.score = CARROT_COUNT + 1;
    this.showStopButton();
    this.showScoreAndTimer();
    this.countCarrot();
    this.timeCount();
  };

  stop = (text) => {
    this.started = false;
    this.hideStopButton();
    this.stopTimer();
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
    this.gameScore.textContent = `${score}`;
    if (score === 0) {
      this.stop("win");
    }
  }

  timeCount() {
    let remaingTime = this.gameTime;
    timer(remaingTime);
    this.timeInterver = setInterval(() => {
      if (remaingTime <= 0) {
        this.stop("loose");
        return;
      }
      timer(--remaingTime);
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
}
