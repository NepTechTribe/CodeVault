class NumberGuessingGame {
    constructor() {
        this.targetNumber = 0;
        this.attempts = 0;
        this.minRange = 1;
        this.maxRange = 100;
        this.gameWon = 0;
        this.bestScore = localStorage.getItem('bestScore') || null;
        this.gamesWonCount = parseInt(localStorage.getItem('gamesWon')) || 0;
        this.gameActive = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateStats();
        this.newGame();
    }
    
    initializeElements() {
        this.guessInput = document.getElementById('guess-input');
        this.guessBtn = document.getElementById('guess-btn');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.feedback = document.getElementById('feedback');
        this.attemptsSpan = document.getElementById('attempts');
        this.bestScoreSpan = document.getElementById('best-score');
        this.gamesWonSpan = document.getElementById('games-won');
        this.rangeFill = document.getElementById('range-fill');
        this.minRangeSpan = document.getElementById('min-range');
        this.maxRangeSpan = document.getElementById('max-range');
        this.difficultyBtns = document.querySelectorAll('.difficulty-btn');
    }
    
    setupEventListeners() {
        this.guessBtn.addEventListener('click', () => this.makeGuess());
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.hintBtn.addEventListener('click', () => this.getHint());
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });
        
        this.guessInput.addEventListener('input', () => {
            const value = parseInt(this.guessInput.value);
            if (value < this.minRange || value > this.maxRange) {
                this.guessInput.style.borderColor = '#ff6b6b';
            } else {
                this.guessInput.style.borderColor = '#e1e5e9';
            }
        });
        
        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => this.changeDifficulty(btn.dataset.difficulty));
        });
    }
    
    changeDifficulty(difficulty) {
        this.difficultyBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
        
        switch (difficulty) {
            case 'easy':
                this.minRange = 1;
                this.maxRange = 50;
                break;
            case 'medium':
                this.minRange = 1;
                this.maxRange = 100;
                break;
            case 'hard':
                this.minRange = 1;
                this.maxRange = 200;
                break;
        }
        
        this.guessInput.min = this.minRange;
        this.guessInput.max = this.maxRange;
        this.guessInput.placeholder = `Enter your guess (${this.minRange}-${this.maxRange})`;
        
        this.updateRangeDisplay();
        this.newGame();
    }
    
    newGame() {
        this.targetNumber = Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
        this.attempts = 0;
        this.gameActive = true;
        
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.guessBtn.disabled = false;
        this.hintBtn.disabled = false;
        
        this.updateStats();
        this.updateRangeDisplay();
        this.showFeedback('Start guessing to begin!', 'info');
        
        this.guessInput.focus();
    }
    
    makeGuess() {
        if (!this.gameActive) return;
        
        const guess = parseInt(this.guessInput.value);
        
        if (isNaN(guess)) {
            this.showFeedback('Please enter a valid number!', 'error');
            return;
        }
        
        if (guess < this.minRange || guess > this.maxRange) {
            this.showFeedback(`Please enter a number between ${this.minRange} and ${this.maxRange}!`, 'error');
            return;
        }
        
        this.attempts++;
        this.updateStats();
        
        if (guess === this.targetNumber) {
            this.gameWon();
        } else if (guess < this.targetNumber) {
            this.minRange = guess + 1;
            this.showFeedback(`Too low! Try a number between ${this.minRange} and ${this.maxRange}`, 'warning');
        } else {
            this.maxRange = guess - 1;
            this.showFeedback(`Too high! Try a number between ${this.minRange} and ${this.maxRange}`, 'warning');
        }
        
        this.updateRangeDisplay();
        this.guessInput.value = '';
        this.guessInput.focus();
        
        // Show answer after 5 attempts
        if (this.attempts >= 5) {
            this.showAnswer();
        }
        
        if (this.minRange > this.maxRange) {
            this.showFeedback('Something went wrong! Starting new game...', 'error');
            setTimeout(() => this.newGame(), 2000);
        }
    }
    
    gameWon() {
        this.gameActive = false;
        this.gamesWonCount++;
        
        if (this.bestScore === null || this.attempts < this.bestScore) {
            this.bestScore = this.attempts;
            localStorage.setItem('bestScore', this.bestScore);
        }
        
        localStorage.setItem('gamesWon', this.gamesWonCount);
        
        this.showFeedback(`🎉 Congratulations! You guessed it in ${this.attempts} attempts!`, 'success');
        
        this.guessInput.disabled = true;
        this.guessBtn.disabled = true;
        this.hintBtn.disabled = true;
        
        this.updateStats();
        
        // Confetti effect
        this.createConfetti();
    }
    
    showAnswer() {
        if (!this.gameActive) return;
        
        this.gameActive = false;
        
        this.showFeedback(`💡 The answer was ${this.targetNumber}! Better luck next time!`, 'info');
        
        this.guessInput.disabled = true;
        this.guessBtn.disabled = true;
        this.hintBtn.disabled = true;
        
        // Auto-start new game after 3 seconds
        setTimeout(() => {
            this.newGame();
        }, 3000);
    }
    
    getHint() {
        if (!this.gameActive) return;
        
        const difference = Math.abs(this.targetNumber - parseInt(this.guessInput.value) || 0);
        let hint = '';
        
        if (difference === 0) {
            hint = 'You already guessed it!';
        } else if (difference <= 5) {
            hint = '🔥 Very close!';
        } else if (difference <= 10) {
            hint = '👌 Getting warmer!';
        } else if (difference <= 20) {
            hint = '🌡️ Getting there...';
        } else {
            hint = '❄️ Still quite far!';
        }
        
        this.showFeedback(`💡 Hint: ${hint}`, 'info');
        this.hintBtn.disabled = true;
        
        setTimeout(() => {
            if (this.gameActive) {
                this.hintBtn.disabled = false;
            }
        }, 3000);
    }
    
    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type}`;
    }
    
    updateStats() {
        this.attemptsSpan.textContent = this.attempts;
        this.bestScoreSpan.textContent = this.bestScore || '-';
        this.gamesWonSpan.textContent = this.gamesWonCount;
    }
    
    updateRangeDisplay() {
        this.minRangeSpan.textContent = this.minRange;
        this.maxRangeSpan.textContent = this.maxRange;
        
        const totalRange = this.maxRange - this.minRange + 1;
        const currentRange = this.maxRange - this.minRange + 1;
        const percentage = (currentRange / totalRange) * 100;
        
        this.rangeFill.style.width = `${percentage}%`;
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
    new NumberGuessingGame();
});
