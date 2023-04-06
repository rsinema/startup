scorePosted = false;

const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player'; 
}

window.onload = function () {
    const playerNameEl = document.querySelector('.player-name');
    playerNameEl.textContent = getPlayerName();
}

function OnePlayer(canvas) {
    document.getElementById('play').removeEventListener('click', clearCanvas);
    const FRAMES_PER_SECOND = 60;
    const FRAME_RATE_ADJUST = 30 / FRAMES_PER_SECOND;

    const WINNING_SCORE = 11;
    const PADDLE_THICKNESS = 10;
    const PADDLE_HEIGHT = 100;
    const COMPUTER_MOVE_SPEED = 6 * FRAME_RATE_ADJUST;

    this.canvas = canvas;

    var canvasContext = canvas.getContext('2d');

    var ballX = 100 , ballY = 100;
    var ballSpeedX = 10 * FRAME_RATE_ADJUST, ballSpeedY = 4 * FRAME_RATE_ADJUST;
    var player1Score = 0, player2Score = 0;
    var paddle1Y = 250, paddle2Y = 250;
    var showingWinScreen = false;

    // analytics
    var startTime = new Date().getTime();
    var totalFramesRendered = 0;
    var avgFrameRate = 0;

    setInterval(function () {
        moveEverything();
        drawEverything();
        // analytics
        totalFramesRendered ++;
        avgFrameRate = Math.round(totalFramesRendered / ((new Date().getTime() - startTime) / 1000) * 10) / 10.0;
        canvasContext.font = "10px monospace";
        canvasContext.fillText(avgFrameRate + 'fps', canvas.width - 50, 10);
    }, 1000 / FRAMES_PER_SECOND);

    var timer;

    document.addEventListener('keydown', (e) => {
        if (e.code === "KeyW") {
            paddle1MoveUpSetting()
        }
        else if (e.code === "KeyS") {
            paddle1MoveDownSetting()
        }});

    document.addEventListener('keyup', (e) => {
        if (e.code === "KeyW") {
            paddle1Stop()
        } else if (e.code === "KeyS") {
            paddle1Stop()
        }});
    
    function paddle1MoveUp() {
        if (paddle1Y > 0) {
            paddle1Y -= COMPUTER_MOVE_SPEED;
        }
    };

    function paddle1MoveDown() {
        if (paddle1Y < canvas.height - 100) {
            paddle1Y += COMPUTER_MOVE_SPEED;
            //console.log(paddle1Y + ' :: paddle1')
        }
    };
        
    function paddle1MoveUpSetting() {
    if(timer) return;
    timer= setInterval(paddle1MoveUp, 8);
    };

    function paddle1MoveDownSetting() {
        if(timer) return;
        timer= setInterval(paddle1MoveDown, 8);
        };
    
    function paddle1Stop() {
    clearInterval(timer);
    timer= null;
    };

    /**
     * Restart the ball from the center of the screen
     */
    function ballReset() {
        if (player1Score >= WINNING_SCORE ||
                player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
        }

        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    };

    /**
     * Move the computer player's paddle
     */
    function computerMovement() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
        if (paddle2YCenter < ballY - 35) {
            paddle2Y = paddle2Y + COMPUTER_MOVE_SPEED;
        } else if (paddle2YCenter > ballY + 35) {
            paddle2Y = paddle2Y - COMPUTER_MOVE_SPEED;
        }
    }

    function moveEverything() {
        if (showingWinScreen) {
            return;
        }
        computerMovement();

        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;

        if (ballX < PADDLE_THICKNESS &&
                ballY > paddle1Y &&
                ballY < paddle1Y + PADDLE_HEIGHT) {
            // hit the left paddle
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35 * FRAME_RATE_ADJUST;
        } else if (ballX < 0){
            // went off
            player2Score++; // must be BEFORE ballReset()
            ballReset();
        }
        
        if (ballX > canvas.width - PADDLE_THICKNESS &&
                ballY > paddle2Y &&
                ballY < paddle2Y + PADDLE_HEIGHT) {
            // hit the right paddle
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35 * FRAME_RATE_ADJUST;
        } else if (ballX > canvas.width) {
            // went off
            player1Score++; // must be BEFORE ballReset()
            ballReset();
        }

        if (ballY < 0) {
            // hit the top wall
            ballSpeedY = -ballSpeedY;
        }
        if (ballY > canvas.height) {
            // hit the bottom wall
            ballSpeedY = -ballSpeedY;
        }
    }

    function drawNet() {
        for (var i = 0; i < canvas.height; i += 40) {
            colorRect(canvas.width / 2 - 1, i, 2, 20, '#588157');
        }
    }

    function drawEverything() {
        // next line blanks out the screen with black
        colorRect(0, 0, canvas.width, canvas.height, '#DAD7CD');

        if (showingWinScreen) {
            document.getElementById('play').addEventListener('click', clearCanvas);
            canvasContext.fillStyle = '#588157';
            canvasContext.font = "25px monospace";
            canvasContext.textAlign = 'center';
            if (player1Score >= WINNING_SCORE) {
                canvasContext.fillText("Left Player Won", canvas.width / 2, 200);
            } else if (player2Score >= WINNING_SCORE) {
                canvasContext.fillText("Right Player Won", canvas.width / 2, 200);
            }

            canvasContext.fillText("click a button to start a new game", canvas.width / 2, 500);
            return;
        }

        drawNet();

        // this is left player paddle
        colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, '#588157');

        // this is right computer paddle
        colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, '#588157');

        // next line draws the ball
        colorCircle(ballX, ballY, 10, '#344E41');

        canvasContext.font = "20px monospace";
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }

    function colorCircle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
}

function TwoPlayer(canvas) {
    document.getElementById('play').removeEventListener('click', clearCanvas);
    const FRAMES_PER_SECOND = 60;
    const FRAME_RATE_ADJUST = 30 / FRAMES_PER_SECOND;

    const WINNING_SCORE = 11;
    const PADDLE_THICKNESS = 10;
    const PADDLE_HEIGHT = 100;
    const COMPUTER_MOVE_SPEED = 6 * FRAME_RATE_ADJUST;

    this.canvas = canvas;

    var canvasContext = canvas.getContext('2d');

    var ballX = 100 , ballY = 100;
    var ballSpeedX = 10 * FRAME_RATE_ADJUST, ballSpeedY = 4 * FRAME_RATE_ADJUST;
    var player1Score = 0, player2Score = 0;
    var paddle1Y = 250, paddle2Y = 250;
    var showingWinScreen = false;

    // analytics
    var startTime = new Date().getTime();
    var totalFramesRendered = 0;
    var avgFrameRate = 0;

    setInterval(function () {
        moveEverything();
        drawEverything();
        // analytics
        totalFramesRendered ++;
        avgFrameRate = Math.round(totalFramesRendered / ((new Date().getTime() - startTime) / 1000) * 10) / 10.0;
        canvasContext.font = "10px monospace";
        canvasContext.fillText(avgFrameRate + 'fps', canvas.width - 50, 10);
    }, 1000 / FRAMES_PER_SECOND);

    let keysPressed = {};

    //paddle movement
    document.addEventListener('keydown', (e) => {
        keysPressed[e.code] = true;

        if (keysPressed["KeyP"] && keysPressed["KeyW"]) {
            paddle1MoveUpSetting()
            paddle2MoveUpSetting()
        }
        else if (keysPressed["Semicolon"] && keysPressed["KeyS"]) {
            paddle1MoveDownSetting()
            paddle2MoveDownSetting()
        }
        else if (keysPressed["KeyW"] && keysPressed["KeyP"]) {
            paddle1MoveUpSetting()
            paddle2MoveUpSetting()
        }
        else if (keysPressed["KeyS"] && keysPressed["Semicolon"]) {
            paddle1MoveDownSetting()
            paddle2MoveDownSetting()
        }
        else if (keysPressed["KeyW"] && keysPressed["Semicolon"]) {
            paddle1MoveUpSetting()
            paddle2MoveDownSetting()
        }
        else if (keysPressed["KeyS"] && keysPressed["KeyP"]) {
            paddle1MoveDownSetting()
            paddle2MoveUpSetting()
        }
        else if (keysPressed["Semicolon"] && keysPressed["KeyW"]) {
            paddle2MoveDownSetting()
            paddle1MoveUpSetting()
        }
        else if (keysPressed["KeyP"] && keysPressed["KeyS"]) {
            paddle2MoveUpSetting()
            paddle1MoveDownSetting()
        }
        else if (keysPressed["KeyP"]) {
            paddle2MoveUpSetting()
        }
        else if (keysPressed["Semicolon"]) {
            paddle2MoveDownSetting()
        }
        else if (keysPressed["KeyW"]) {
            paddle1MoveUpSetting()
        }
        else if (keysPressed["KeyS"]) {
            paddle1MoveDownSetting()
        }});

    document.addEventListener('keyup', (e) => {
        if (e.code === "KeyW") {
            delete keysPressed[e.code]
            paddle1Stop()
        } 
        else if (e.code === "KeyS") {
            delete keysPressed[e.code]
            paddle1Stop()
        }
        else if (e.code === "KeyP") {
            delete keysPressed[e.code]
            paddle2Stop()
        }
        else if (e.code === "Semicolon") {
            delete keysPressed[e.code]
            paddle2Stop()
        }});
    
        var timer1;
    //first player movement
    function paddle1MoveUp() {
        if (paddle1Y > 0) {
            paddle1Y -= COMPUTER_MOVE_SPEED;
        }
    };

    function paddle1MoveDown() {
        if (paddle1Y < canvas.height - 100) {
            paddle1Y += COMPUTER_MOVE_SPEED;
        }
    };
        
    function paddle1MoveUpSetting() {
    if(timer1) return;
    timer1= setInterval(paddle1MoveUp, 8);
    };

    function paddle1MoveDownSetting() {
        if(timer1) return;
        timer1= setInterval(paddle1MoveDown, 8);
        };
    
    function paddle1Stop() {
    clearInterval(timer1);
    timer1= null;
    };

    var timer2;
    //second player movement
    function paddle2MoveUp() {
        if (paddle2Y > 0) {
            paddle2Y -= COMPUTER_MOVE_SPEED;
        }
    };

    function paddle2MoveDown() {
        if (paddle2Y < canvas.height - 100) {
            paddle2Y += COMPUTER_MOVE_SPEED;
        }
    };
        
    function paddle2MoveUpSetting() {
    if(timer2) return;
    timer2= setInterval(paddle2MoveUp, 8);
    };

    function paddle2MoveDownSetting() {
        if(timer2) return;
        timer2= setInterval(paddle2MoveDown, 8);
        };
    
    function paddle2Stop() {
    clearInterval(timer2);
    timer2= null;
    };

    /**
     * Restart the ball from the center of the screen
     */
    function ballReset() {
        if (player1Score >= WINNING_SCORE ||
                player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
        }

        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    function moveEverything() {
        if (showingWinScreen) {
            return;
        }

        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;

        if (ballX < PADDLE_THICKNESS &&
                ballY > paddle1Y &&
                ballY < paddle1Y + PADDLE_HEIGHT) {
            // hit the left paddle
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35 * FRAME_RATE_ADJUST;
        } else if (ballX < 0){
            // went off
            player2Score++; // must be BEFORE ballReset()
            ballReset();
        }
        
        if (ballX > canvas.width - PADDLE_THICKNESS &&
                ballY > paddle2Y &&
                ballY < paddle2Y + PADDLE_HEIGHT) {
            // hit the right paddle
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35 * FRAME_RATE_ADJUST;
        } else if (ballX > canvas.width) {
            // went off
            player1Score++; // must be BEFORE ballReset()
            ballReset();
        }

        if (ballY < 0) {
            // hit the top wall
            ballSpeedY = -ballSpeedY;
        }
        if (ballY > canvas.height) {
            // hit the bottom wall
            ballSpeedY = -ballSpeedY;
        }
    }

    function drawNet() {
        for (var i = 0; i < canvas.height; i += 40) {
            colorRect(canvas.width / 2 - 1, i, 2, 20, '#588157');
        }
    }

    function drawEverything() {
        // next line blanks out the screen with black
        colorRect(0, 0, canvas.width, canvas.height, '#DAD7CD');

        if (showingWinScreen) {
            document.getElementById('play').addEventListener('click', clearCanvas);
            canvasContext.fillStyle = '#588157';
            canvasContext.font = "25px monospace";
            canvasContext.textAlign = 'center';
            if (player1Score >= WINNING_SCORE) {
                canvasContext.fillText("Left Player Won", canvas.width / 2, 200);
            } else if (player2Score >= WINNING_SCORE) {
                canvasContext.fillText("Right Player Won", canvas.width / 2, 200);
            }

            canvasContext.fillText("click a button to start a new game", canvas.width / 2, 500);
            return;
        }

        drawNet();

        // this is left player paddle
        colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, '#588157');

        // this is right computer paddle
        colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, '#588157');

        // next line draws the ball
        colorCircle(ballX, ballY, 10, '#344E41');

        canvasContext.font = "20px monospace";
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }

    function colorCircle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
}

function OnePlayerInfinite(canvas) {
    document.getElementById('play').removeEventListener('click', clearCanvas);
    const FRAMES_PER_SECOND = 60;
    const FRAME_RATE_ADJUST = 30 / FRAMES_PER_SECOND;

    const PLAYER_LIVES = 3;
    const PADDLE_THICKNESS = 10;
    const PADDLE_HEIGHT = 100;
    const COMPUTER_MOVE_SPEED = 6 * FRAME_RATE_ADJUST;

    this.canvas = canvas;

    var canvasContext = canvas.getContext('2d');

    var ballX = 100 , ballY = 100;
    var ballSpeedX = 10 * FRAME_RATE_ADJUST, ballSpeedY = 4 * FRAME_RATE_ADJUST;
    var player1Score = PLAYER_LIVES, player2Score = 0;
    var paddle1Y = 250, paddle2Y = 250;
    var showingWinScreen = false;

    // analytics
    var startTime = new Date().getTime();
    var totalFramesRendered = 0;
    var avgFrameRate = 0;

    setInterval(function () {
        moveEverything();
        drawEverything();
        // analytics
        totalFramesRendered ++;
        avgFrameRate = Math.round(totalFramesRendered / ((new Date().getTime() - startTime) / 1000) * 10) / 10.0;
        canvasContext.font = "10px monospace";
        canvasContext.fillText(avgFrameRate + 'fps', canvas.width - 50, 10);
    }, 1000 / FRAMES_PER_SECOND);

    var timer;

    document.addEventListener('keydown', (e) => {
        if (e.code === "KeyW") {
            paddle1MoveUpSetting()
        }
        else if (e.code === "KeyS") {
            paddle1MoveDownSetting()
        }});

    document.addEventListener('keyup', (e) => {
        if (e.code === "KeyW") {
            paddle1Stop()
        } else if (e.code === "KeyS") {
            paddle1Stop()
        }});
    
    function paddle1MoveUp() {
        if (paddle1Y > 0) {
            paddle1Y -= COMPUTER_MOVE_SPEED;
        }
    };

    function paddle1MoveDown() {
        if (paddle1Y < canvas.height - 100) {
            paddle1Y += COMPUTER_MOVE_SPEED;
            //console.log(paddle1Y + ' :: paddle1')
        }
    };
        
    function paddle1MoveUpSetting() {
    if(timer) return;
    timer= setInterval(paddle1MoveUp, 8);
    };

    function paddle1MoveDownSetting() {
        if(timer) return;
        timer= setInterval(paddle1MoveDown, 8);
        };
    
    function paddle1Stop() {
    clearInterval(timer);
    timer= null;
    };
    
    function resetGame(evt) {
        console.log('button clicked')
        if (showingWinScreen) {
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;
        }
    };

    /**
     * Restart the ball from the center of the screen
     */
    function ballReset() {
        if (player1Score == 0) {
            showingWinScreen = true;
        }

        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    };

    /**
     * Move the computer player's paddle
     */
    function computerMovement() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
        if (paddle2YCenter < ballY - 35) {
            paddle2Y = paddle2Y + COMPUTER_MOVE_SPEED;
        } else if (paddle2YCenter > ballY + 35) {
            paddle2Y = paddle2Y - COMPUTER_MOVE_SPEED;
        }
    }

    function moveEverything() {
        if (showingWinScreen) {
            return;
        }
        computerMovement();

        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;

        if (ballX < PADDLE_THICKNESS &&
                ballY > paddle1Y &&
                ballY < paddle1Y + PADDLE_HEIGHT) {
            // hit the left paddle
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35 * FRAME_RATE_ADJUST;
        } else if (ballX < 0){
            // went off
            player1Score--; // must be BEFORE ballReset()
            ballReset();
        }
        
        if (ballX > canvas.width - PADDLE_THICKNESS &&
                ballY > paddle2Y &&
                ballY < paddle2Y + PADDLE_HEIGHT) {
            // hit the right paddle
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35 * FRAME_RATE_ADJUST;
        } else if (ballX > canvas.width) {
            // went off
            player2Score++; // must be BEFORE ballReset()
            ballReset();
        }

        if (ballY < 0) {
            // hit the top wall
            ballSpeedY = -ballSpeedY;
        }
        if (ballY > canvas.height) {
            // hit the bottom wall
            ballSpeedY = -ballSpeedY;
        }
    }

    function drawNet() {
        for (var i = 0; i < canvas.height; i += 40) {
            colorRect(canvas.width / 2 - 1, i, 2, 20, '#588157');
        }
    }

    function drawEverything() {
        // next line blanks out the screen with black
        colorRect(0, 0, canvas.width, canvas.height, '#DAD7CD');

        if (showingWinScreen) {
            document.getElementById('play').addEventListener('click', clearCanvas);

            saveScore(player2Score);
            console.log('end of game')
            canvasContext.fillStyle = '#588157';
            canvasContext.font = "25px monospace";
            canvasContext.textAlign = 'center';
            canvasContext.fillText("You scored " + player2Score + " points", canvas.width / 2, 200);

            canvasContext.fillText("click a button to start a new game", canvas.width / 2, 500);
            return;
        }

        drawNet();

        // this is left player paddle
        colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, '#588157');

        // this is right computer paddle
        colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, '#588157');

        // next line draws the ball
        colorCircle(ballX, ballY, 10, '#344E41');

        canvasContext.font = "20px monospace";
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }

    function colorCircle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
}

configureWebSocket();
document.getElementById('play').addEventListener('click', clearCanvas);
pong = null

function startGame() {
    canvas = document.getElementById('gameCanvas');
    if (document.getElementById("1PlayerRadio").checked) {
        pong = new OnePlayer(canvas);
    } else if (document.getElementById("2PlayerRadio").checked) {
        pong = new TwoPlayer(canvas);
    } else if (document.getElementById("Infinite1PLayerRadio").checked) {
        pong = new OnePlayerInfinite(canvas);
        this.broadcastEvent(this.getPlayerName(), GameStartEvent, {})
    }
}

function clearCanvas() {
    document.getElementById('play').removeEventListener('click', clearCanvas);
    scorePosted = false;
    console.log('clear canvas')
    delete pong;
    const gameDiv = document.getElementById('gameDiv');
    gameDiv.innerHTML = '';
    gameDiv.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    startGame()
}

async function saveScore(score) {
    if (scorePosted === false) {
        scorePosted = true;
        console.log('saveScore')
        const userName = this.getPlayerName();
        const date = new Date().toLocaleDateString();
        const newScore = { name: userName, score: score, date: date };

        this.broadcastEvent(userName, GameEndEvent, newScore);

        try {
            console.log('try')
            const response = await fetch('/api/score', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newScore),
        });

        // Store what the service gave us as the high scores
        const scores = await response.json();
        localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
            console.log('catch')
        // If there was an error then just track scores locally
        this.updateScoresLocal(newScore);
        }
    }
} //*/

function updateScoresLocal(userName, score, scores) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    return scores;
}

async function configureWebSocket() {
    console.log('configure')
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
        this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
        this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === GameEndEvent) {
        this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
        } else if (msg.type === GameStartEvent) {
        this.displayMsg('player', msg.from, `started a new game`);
        }
    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
        `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    console.log('broadcast')
    this.socket.send(JSON.stringify(event));
}