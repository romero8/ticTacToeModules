export function countScore(currentPlayer,xCount,oCount,xScore,oScore,X_TEXT,O_TEXT,gameActive) {
    if (currentPlayer == X_TEXT && gameActive == true) {
      xCount.push(X_TEXT)
    }
    if (currentPlayer == O_TEXT && gameActive == true) {
      oCount.push(O_TEXT)
    }
    
    xScore.innerText = xCount.length
    oScore.innerText = oCount.length
  
  }