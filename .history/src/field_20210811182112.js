"use strict";
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.playground = document.querySelector(".playground");
    this.playgroundRect = this.playground.getBoundingClientRect();

    this.playground.addEventListener("click", (event)=>{
        this.onClickItem && this.onClickItem(event);
    })
  }

  setClickItem(onClickItem){
      this.onClickItem = onClickItem;
  }

  init() {
    this.playground.innerHTML = "";
    this.createItem("carrot", this.carrotCount);
    this.createItem("bug", this.bugCount);
  }

  createItem(name, count) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.playgroundRect.width - CARROT_SIZE;
    const y2 = this.playgroundRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      const item = document.createElement("img");
      item.setAttribute("class", `${name}`);
      item.setAttribute("id", i);
      item.setAttribute("src", `./img/${name}.png`);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.playground.appendChild(item);
    }
  }
}

randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }