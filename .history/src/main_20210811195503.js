"use strict";

import GamePlay from "./game.js";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./audio.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 6;
const GAME_TIME = 10;

const finishGameBanner = new PopUp();
const GameField = new Field(CARROT_COUNT, BUG_COUNT);
const Game = new GamePlay(GAME_TIME, CARROT_COUNT);

function startGame() {
  Game.start();
  sound.playBackgroundSound();
  GameField.init();
}

function stopGame(text) {
  if (text == "win") {
    sound.playWinSound();
  } else {
    sound.playAlertSound();
  }
  Game.stop(text);
  finishGameBanner.visible(text);
  sound.stopBackgroundSound();
}

// 3. 당근, 벌래 누르면 없어짐
GameField.setClickItem(setItem);
function setItem(item) {
  if (!started) {
    return;
  } else {
    if (item === "carrot") {
      Game.countCarrot();
    } else if (item === "bug") {
      stopGame("loose");
    }
  }
}

// 6.retry 버튼 누르면 재시작
finishGameBanner.setClickBtn(() => {
  startGame();
});
