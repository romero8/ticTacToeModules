function updateDifficulty() {
    if (selectGame.value != "friend") {
      switch (selectGame.value) {
        case "easy":
          easy()
          break;
        case "hard":
          alert('hard')
          break;
      }
  
    } else {
      alert('friend')
    }
  }
  
  function easy() {
    if (currentPlayer == X_TEXT) {
      computerTurn()
    }
  }

  export{easy,updateDifficulty}