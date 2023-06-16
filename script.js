let player = document.getElementById('player');
let coin = document.getElementById('coin');
let bomb = document.getElementById('bomb');
let scoreElement = document.getElementById('score');
let score = 0;
let gameInterval;
let coinInterval;
let coinSpeed = 10;
let coinIntervalTime = 2000;
let coinAcceleration = 5;
let coinAccelerationInterval = 5;
let bombInterval;
let bombSpeed = 30;
let bombIntervalTime = 2000;
let bombAcceleration = 5;
let bombAccelerationInterval = 5;
let gameWidth = document.getElementById('game-container').offsetWidth;
let gameHeight = document.getElementById('game-container').offsetHeight;
let audio = new Audio("./asset/8d82b5_Super_Mario_Bros_Coin_Sound_Effect.mp3");
let life = document.getElementById('life');
let lifeCount = 3;



coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
let prevMouseX = 0;
function movePlayer(event) {
  let mouseX = event.clientX;
  let playerWidth = player.offsetWidth;
  let playerHalfWidth = playerWidth / 2;


  if (mouseX < prevMouseX) {
    player.style.transform = 'scaleX(-1)';
  } else if (mouseX > prevMouseX) {
    player.style.transform = 'scaleX(1)';
  }


  prevMouseX = mouseX;


  if (mouseX < playerHalfWidth) {
    player.style.left = '0px';
  } else if (mouseX > gameWidth - playerHalfWidth) {
    player.style.left = gameWidth - playerWidth + 'px';
  } else {
    player.style.left = (mouseX - playerHalfWidth) + 'px';
  }
}


function checkCollision() {
  let playerRect = player.getBoundingClientRect();
  let coinRect = coin.getBoundingClientRect();

  if (playerRect.left < coinRect.right &&
    playerRect.right > coinRect.left &&
    playerRect.top < coinRect.bottom &&
    playerRect.bottom > coinRect.top) {
    audio.currentTime = 0;
    audio.play();
    score++;
    coin.style.top = '0px';
    coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    updateScore();

    if (score % 5 === 0 && score <= 35) {
      coinSpeed += coinAcceleration;
      clearInterval(coinInterval);
      coinIntervalTime -= 200;
      startCoinInterval();
    }
  } else if (coinRect.top >= gameHeight - 40) {
    // gameOver();
  }
}

function checkCollisionWithBomb() {
  let playerRect = player.getBoundingClientRect();
  let bombRect = bomb.getBoundingClientRect();

  if (playerRect.left < bombRect.right &&
    playerRect.right > bombRect.left &&
    playerRect.top < bombRect.bottom &&
    playerRect.bottom > bombRect.top) {
    bomb.style.top = '0px';
    bomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    lifeCount-=1;
    player.classList.add('animatedHit')
    setTimeout(() => {
      player.classList.remove('animatedHit');
    }, 1000);
  } else if (bombRect.top >= gameHeight - 40) {
    bomb.style.top = '0px';
    bomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    if (score % 5 === 0 && score <= 10) {
      bombSpeed += bombAcceleration;
      clearInterval(bombInterval);
      bombIntervalTime -= 200;
      startBombInterval();
    }
  }
}

function updateScore() {
  scoreElement.textContent = 'Score: ' + score;
}


function startGame() {
  gameInterval = setInterval(function () {
    moveCoins();
    if (score >= 5) {
      moveBombs();
      checkCollisionWithBomb();
      if (checkCollisionWithBomb) {

      }
      bomb.style.display = "inline"
    } else if (score === 4) {
      bomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    }
    checkCollision();
    checkLife();
  }, 50);
  startCoinInterval();


}


function startCoinInterval() {
  coinInterval = setInterval(function () {
    moveCoins();
    checkCollision();
  }, coinIntervalTime);
}

function startBombInterval() {
  bombInterval = setInterval(function () {
    moveBombs();
    checkCollision();
  }, bombIntervalTime);
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(bombInterval);
  clearInterval(coinInterval);
  document.location.href = "./pages/gameover.html";
}


function moveCoins() {
  let topPosition = parseInt(window.getComputedStyle(coin).getPropertyValue('top'));
  if (topPosition >= gameHeight - 40) {
    coin.style.top = '0px';
    coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
  } else {
    coin.style.top = (topPosition + coinSpeed) + 'px';
  }
}

function moveBombs() {
  let topPosition = parseInt(window.getComputedStyle(bomb).getPropertyValue('top'));
  if (topPosition >= gameHeight - 40) {
    bomb.style.top = '0px';
    bomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
  } else {
    bomb.style.top = (topPosition + bombSpeed) + 'px';
  }
}
document.addEventListener('mousemove', movePlayer);


startGame();

function checkLife(){
  if (lifeCount == 3) {
    life.src = "./asset/FullLife.png";
  } else if (lifeCount == 2) {
    life.src = "./asset/HalfLife.png";
  } else if (lifeCount == 1) {
    life.src = "./asset/LastLife.png";
  } else {
    gameOver();
  }
}