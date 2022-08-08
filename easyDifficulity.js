
export function computerTurn() { 
  let randomIndex = getRandomNumber(0, avialable.length - 1)
  let randomBox = avialable[randomIndex]
  
  const id = boxesId[randomBox] 
  let existingBox = boxesId[avialable[randomIndex]]
  boxes[existingBox].innerText = currentPlayer

  if(!avialable[existingBox]){
    spaces[existingBox] = currentPlayer
    avialable.splice(existingBox,1)
    renderBoard()
  }

}