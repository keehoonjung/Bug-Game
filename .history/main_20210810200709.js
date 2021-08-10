"use strict";

// 1. 플레이 버튼 누르면 벌래랑 당근 만들기.
const playBtn = document.querySelector(".play__btn");
const stopBtn = document.querySelector(".stop__btn");
const gameScore = document.querySelector(".count");
const playground = document.querySelector(".playground");
const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup__message");
const popupBtn = document.querySelector(".popup__btn");
const gameTimer = document.querySelector(".timer");

const backgroundAudio = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

const carroutCount = 10;
const bugCount = 6;
const gameTime = 10;

let score;
let timeInterver;
let started = false;

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame("retry");
  } else {
    showStopButton();
    startGame();
  }
});

function stopGame(text) {
  started = false;
  playBtn.style.visibility = "hidden";
  stopTimer();
  visiblePopup(text);
  backgroundAudio.pause();
}

function startGame() {
  started = true;
  score = carroutCount + 1;
  createItem("carrot", carroutCount);
  createItem("bug", bugCount);
  showScoreAndTimer();
  countCarrot();
  timeCount();
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
}

function showStopButton() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function showScoreAndTimer() {
  gameScore.style.visibility = "visible";
  gameTimer.style.visibility = "visible";
}

function createItem(name, count) {
  for (let i = 0; i < count; i++) {
    const leftcoor = Math.random() * 1000 + 100;
    const topcoor = Math.random() * 300;
    const item = document.createElement("img");
    item.setAttribute("class", `${name}`);
    item.setAttribute("id", i);
    item.setAttribute("src", `./img/${name}.png`);
    item.style.top = `${topcoor}px`;
    item.style.left = `${leftcoor}px`;
    playground.appendChild(item);
  }
}

// 3. 당근, 벌래 누르면 없어짐
playground.addEventListener("click", (event) => {
  const target = event.target;
  console.log(started);
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

// 5. 카운트가 다 달면 팝업 보이기, 시간 다달면 팝업 보이기, 벌래 클릭하면 팝업 보이기
function visiblePopup(result) {
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

// 6.retry 버튼 누르면 재시작
popupBtn.addEventListener("click", () => {
  playBtn.style.visibility = "visible";
  playground.innerHTML = "";
  popup.classList.remove("visible");
  startGame();
});

// 7. 타이머 시간 자동 감소
function timeCount() {
  let remaingTime = gameTime;
  timer(remaingTime);
  timeInterver = setInterval(() => {
    if (remaingTime <= 0) {
      visiblePopup("loose");
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
