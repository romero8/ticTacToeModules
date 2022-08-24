export function activeGame (gameActive,startBtn,winningIndicator) {
    gameActive = true
    if (gameActive) {
      startBtn.style.backgroundColor = winningIndicator
    }
  }