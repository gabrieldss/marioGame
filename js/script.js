const game = document.querySelector('.mario-game');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const audio = document.getElementById('mario-music');
const btnPause = document.querySelector('.btn-pause');
const btnMusic = document.querySelector('.btn-music');
const gameOverAudio = document.getElementById('game-over-music');
const pauseMessage = document.createElement('div');
let count = 0;
let marioJumped = true;
let pipeJumped = false;
let gamePaused = false;
let audioPaused = true;
let isGameOver = false;

function newGame() {
    window.location.reload();
}

function pauseGame() {
    if (!isGameOver) {
        if (pipe.style.animationPlayState == "paused") {
            clouds.style.animationPlayState = "running";
            pipe.style.animationPlayState = "running";
            audio.play();
            gamePaused = false;
            audioPaused = false;
            btnMusic.disabled = false;
            pauseMessage.remove();
        }
        else {
            clouds.style.animationPlayState = "paused";
            pipe.style.animationPlayState = "paused";
            audio.pause();
            gamePaused = true;
            audioPaused = true;
            btnMusic.disabled = true;
            showPauseMessage();
        }
        btnPause.blur();
    }
}

function musicControll() {
    if (!gamePaused && !isGameOver) {
        if (audio.paused) {
            audio.play();
            audioPaused = false;
        }
        else {
            audio.pause();
            audioPaused = true;
        }
        btnMusic.blur();
    }
}

function shortCuts(event) {
    if (!gamePaused && (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 13)) {
        mario.classList.add('jump');
        setTimeout(function () {
            mario.classList.remove('jump');
            pipeJumped = false;
            marioJumped = true;
        }, 500);
    }
    if (event.keyCode === 77) {
        musicControll();
    }
    if (event.keyCode === 78) {
        newGame();
    }
    if (event.keyCode === 80) {
        pauseGame();
    }
}

function showPauseMessage() {
    document.body.appendChild(pauseMessage);
    pauseMessage.textContent = "Game Paused"
    pauseMessage.style.color = 'red'
    pauseMessage.style.fontSize = '80px'
    pauseMessage.style.position = "absolute";
    pauseMessage.style.top = "40%";
    pauseMessage.style.left = "35%";
}

function showGameOverMessage() {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = "Game Over"
    document.body.appendChild(gameOverMessage);
    gameOverMessage.style.color = 'red'
    gameOverMessage.style.fontSize = '100px'
    gameOverMessage.style.position = "absolute";
    gameOverMessage.style.top = "40%";
    gameOverMessage.style.left = "35%";
    clouds.style.animationPlayState = "paused";
    btnMusic.disabled = true;
    audio.pause();
    btnPause.disabled = true;
    if (!audioPaused) {
        gameOverAudio.play();
    }
    isGameOver = true;
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        pipe.style.left = `${marioPosition}px`;
        mario.src = './images/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '30px';
        mario.style.zIndex = '999';
        clearInterval(loop);
        showGameOverMessage();
    }
    else if (marioJumped && !pipeJumped && pipe.offsetLeft <= 0) {
        count++;
        pipeJumped = true;
        const scoreValueElement = document.getElementById('score-value');
        scoreValueElement.textContent = 'Score: ' + count.toString();
    }
}, 10)

document.addEventListener('keydown', shortCuts);
