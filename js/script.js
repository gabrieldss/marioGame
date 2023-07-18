const game = document.querySelector('.mario-game');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const audio = document.getElementById('mario-music');
const gameOverAudio = document.getElementById('game-over-music');
let count = 0;
let marioJumped = true;
let pipeJumped = false;

function gamePlay() {
    window.location.reload();
}

function musicControll(btn) {
    if (audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
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
    audio.pause();
    gameOverAudio.play();
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
        scoreValueElement.textContent = 'Score: ' +  count.toString();
    }
}, 10)

document.addEventListener('keydown', jump);
document.addEventListener('mousedown', jump);

