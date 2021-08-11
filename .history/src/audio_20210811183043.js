const backgroundSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

export function playCarrotSound() {
  playSound(carrotSound);
}

export function playBugSound() {
  playSound(bugSound);
}
export function playWinSound() {
  playSound(winSound);
}

export function playAlertSound() {
  playSound(alertSound);
}

export function playBackgroundSound() {
  playSound(backgroundAudio);
}

function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}

function stopSound(audio) {
  audio.pause();
}
