"use strict";

export default class GamePlay {
  constructor() {
    this.stopBtn = document.querySelector(".stop__btn");
    this.gameScore = document.querySelector(".count");
    this.playBtn = document.querySelector(".play__btn");
    this.gameTimer = document.querySelector(".timer");
    this.score;
  }
}
