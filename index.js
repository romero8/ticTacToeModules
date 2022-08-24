import {
  renderBoard
} from "./render.js";

import {
  playerTypes,
  LEVELS
} from './config.js'

import {
  countScore
} from "./scoreBoard.js";

import{
  blockForWin
} from './unbeatable.js'

import {
  resetScore
} from './helpers.js'


const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));

let winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let defaultColor = getComputedStyle(document.body).getPropertyValue('--purple')
const restartBtn = document.getElementById("restartBtn");
const playText = document.getElementById("playText");
const startBtn = document.getElementById('startBtn');
const undoBtn = document.getElementById('undoBtn')

let oScore = document.querySelector('.oScore')
let xScore = document.querySelector('.xScore')

let xCount = []
let oCount = []

const O_TEXT = "O";
const X_TEXT = "X";
const tie_Text = 'Its a Tie!!'
let currentPlayer = O_TEXT;
let gameActive = false;





let secondPlayer = playerTypes.FRIEND;
let levelPlayer = LEVELS.FRIEND


let selectGame = document.querySelector('[data-select]')
let spaces = [null, null, null, null, null, null, null, null, null];
let turns = []

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




const startGame = () => {
  boxes.forEach((box) => {
    box.addEventListener("click", boxClicked);
  });
};




startBtn.addEventListener('click', e => activeGame(gameActive, startBtn, winningIndicator))

function activeGame() {
  gameActive = true
  if (gameActive) {
    startBtn.style.backgroundColor = winningIndicator
  }
}



selectGame.addEventListener('change', updateDifficulty)

function updateDifficulty() {
  if (selectGame.value === "friend") {
    secondPlayer = selectGame.value;
    levelPlayer = selectGame.value;
    console.log(secondPlayer)
    console.log(levelPlayer)
  }
  if (selectGame.value === "easy") {
    secondPlayer = playerTypes.COMPUTER;
    levelPlayer = selectGame.value;
    console.log(secondPlayer)
    console.log(levelPlayer)
  }

  if (selectGame.value === "hard") {
    secondPlayer = playerTypes.COMPUTER;
    levelPlayer = selectGame.value;
    console.log(secondPlayer)
    console.log(levelPlayer)
  }

  resetScore(xCount,oCount,xScore,oScore)
  reset();
}




undoBtn.addEventListener('click', undo)

function undo() {
  let indexTurn = turns.length - 1
  let computerIndexTurn = turns.length - 2
  let lastTurn = turns[indexTurn]
  let computerLastTurn = turns[computerIndexTurn]
  if (gameActive == true) {
    spaces[lastTurn] = null
    turns.splice(indexTurn, 1)
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
  }

  if (gameActive == true && secondPlayer === "computer" && levelPlayer === "easy") {
    spaces[lastTurn] = null
    spaces[computerLastTurn] = null
    turns.splice(indexTurn, 1)
    turns.splice(computerIndexTurn, 1)
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
  }
  renderBoard(boxes, spaces)
}



restartBtn.addEventListener("click", reset);

function reset() {
  startBtn.style.backgroundColor = defaultColor
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = ''
  });
  turns = []
  playText.innerHTML = `Let's Play`;

  currentPlayer = O_TEXT;
}


renderBoard(boxes, spaces)




function checkForWin() {
  if (playerHasWon()) {
    playText.innerHTML = `${currentPlayer} wins!!`;
    let winningBlocks = playerHasWon()
    winningBlocks.map(box => boxes[box].style.backgroundColor = winningIndicator)
    countScore(currentPlayer, xCount, oCount, xScore, oScore, X_TEXT, O_TEXT, gameActive)
    gameActive = false
    return;
  }

  if (!playerHasWon()) {
    gameActive = true
  }

  if (tie()) {
    playText.innerHTML = `${tie_Text}`;
    gameActive = false
    return;
  }


  currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT

}


function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && (spaces[a] == spaces[b] && spaces[b] == spaces[c])) {
      return [a, b, c]
    }
  }
  return false
}


function tie() {
  let check = spaces.every((box) => {
    return box !== null
  })
  if (check == true) {
    console.log('Its a Tie!')
    return true;
  }

}




function boxClicked(e) {
  if (gameActive === true) {
    startBtn.style.backgroundColor = winningIndicator
    const id = e.target.id;
    if (!spaces[id]) {
      spaces[id] = currentPlayer;
      turns.push(id)

      checkForWin();
      renderBoard(boxes, spaces)
    }

  }

  if (secondPlayer === "computer" && levelPlayer === "easy" && gameActive === true) {
    easyTurn()
  }

  if (secondPlayer === "computer" && levelPlayer === "hard" && gameActive === true) {
    hardTurn()
  }

}





function easyTurn() {
  if (currentPlayer == X_TEXT && gameActive == true && levelPlayer === "easy") {

    let find = spaces.find((space) => {
      return space == null
    })

    let findIndex = spaces.indexOf(find)
    if (!spaces[findIndex]) {
      spaces[findIndex] = currentPlayer
      turns.push(findIndex)
      checkForWin()
      renderBoard(boxes, spaces)
    }
  }
}



function hardTurn() {
  if (currentPlayer === X_TEXT && gameActive === true && levelPlayer === "hard") {
    blockForWin(winningCombos,spaces,O_TEXT,X_TEXT)
  }
  checkForWin()
  renderBoard(boxes, spaces)
}



startGame();