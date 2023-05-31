const gameBoard = document.querySelector(".game-board");
const infoMessage = document.querySelector(".info");
const stratCells = ["", "", "", "", "", "", "", "", ""];
let turnsPlayed = 0; // track the number of turns played

let go = "circle";

infoMessage.textContent = "Circle goes first";

function createBoard() {
  stratCells.forEach((_, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.insertAdjacentElement("beforeend", cellElement);
  });
}
createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.insertAdjacentElement("beforeend", goDisplay);

  go = go == "circle" ? "cross" : "circle";
  infoMessage.textContent = `it is now ${go}'s go.`;
  e.target.removeEventListener("click", addGo);

  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winnerFound = false; // track if a winner is found

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (circleWins) {
      infoMessage.textContent = "Circle wins!";
      resetBoard(allSquares);
      winnerFound = true;
      return;
    } else if (crossWins) {
      infoMessage.textContent = "Cross wins!";
      resetBoard(allSquares);
      winnerFound = true;
      return;
    }
  });

  turnsPlayed++;

  if (!winnerFound && turnsPlayed === allSquares.length) {
    infoMessage.textContent = "No one wins!";
  }
}

function resetBoard(allSquares) {
  allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
}
