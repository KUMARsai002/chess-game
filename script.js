const board = document.getElementById('chessboard');

const pieces = {
  black: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
          '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  white: ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
          '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
};

let selected = null;
let currentPlayer = 'white';

function createBoard() {
  board.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
      square.dataset.row = row;
      square.dataset.col = col;
      square.addEventListener('click', handleSquareClick);
      board.appendChild(square);
    }
  }

  setupPieces();
}

function setupPieces() {
  const squares = document.querySelectorAll('.square');

  // Place black
  pieces.black.forEach((p, i) => {
    const piece = createPiece(p, 'black');
    squares[i].appendChild(piece);
  });

  // Place white
  pieces.white.forEach((p, i) => {
    const piece = createPiece(p, 'white');
    squares[63 - i].appendChild(piece); // reverse order for white
  });
}

function createPiece(symbol, color) {
  const piece = document.createElement('div');
  piece.textContent = symbol;
  piece.classList.add('piece');
  piece.dataset.color = color;
  return piece;
}

function handleSquareClick(e) {
  const square = e.currentTarget;
  const piece = square.querySelector('.piece');

  if (selected) {
    const selectedPiece = selected.querySelector('.piece');
    if (piece && piece.dataset.color === currentPlayer) {
      selected = square; // reselect
      return;
    }

    // Move logic
    if (selectedPiece && selectedPiece.dataset.color === currentPlayer) {
      square.innerHTML = '';
      square.appendChild(selectedPiece);
      selected = null;
      currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    }
  } else {
    if (piece && piece.dataset.color === currentPlayer) {
      selected = square;
    }
  }
}

createBoard();
