"use strict";

import GameBuilder from "./game.js";
import PopUp from "./popup.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 6;
const GAME_TIME = 10;

const finishGameBanner = new PopUp();
const game = new GameBuilder();

finishGameBanner.setClickBtn(() => {
  Game.start();
});

Game.setOnGameStop((text) => {
  finishGameBanner.visible(text);
});
