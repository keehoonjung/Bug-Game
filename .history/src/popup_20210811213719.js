"use strict";

import { Reason } from "./game.js";
export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.popupMessage = document.querySelector(".popup__message");
    this.popupBtn = document.querySelector(".popup__btn");
    this.popupBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickBtn(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popup.classList.remove("visible");
  }

  visible(result) {
    if (result == Reason.win) {
      this.popupMessage.textContent = " YOU WIN";
      this.popup.classList.add("visible");
    } else if (result == Reason.lose) {
      this.popupMessage.textContent = " YOU LOOSE";
      this.popup.classList.add("visible");
    } else if (result == Reason.retry) {
      this.popupMessage.textContent = " RETRY?";
      this.popup.classList.add("visible");
    }
  }
}
