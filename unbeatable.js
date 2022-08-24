export function blockForWin(winningCombos,spaces,O_TEXT,X_TEXT) {
    for (const condition of winningCombos) {
      let [a, b, c] = condition;
  
      if (spaces[a] == O_TEXT && (spaces[a] == spaces[b])) {
        spaces[c] = X_TEXT
      }
      if (spaces[a] == O_TEXT && (spaces[a] == spaces[c])) {
        spaces[b] = X_TEXT
      }
      if (spaces[b] == O_TEXT && (spaces[b] == spaces[c])) {
        spaces[a] = X_TEXT
      }
  
    }
  }