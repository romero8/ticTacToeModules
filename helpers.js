export function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
  
    return result;
  }

  export function getRandomAvilableSpace(){
    let randomIndex = getRandomNumber(0, spaces.length-1)
    
      if(turns.includes(randomIndex)){
        getRandomAvilableSpace()
        return false
      }
      else{
        return randomIndex
      }
        
      
    }

    export function resetScore(xCount,oCount,xScore,oScore) {
      xCount = []
      oCount = []
      xScore.innerText = xCount.length
      oScore.innerText = oCount.length
    }