export function renderBoard(root, state) {
  root.forEach((box) => {
    let id = box.id
    root[id].innerHTML = state[id]
    
    
  })
  
}

