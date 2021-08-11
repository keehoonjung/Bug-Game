"use strict";

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.playground = document.querySelector(".playground");
    this.playgroundRect = this.playground.getBoundingClientRect();
  }
}
