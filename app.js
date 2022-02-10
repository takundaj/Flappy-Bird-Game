const wall = document.querySelector(".wall");
const hole = document.querySelector(".hole");
const score = document.querySelector(".score");
const introWrapper = document.querySelector(".intro-wrapper");
const introTime = document.querySelector(".intro-timer");
const highscoreElement = document.querySelector(".high-score > .score");
let random = 100;
hole.style.top = `${random}px`;
let counter = 0;

wall.addEventListener("animationiteration", (e) => {
  random = Math.random() * 300 + 50;
  hole.style.top = `${random}px`;
  counter++;
  score.textContent = `${counter}`;
});

//gravity on character
const char = document.querySelector(".char");

let gravity = 0;

let introTimer = 4;

const introCountDown = setInterval(() => {
  introTime.textContent = `${introTimer}`;
  introTimer--;

  if (introTime.textContent === "0") {
    introWrapper.style.display = "none";
  }
}, 950);

const startGame = () => {};

setTimeout(() => {
  const fall = setInterval(() => {
    char.style.top = `${gravity}px`;
    gravity += 2;
  }, 10);
}, 5000);

const checkGameOver = setInterval(() => {
  //game over checker
  wallLeft = parseInt(getComputedStyle(wall).getPropertyValue("left"));
  console.log(wallLeft);
  holeTop = random;
  holeBottom = holeTop + 120;
  charTop = parseInt(getComputedStyle(char).getPropertyValue("top"));
  charBottom = parseInt(getComputedStyle(char).getPropertyValue("bottom"));

  if (
    gravity >= 470 ||
    gravity < 0 ||
    (wallLeft < 230 &&
      wallLeft > 150 &&
      (charTop < holeTop || charTop > holeBottom))
  ) {
    wall.style.display = "none";
    gameOver();
  }
}, 10);

//fly function
const game = document.querySelector("#game");
game.addEventListener("click", (e) => {
  gravity -= 50;
});

function gameOver() {
  if (counter > localStorage.getItem("lastscore")) {
    localStorage.setItem("lastscore", counter);
    highscoreElement.textContent = `${localStorage.getItem("lastscore")}`;
  }

  gravity = 0;
  alert(`Game over! Your score: ${counter}`);
  location.reload();
  counter = 0;
}

highscoreElement.textContent = `${checkIfHighScoreIsZero()}`;

function checkIfHighScoreIsZero() {
  if (localStorage.getItem("last score")) {
    return localStorage.getItem("last score");
  } else {
    return 0;
  }
}
