let player = document.getElementById('player');
let coin = document.getElementById('coin');
let bomb = document.getElementById('bomb');
let life = document.getElementById('newLife');
let lifeDisplay = document.getElementById('life');
let scoreElement = document.getElementById('score');

// Score & Vies
let score = 0;
let totalCoin = 0;
let lifeCount = 3;

// Variables pièces
let coinInterval;
let coinSpeed = 10;
let coinIntervalTime = 2000;
let coinAcceleration = 5;
let coinAccelerationInterval = 5;

// Variables bombes
let bombInterval;
let bombSpeed = 30;
let bombIntervalTime = 2000;
let bombAcceleration = 5;
let bombAccelerationInterval = 5;

// Variables vies
let lifeInterval;
let lifeSpeed = 50;

// Variables zone de jeu
let gameInterval;
let gameWidth = document.getElementById('game-container').offsetWidth;
let gameHeight = document.getElementById('game-container').offsetHeight;

// Audio

let coinAudio = false;
let bombAudio = false;
let lifeAudio = false;
if(localStorage.getItem('Audio')=='true'){
  coinAudio = new Audio("./asset/audio/coin_audio.wav");
  bombAudio = new Audio("./asset/audio/bomb-hit.wav");
  lifeAudio = new Audio("./asset/audio/up.mp3");
}

if(!localStorage.getItem('Audio')){
  localStorage.setItem('Audio', 'true');
}
// Première apparition aléatoire
coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
life.style.left = (Math.random() * (gameWidth - 40)) + 'px';
bomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
life.style.display='none'


// __________________________________________________________
// __________________Déplacement du personnage_______________
// __________________________________________________________
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

// __________________________________________________________
// __________________Collision du personnage_________________
// __________________________________________________________

// Colision personnage avec pièce
function checkCollision() {
  let playerRect = player.getBoundingClientRect();
  let coinRect = coin.getBoundingClientRect();

  if (playerRect.left < coinRect.right &&
    playerRect.right > coinRect.left &&
    playerRect.top < coinRect.bottom &&
    playerRect.bottom > coinRect.top) {
      if(coinAudio){
        coinAudio.currentTime = 0;
        coinAudio.play();
      }
    score++;
    totalCoin++;
    coin.style.top = '0px';
    coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    updateScore();
    if (score % 5 === 0 && score <= 35) {
      coinSpeed += coinAcceleration;
      clearInterval(coinInterval);
      coinIntervalTime -= 200;
      startCoinInterval();
    }
  }
}


// Colision personnage avec coeur
function checkCollisionWithLife() {
  let playerRect = player.getBoundingClientRect();
  let lifeRect = life.getBoundingClientRect();

  if (playerRect.left < lifeRect.right &&
    playerRect.right > lifeRect.left &&
    playerRect.top < lifeRect.bottom &&
    playerRect.bottom > lifeRect.top) {
    if(lifeCount<3){
      lifeCount++;
      if(lifeAudio){
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
    }
    life.style.top = '0px';
    life.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    life.style.display = 'none'
  }
}

// Colision personnage avec bombe
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
    if(bombAudio){
      bombAudio.currentTime = 0;
      bombAudio.volume = 0.2;
      bombAudio.play();
    }
    player.classList.add('animatedHit')
    setTimeout(() => {
      player.classList.remove('animatedHit');
    }, 1000);
    if (score % 5 === 0 && score <= 10) {
      bombSpeed += bombAcceleration;
      clearInterval(bombInterval);
      bombIntervalTime -= 200;
      startBombInterval();
    }
  }
}

function updateScore() {
  scoreElement.innerText = 'Score: ' + score + " / " + totalCoin;
}

// __________________________________________________________
// __________________Lancement de la partie__________________
// ____________________________&_____________________________
// _________________________Gameover_________________________
// __________________________________________________________

function startGame() {
  gameInterval = setInterval(function () {
    moveCoins();
    moveLifes();
    checkCollisionWithLife();
    if (score >= 5) {
      moveBombs();
      checkCollisionWithBomb();
      bomb.style.display = "inline"
    }
    checkCollision();
    checkLife();
  }, 50);
  startCoinInterval();
  startLifeInterval();
}

function gameOver() {
  if(localStorage.getItem('bestScore') < score){
    localStorage.setItem('bestScore', score);
  }
  clearInterval(gameInterval);
  clearInterval(bombInterval);
  clearInterval(coinInterval);
  // clearInterval(lifeInterval);
  document.location.href = "./pages/gameover.html";
}

// __________________________________________________________
// __________________Timer d'apparition______________________
// __________________________________________________________

// Timer coeurs
function startLifeInterval() {
  setInterval(function () {
      life.style.top = '0px';
      life.style.left = (Math.random() * (gameWidth - 40)) + 'px';
      life.style.display = 'inline';
  }, getRandomInterval(20000,30000));
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Timer pièces
function startCoinInterval() {
  coinInterval = setInterval(function () {
    moveCoins();
    checkCollision();
  }, coinIntervalTime);
}

// Timer bombes
function startBombInterval() {
  bombInterval = setInterval(function () {
    moveBombs();
  }, bombIntervalTime);
}

// __________________________________________________________
// __________________Mouvement des objets____________________
// __________________________________________________________

// Mouvement des pièces
function moveCoins() {
  let topPosition = parseInt(window.getComputedStyle(coin).getPropertyValue('top'));
  if (topPosition >= gameHeight - 40) {
    coin.style.top = '0px';
    coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    totalCoin++;
    updateScore();
  } else {
    coin.style.top = (topPosition + coinSpeed) + 'px';
  }
}

// Mouvement des coeurs
function moveLifes() {
  let topPosition = parseInt(window.getComputedStyle(life).getPropertyValue('top'));
  if(topPosition >= gameHeight - 40){
    life.style.top = '0px';
    life.style.left = (Math.random() * gameWidth - 40) + 'px';
    life.style.display='none';
  }else{
    life.style.top = (topPosition + lifeSpeed) + 'px';
  }
}

// Mouvement des bombes
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
    lifeDisplay.src = "./asset/images/FullLife.png";
  } else if (lifeCount == 2) {
    lifeDisplay.src = "./asset/images/HalfLife.png";
  } else if (lifeCount == 1) {
    lifeDisplay.src = "./asset/images/LastLife.png";
  } else {
    gameOver();
  }
}

// 

if(!localStorage.getItem('bestScore')){
  localStorage.setItem('bestScore', score);
}