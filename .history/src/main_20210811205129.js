"use strict";

import GamePlay from "./game.js";
import PopUp from "./popup.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 6;
const GAME_TIME = 10;

const finishGameBanner = new PopUp();
const Game = new GamePlay(GAME_TIME, CARROT_COUNT, BUG_COUNT);

finishGameBanner.setClickBtn(() => {
  Game.start();
});
