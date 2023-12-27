const X_class = 'x';
const O_class = 'o';
const win = document.querySelector('.result');
const pop_up = document.getElementById('pop-up');
const restart = document.getElementById('btn');
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElement = document.querySelectorAll('[data-cell]');
const boardHover = document.getElementById('board');
let oturn;

startGame();

restart.addEventListener('click', startGame);

function startGame(){
  oturn = false;
  cellElement.forEach(cell =>{
    cell.classList.remove(X_class);
    cell.classList.remove(O_class);
    cell.addEventListener('click', handleClick, {once:true});
  })
  hover();
  pop_up.classList.remove('show');
}

function handleClick(e){
  const cell = e.target;
  const currentClass = oturn ? O_class : X_class; // how
  placeMark(cell, currentClass);
  if(checkWin(currentClass)){
    endGame(false);
  }
  else if(isDraw()){
    endGame(true)
  }
  else{
    swapTurn();
    hover();
  }
}

function endGame(draw){
  if(draw){
    win.innerText =`Draw!`;
  }
  else{
    win.innerText = `${oturn ? "O's":"X's"} Wins!`;
  }
  pop_up.classList.add('show');
}

function isDraw(){
  return [...cellElement].every(cell =>{
    return cell.classList.contains(X_class) || cell.classList.contains(O_class);
  })
}

function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

function swapTurn(){
  oturn = !oturn;
}

function hover(){
  boardHover.classList.remove(X_class);
  boardHover.classList.remove(O_class);
  if(oturn){
    boardHover.classList.add(O_class);
  }
  else{
    boardHover.classList.add(X_class);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElement[index].classList.contains(currentClass);
    })
  })
}