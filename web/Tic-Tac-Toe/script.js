class TicTacToeGame {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMode = 'player'; // 'player' or 'ai'
        
        // Statistics
        this.scores = {
            X: parseInt(localStorage.getItem('scoreX')) || 0,
            O: parseInt(localStorage.getItem('scoreO')) || 0,
            draws: parseInt(localStorage.getItem('draws')) || 0,
            gamesPlayed: parseInt(localStorage.getItem('gamesPlayed')) || 0
        };
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.cells = document.querySelectorAll('.cell');
        this.currentTurnDisplay = document.getElementById('current-turn');
        this.playerX = document.getElementById('player-x');
        this.playerO = document.getElementById('player-o');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.gamesPlayedSpan = document.getElementById('games-played');
        this.drawsSpan = document.getElementById('draws');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.resetScoresBtn = document.getElementById('reset-scores-btn');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.winningLine = document.getElementById('winning-line');
    }
    
    setupEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.resetScoresBtn.addEventListener('click', () => this.resetScores());
        
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.changeGameMode(btn.dataset.mode));
        });
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) return;
        
        this.makeMove(index, this.currentPlayer);
        
        if (this.gameActive) {
            if (this.gameMode === 'ai' && this.currentPlayer === 'X') {
                setTimeout(() => this.makeAIMove(), 500);
            } else if (this.gameMode === 'player') {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.updateCurrentPlayer();
            }
        }
    }
    
    makeMove(index, player) {
        this.board[index] = player;
        this.cells[index].textContent = player === 'X' ? '❌' : '⭕';
        this.cells[index].classList.add(player.toLowerCase(), 'occupied');
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.scores[player]++;
            this.scores.gamesPlayed++;
            this.updateDisplay();
            this.showWinner(player);
            this.saveScores();
        } else if (this.board.every(cell => cell !== '')) {
            this.gameActive = false;
            this.scores.draws++;
            this.scores.gamesPlayed++;
            this.updateDisplay();
            this.showDraw();
            this.saveScores();
        }
    }
    
    makeAIMove() {
        if (!this.gameActive) return;
        
        const bestMove = this.getBestMove();
        this.makeMove(bestMove, 'O');
        
        if (this.gameActive) {
            this.currentPlayer = 'X';
            this.updateCurrentPlayer();
        }
    }
    
    getBestMove() {
        // Simple AI strategy: try to win, then block, then take center, then corners, then edges
        
        // Check for winning move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWinner()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // Check for blocking move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWinner()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // Take center if available
        if (this.board[4] === '') return 4;
        
        // Take corners
        const corners = [0, 2, 6, 8];
        for (let corner of corners) {
            if (this.board[corner] === '') return corner;
        }
        
        // Take edges
        const edges = [1, 3, 5, 7];
        for (let edge of edges) {
            if (this.board[edge] === '') return edge;
        }
        
        return 0; // Fallback
    }
    
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(combination);
                return true;
            }
        }
        
        return false;
    }
    
    highlightWinningCells(combination) {
        combination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.drawWinningLine(combination);
    }
    
    drawWinningLine(combination) {
        const [a, b, c] = combination;
        const cell1 = this.cells[a];
        const cell2 = this.cells[b];
        const cell3 = this.cells[c];
        
        const boardRect = document.querySelector('.board-grid').getBoundingClientRect();
        const cellSize = cell1.getBoundingClientRect().width;
        const cellSpacing = 8;
        
        let lineClass = '';
        let top = 0;
        let left = 0;
        
        // Determine line type and position
        if (a === 0 && b === 1 && c === 2) { // Top row
            lineClass = 'horizontal';
            top = cellSize / 2 + cellSpacing;
            left = cellSpacing;
        } else if (a === 3 && b === 4 && c === 5) { // Middle row
            lineClass = 'horizontal';
            top = cellSize * 1.5 + cellSpacing * 2;
            left = cellSpacing;
        } else if (a === 6 && b === 7 && c === 8) { // Bottom row
            lineClass = 'horizontal';
            top = cellSize * 2.5 + cellSpacing * 3;
            left = cellSpacing;
        } else if (a === 0 && b === 3 && c === 6) { // Left column
            lineClass = 'vertical';
            top = cellSpacing;
            left = cellSize / 2 + cellSpacing;
        } else if (a === 1 && b === 4 && c === 7) { // Middle column
            lineClass = 'vertical';
            top = cellSpacing;
            left = cellSize * 1.5 + cellSpacing * 2;
        } else if (a === 2 && b === 5 && c === 8) { // Right column
            lineClass = 'vertical';
            top = cellSpacing;
            left = cellSize * 2.5 + cellSpacing * 3;
        } else if (a === 0 && b === 4 && c === 8) { // Diagonal \
            lineClass = 'diagonal-1';
            top = cellSpacing;
            left = cellSpacing;
        } else if (a === 2 && b === 4 && c === 6) { // Diagonal /
            lineClass = 'diagonal-2';
            top = cellSpacing;
            left = cellSize * 2 + cellSpacing * 3;
        }
        
        this.winningLine.className = `winning-line ${lineClass} show`;
        this.winningLine.style.top = `${top}px`;
        this.winningLine.style.left = `${left}px`;
    }
    
    showWinner(player) {
        const playerName = player === 'X' ? 'Player X' : (this.gameMode === 'ai' ? 'AI' : 'Player O');
        this.currentTurnDisplay.textContent = `🎉 ${playerName} Wins!`;
        this.currentTurnDisplay.style.background = 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)';
        
        this.createConfetti();
    }
    
    showDraw() {
        this.currentTurnDisplay.textContent = '🤝 It\'s a Draw!';
        this.currentTurnDisplay.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    }
    
    newGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.winningLine.classList.remove('show');
        this.updateCurrentPlayer();
        this.currentTurnDisplay.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
    }
    
    resetScores() {
        this.scores = { X: 0, O: 0, draws: 0, gamesPlayed: 0 };
        this.updateDisplay();
        this.saveScores();
        this.newGame();
    }
    
    changeGameMode(mode) {
        this.modeBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        this.gameMode = mode;
        this.newGame();
    }
    
    updateCurrentPlayer() {
        this.playerX.classList.toggle('current-player', this.currentPlayer === 'X');
        this.playerO.classList.toggle('current-player', this.currentPlayer === 'O');
        
        const playerName = this.currentPlayer === 'X' ? 'Player X' : (this.gameMode === 'ai' ? 'AI' : 'Player O');
        this.currentTurnDisplay.textContent = `${this.currentPlayer === 'X' ? '❌' : '⭕'} ${playerName}'s Turn`;
    }
    
    updateDisplay() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.gamesPlayedSpan.textContent = this.scores.gamesPlayed;
        this.drawsSpan.textContent = this.scores.draws;
        
        this.updateCurrentPlayer();
    }
    
    saveScores() {
        localStorage.setItem('scoreX', this.scores.X);
        localStorage.setItem('scoreO', this.scores.O);
        localStorage.setItem('draws', this.scores.draws);
        localStorage.setItem('gamesPlayed', this.scores.gamesPlayed);
    }
    
    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#4ecdc4', '#44a08d', '#ff6b6b', '#ee5a52'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'confettiFall 3s linear forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});
