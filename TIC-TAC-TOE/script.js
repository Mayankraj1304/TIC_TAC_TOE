document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.move');
    const message = document.getElementById('message');
    const playButton = document.getElementById('butt');
    const userScore = document.getElementById('usc').querySelector('p');
    const botScore = document.getElementById('bsc').querySelector('p');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;
     const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
     function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = Array.from(cells).indexOf(cell);
         if (board[cellIndex] !== null || !gameActive) {
            return;
        }
         board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
         if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            updateScore(currentPlayer);
            gameActive = false;
            return;
        }
         if (board.every(cell => cell !== null)) {
            message.textContent = 'Draw!';
            gameActive = false;
            return;
        }
         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
     function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => board[index] === currentPlayer);
        });
    }
     function updateScore(winner) {
        if (winner === 'X') {
            userScore.textContent = parseInt(userScore.textContent) + 1;
        } else {
            botScore.textContent = parseInt(botScore.textContent) + 1;
        }
    }
     function resetGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = '';
    }
     cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    playButton.addEventListener('click', resetGame);
});