import {renderBoard} from './render.js';
import {easy,updateDifficulty} from './difficulties.js';
import {computerTurn} from './easyDifficulity';
import {getRandomNumber} from './helpers'


const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));
let winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
const restartBtn = document.getElementById("restartBtn");
const playText = document.getElementById("playText");
let spaces = [null, null, null, null, null, null, null, null, null];
let avialable = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let boxesId = boxes.map(boxId=>boxId.id)
const O_TEXT = "O";
const X_TEXT = "X";
const tie_Text = 'Its a Tie!!'
let currentPlayer = O_TEXT;
let selectGame = document.querySelector('[data-select]')


const startGame = () => {
  boxes.forEach((box) => {
    box.addEventListener("click", boxClicked);
  });
};


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && (spaces[a] == spaces[b] && spaces[b] == spaces[c])) {
      return [a, b, c]
    }
  }
  return false
}



const tie = () => {
  let check = spaces.every((box) => {
    return box !== null
  })
  if (check == true) {
    console.log('Its a Tie!')
    return true;
  }
}



restartBtn.addEventListener("click", reset);

function reset() {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = ''
  });
  playText.innerHTML = `Let's Play`;

  currentPlayer = O_TEXT;
}



function boxClicked(e) {
  const id = e.target.id;
  e.target.innerText = currentPlayer;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    avialable.splice(id, 1)
    renderBoard()
  }

  updateDifficulty()
}


reset()
startGame();


