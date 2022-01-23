const wall = document.querySelector(".wall");
const hole = document.querySelector(".hole");
const score = document.querySelector(".score")
let random = 100;
hole.style.top = `${random}px`
let counter = 0;

wall.addEventListener("animationiteration", (e) => {
  random = Math.random() * 300 + 50;
  hole.style.top = `${random}px`;
  counter++
  score.textContent = `${counter}`
});

//gravity on character
const char = document.querySelector(".char");

let gravity = 0;

const fall = setInterval(() => {
  char.style.top = `${gravity}px`;
  gravity += 4;

  //game over checker
  wallLeft = parseInt(getComputedStyle(wall).getPropertyValue("left"));
  console.log(wallLeft)
  holeTop = random;
  holeBottom = holeTop + 120;
  charTop = parseInt(getComputedStyle(char).getPropertyValue("top"));
  charBottom = parseInt(getComputedStyle(char).getPropertyValue("bottom"));

  if ((gravity >= 470 || gravity < 0) || ((wallLeft < 230 && wallLeft > 150) && (charTop < holeTop || charTop > holeBottom ))) {
    gameOver()
  }
}, 10);

//fly function
const game = document.querySelector("#game");
game.addEventListener("click", (e) => {
  gravity -= 50;
});

function gameOver() {
  gravity = 0;
  alert(`Game over! Your score: ${counter}`);
  location.reload()
  counter = 0;
  score.textContent = `${counter}`
}