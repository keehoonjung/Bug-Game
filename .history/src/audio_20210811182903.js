const backgroundAudio = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}

function stopSound(audio) {
  audio.pause();
}
