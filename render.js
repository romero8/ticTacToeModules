export function renderBoard() {
    if (playerHasWon() !== false) {
      playText.innerHTML = `${currentPlayer} wins!!`;
      let winningBlocks = playerHasWon()
      winningBlocks.map(box => boxes[box].style.backgroundColor = winningIndicator)
      return;
    }
    if (tie()) {
      playText.innerHTML = `${tie_Text}`;
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }