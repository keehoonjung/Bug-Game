"use strict";

export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.popupMessage = document.querySelector(".popup__message");
    this.popupBtn = document.querySelector(".popup__btn");
  }
  visiblePopup(result) {
    if (result == "win") {
      popupMessage.textContent = " YOU WIN";
      popup.classList.add("visible");
      winSound.play();
    } else if (result == "loose") {
      popupMessage.textContent = " YOU LOOSE";
      popup.classList.add("visible");
      alertSound.play();
    } else if (result == "retry") {
      popupMessage.textContent = " RETRY?";
      popup.classList.add("visible");
      alertSound.play();
    }
  }
}
