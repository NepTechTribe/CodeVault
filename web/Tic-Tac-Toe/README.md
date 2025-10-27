# Tic-Tac-Toe Game

A modern, interactive Tic-Tac-Toe game with both Player vs Player and Player vs AI modes.

## Features

- **Two Game Modes**: 
  - 👥 Player vs Player (classic multiplayer)
  - 🤖 Player vs AI (challenge the computer)
- **Smart AI Opponent**: Uses strategic AI that tries to win, block, and take optimal positions
- **Score Tracking**: Persistent score tracking for both players
- **Visual Feedback**: 
  - Winning line animation
  - Confetti celebration
  - Current player highlighting
- **Game Statistics**: Track games played, wins, and draws
- **Responsive Design**: Works on desktop and mobile devices

## How to Play

1. Open `index.html` in your web browser
2. Choose your game mode (Player vs Player or Player vs AI)
3. Click on any empty cell to place your symbol
4. Get three in a row (horizontal, vertical, or diagonal) to win
5. Click "New Game" to start over

## Game Modes

### Player vs Player
- Classic two-player game
- Take turns placing ❌ and ⭕
- Perfect for playing with friends

### Player vs AI
- Challenge the computer
- AI uses smart strategy:
  1. Try to win if possible
  2. Block opponent's winning moves
  3. Take center position
  4. Take corners
  5. Take edges
- Great for solo practice

## Visual Features

- **Winning Line**: Animated line shows the winning combination
- **Confetti**: Celebration animation when someone wins
- **Current Player**: Highlighted player indicator
- **Smooth Animations**: Cell pop-in effects and hover states
- **Score Display**: Live score tracking for both players

## AI Strategy

The AI opponent uses a strategic approach:
1. **Win**: If it can win in the next move, it will
2. **Block**: If the player can win next turn, AI blocks it
3. **Center**: Takes the center square if available
4. **Corners**: Prioritizes corner positions
5. **Edges**: Fills remaining edge positions

## Technical Features

- **Local Storage**: Saves scores and statistics
- **Responsive Grid**: Adapts to different screen sizes
- **Modern UI**: Beautiful gradients and animations
- **Accessibility**: Clear visual indicators and smooth interactions
- **Mobile Friendly**: Touch-friendly interface

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Perfect for quick games, brain training, or teaching kids strategy! 🎮

