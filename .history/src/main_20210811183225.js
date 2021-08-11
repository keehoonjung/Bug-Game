"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./audio.js";

const stopBtn = document.querySelector(".stop__btn");
const gameScore = document.querySelector(".count");
const playBtn = document.querySelector(".play__btn");
const gameTimer = document.querySelector(".timer");

const CARROT_COUNT = 10;
const BUG_COUNT = 6;
const gameTime = 10;

let score;
let timeInterver;
let started = false;

const finishGameBanner = new PopUp();
const GameField = new Field(CARROT_COUNT, BUG_COUNT);

// 1. 플레이 버튼 누르면 벌래랑 당근 만들기.

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame("retry");
  } else {
    changeStartButton();
    startGame();
  }
});

function stopGame(text) {
  if (text == "win") {
    sound.playWinSound();
  } else {
    playSound(winSound);
  }
  started = false;
  hideStopButton();
  stopTimer();
  finishGameBanner.visible(text);
  backgroundAudio.pause();
}

function startGame() {
  started = true;
  score = CARROT_COUNT + 1;
  showStopButton();
  showScoreAndTimer();
  countCarrot();
  timeCount();
  playSound(backgroundAudio);
  GameField.init();
}

function changeStartButton() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function hideStopButton() {
  playBtn.style.visibility = "hidden";
}

function showStopButton() {
  playBtn.style.visibility = "visible";
}

function showScoreAndTimer() {
  gameScore.style.visibility = "visible";
  gameTimer.style.visibility = "visible";
}

// 3. 당근, 벌래 누르면 없어짐
GameField.setClickItem(setItem);
function setItem(event) {
  const target = event.target;
  if (started) {
    if (target.classList == "carrot") {
      target.remove();
      countCarrot();
      playSound(carrotSound);
    } else if (target.classList == "bug") {
      stopGame("loose");
      playSound(bugSound);
    }
  }
}

// 4. 당근 없어질때마다 카운트 감소
function countCarrot() {
  score--;
  gameScore.textContent = `${score}`;
  if (score === 0) {
    stopGame("win");
  }
}

// 6.retry 버튼 누르면 재시작
finishGameBanner.setClickBtn(() => {
  startGame();
});

// 7. 타이머 시간 자동 감소
function timeCount() {
  let remaingTime = gameTime;
  timer(remaingTime);
  timeInterver = setInterval(() => {
    if (remaingTime <= 0) {
      stopGame("loose");
      return;
    }
    timer(--remaingTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timeInterver);
}

function timer(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  gameTimer.textContent = `${min}:${sec}`;
}
