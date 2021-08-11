"use strict";

import PopUp from "./popup.js";

const stopBtn = document.querySelector(".stop__btn");
const gameScore = document.querySelector(".count");
const playBtn = document.querySelector(".play__btn");
const playground = document.querySelector(".playground");
const gameTimer = document.querySelector(".timer");
const playgroundRect = playground.getBoundingClientRect();

const backgroundAudio = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

const carroutCount = 10;
const bugCount = 6;
const gameTime = 10;
const CARROT_SIZE = 80;

let score;
let timeInterver;
let started = false;

const finishGameBanner = new PopUp();

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
  started = false;
  hideStopButton();
  stopTimer();
  finishGameBanner.visible(text);
  backgroundAudio.pause();
}

function startGame() {
  playground.innerHTML = "";
  started = true;
  score = carroutCount + 1;
  showStopButton();
  createItem("carrot", carroutCount);
  createItem("bug", bugCount);
  showScoreAndTimer();
  countCarrot();
  timeCount();
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
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

function createItem(name, count) {
  const x1 = 0;
  const y1 = 0;
  const x2 = playgroundRect.width - CARROT_SIZE;
  const y2 = playgroundRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    const item = document.createElement("img");
    item.setAttribute("class", `${name}`);
    item.setAttribute("id", i);
    item.setAttribute("src", `./img/${name}.png`);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    playground.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// 3. 당근, 벌래 누르면 없어짐
playground.addEventListener("click", (event) => {
  const target = event.target;
  if (started) {
    if (target.classList == "carrot") {
      target.remove();
      countCarrot();
      carrotSound.play();
    } else if (target.classList == "bug") {
      stopGame("loose");
      bugSound.play();
    }
  }
});

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
