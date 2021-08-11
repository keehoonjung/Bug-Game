"use strict";

export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.popupMessage = document.querySelector(".popup__message");
    this.popupBtn = document.querySelector(".popup__btn");
  }

  setClickBtn(onClick) {
    this.onClick = onClick;
  }

  visiblePopup(result) {
    if (result == "win") {
      this.popupMessage.textContent = " YOU WIN";
      this.popup.classList.add("visible");
      winSound.play();
    } else if (result == "loose") {
      this.popupMessage.textContent = " YOU LOOSE";
      this.popup.classList.add("visible");
      alertSound.play();
    } else if (result == "retry") {
      this.popupMessage.textContent = " RETRY?";
      this.popup.classList.add("visible");
      alertSound.play();
    }
  }
}
