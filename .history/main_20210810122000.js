"use strict";

// 1. 플레이 버튼 누르면 벌래랑 당근 만들기.
const carroutCount = 10;
const bugCount = 6;

const playBtn = document.querySelector(".play__btn");
const playground = document.querySelector(".playground");

playBtn.addEventListener("click", () => {
  createItem("carrot", carroutCount);
  createItem("bug", bugCount);
});

function createItem(name, count) {
  for (let i = 0; i < count; i++) {
    const leftcoor = Math.random() * 1000 + 100;
    const topcoor = Math.random() * 300;
    const item = document.createElement("img");
    item.setAttribute("class", `${name}`);
    item.setAttribute("src", `./img/${name}.png`);
    item.style.top = `${topcoor}px`;
    item.style.left = `${leftcoor}px`;
    playground.appendChild(item);
  }
}

// 2. 플레이 버튼 누르면 시간 감소

// 3. 당근, 벌래 누르면 없어짐

// 4. 당근 없어질때마다 카운트 감소

// 5. 카운트가 다 달면 팝업 보이기, 시간 다달면 팝업 보이기, 벌래 클릭하면 팝업 보이기
