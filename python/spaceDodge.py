from flask import Flask, render_template_string

# PLEASE INSTALL FLASK BEFORE RUNNING THIS CODE
# pip install flask

app = Flask(__name__)


HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Dodge Game</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(to bottom, #0a0e27, #1a1a2e);
            font-family: 'Arial', sans-serif;
            color: white;
        }
        #gameContainer {
            text-align: center;
        }
        canvas {
            border: 3px solid #4a5568;
            box-shadow: 0 0 20px rgba(74, 85, 104, 0.5);
            background: #000;
        }
        h1 {
            margin-bottom: 10px;
            color: #fff;
            text-shadow: 0 0 10px #4299e1;
        }
        .info {
            margin-top: 10px;
            color: #a0aec0;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <h1>🚀 Space Dodge 🚀</h1>
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div class="info">
            Use Arrow Keys to move • Collect green power-ups for shields • Press SPACE to restart
        </div>
    </div>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        class Player {
            constructor() {
                this.size = 30;
                this.x = WIDTH / 2;
                this.y = HEIGHT - 80;
                this.speed = 7;
                this.shield = false;
                this.shieldTime = 0;
            }

            move(keys) {
                if (keys.ArrowLeft && this.x > this.size) this.x -= this.speed;
                if (keys.ArrowRight && this.x < WIDTH - this.size) this.x += this.speed;
                if (keys.ArrowUp && this.y > this.size) this.y -= this.speed;
                if (keys.ArrowDown && this.y < HEIGHT - this.size) this.y += this.speed;
            }

            draw() {
                const color = this.shield ? '#ffff33' : '#3296ff';
                
                // Draw spaceship
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.size);
                ctx.lineTo(this.x - this.size, this.y + this.size);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.closePath();
                ctx.fill();

                // Draw shield
                if (this.shield) {
                    ctx.strokeStyle = '#ffff33';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size + 10, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            update() {
                if (this.shield) {
                    this.shieldTime--;
                    if (this.shieldTime <= 0) this.shield = false;
                }
            }
        }

        class Asteroid {
            constructor() {
                this.size = Math.random() * 25 + 15;
                this.x = Math.random() * (WIDTH - this.size * 2) + this.size;
                this.y = -this.size;
                this.speed = Math.random() * 4 + 3;
            }

            move() {
                this.y += this.speed;
            }

            draw() {
                ctx.fillStyle = '#ff3232';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            offScreen() {
                return this.y > HEIGHT + this.size;
            }
        }

        class PowerUp {
            constructor() {
                this.size = 20;
                this.x = Math.random() * (WIDTH - this.size * 2) + this.size;
                this.y = -this.size;
                this.speed = 3;
            }

            move() {
                this.y += this.speed;
            }

            draw() {
                ctx.fillStyle = '#32ff32';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            offScreen() {
                return this.y > HEIGHT + this.size;
            }
        }

        function checkCollision(player, obj) {
            const dist = Math.sqrt((player.x - obj.x) ** 2 + (player.y - obj.y) ** 2);
            return dist < player.size + obj.size;
        }

        function drawStars(time) {
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 50; i++) {
                const x = (i * 123) % WIDTH;
                const y = (i * 456 + time / 20) % HEIGHT;
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let player = new Player();
        let asteroids = [];
        let powerups = [];
        let score = 0;
        let gameOver = false;
        let spawnTimer = 0;
        let powerupTimer = 0;
        let keys = {};
        let startTime = Date.now();

        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            if (e.key === ' ' && gameOver) {
                // Restart game
                player = new Player();
                asteroids = [];
                powerups = [];
                score = 0;
                gameOver = false;
                spawnTimer = 0;
                powerupTimer = 0;
                startTime = Date.now();
            }
            e.preventDefault();
        });

        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });

        function gameLoop() {
            const currentTime = Date.now() - startTime;
            
            // Clear canvas
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            // Draw stars
            drawStars(currentTime);

            if (!gameOver) {
                player.move(keys);
                player.update();

                // Spawn asteroids
                spawnTimer++;
                if (spawnTimer > Math.max(20, 60 - Math.floor(score / 10))) {
                    asteroids.push(new Asteroid());
                    spawnTimer = 0;
                }

                // Spawn powerups
                powerupTimer++;
                if (powerupTimer > 300) {
                    powerups.push(new PowerUp());
                    powerupTimer = 0;
                }

                // Update asteroids
                for (let i = asteroids.length - 1; i >= 0; i--) {
                    asteroids[i].move();
                    if (asteroids[i].offScreen()) {
                        asteroids.splice(i, 1);
                        score++;
                    } else if (checkCollision(player, asteroids[i])) {
                        if (!player.shield) {
                            gameOver = true;
                        } else {
                            asteroids.splice(i, 1);
                        }
                    }
                }

                // Update powerups
                for (let i = powerups.length - 1; i >= 0; i--) {
                    powerups[i].move();
                    if (powerups[i].offScreen()) {
                        powerups.splice(i, 1);
                    } else if (checkCollision(player, powerups[i])) {
                        powerups.splice(i, 1);
                        player.shield = true;
                        player.shieldTime = 180;
                        score += 5;
                    }
                }
            }

            // Draw everything
            player.draw();
            asteroids.forEach(a => a.draw());
            powerups.forEach(p => p.draw());

            // Draw score
            ctx.fillStyle = '#ffffff';
            ctx.font = '32px Arial';
            ctx.fillText(`Score: ${score}`, 10, 40);

            if (gameOver) {
                ctx.fillStyle = '#ff3232';
                ctx.font = '64px Arial';
                ctx.fillText('GAME OVER!', WIDTH / 2 - 200, HEIGHT / 2 - 50);
                
                ctx.fillStyle = '#ffffff';
                ctx.font = '32px Arial';
                ctx.fillText(`Final Score: ${score}`, WIDTH / 2 - 110, HEIGHT / 2 + 20);
                ctx.fillText('Press SPACE to restart', WIDTH / 2 - 150, HEIGHT / 2 + 80);
            }

            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)