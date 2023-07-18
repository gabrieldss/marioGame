const game = document.querySelector('.mario-game');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const audio = document.getElementById('mario-music');
const bntStart = document.querySelector('.btn-start');
const bntMusic = document.querySelector('.btn-music');
const gameOverAudio = document.getElementById('game-over-music');
const pauseMessage = document.createElement('div');
let count = 0;
let marioJumped = true;
let pipeJumped = false;
let audioPaused = true;

function gamePlay() {
    window.location.reload();
}

function gameStart(btn) {
    if (pipe.style.animationPlayState == "paused") {
        clouds.style.animationPlayState = "running";
        pipe.style.animationPlayState = "running";
        audio.play();
        audioPaused = false;
        bntMusic.disabled = false;
        pauseMessage.remove();
    }
    else {
        clouds.style.animationPlayState = "paused";
        pipe.style.animationPlayState = "paused";
        audio.pause();
        audioPaused = true;
        bntMusic.disabled = true;
        showPauseMessage();
    }
    btn.blur();
}

function musicControll(btn) {
    if (audio.paused) {
        audio.play();
        audioPaused = false;
    }
    else {
        audio.pause();
        audioPaused = true;
    }
    btn.blur();
}

function jump(event) {
    if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 13) {
        console.log(pipe.offsetLeft)
        mario.classList.add('jump');
        setTimeout(function () {
            mario.classList.remove('jump');
            pipeJumped = false;
            marioJumped = true;
        }, 500);
    }
}

function showPauseMessage() {
    document.body.appendChild(pauseMessage);
    pauseMessage.textContent = "Game Paused"
    pauseMessage.style.color = 'red'
    pauseMessage.style.fontSize = '80px'
    pauseMessage.style.position = "absolute";
    pauseMessage.style.top = "40%";
    pauseMessage.style.left = "40%";
}

function showGameOverMessage() {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = "Game Over"
    document.body.appendChild(gameOverMessage);
    gameOverMessage.style.color = 'red'
    gameOverMessage.style.fontSize = '100px'
    gameOverMessage.style.position = "absolute";
    gameOverMessage.style.top = "40%";
    gameOverMessage.style.left = "40%";
    clouds.style.animationPlayState = "paused";
    bntMusic.disabled = true;
    audio.pause();
    bntStart.disabled = true;
    if (!audioPaused) {
        gameOverAudio.play();
    }
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
        mario.style.width = '75px';
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

document.addEventListener('keydown', jump);
document.addEventListener('mousedown', jump);