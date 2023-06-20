let player = document.getElementById('player');
let coin = document.getElementById('coin');
let bomb = document.getElementById('bomb');
let moreBomb = document.getElementById('moreBomb');
let life = document.getElementById('newLife');
let lifeDisplay = document.getElementById('life');
let scoreElement = document.getElementById('score');
let bonus = document.getElementById('bonus');
let antiBonus = document.getElementById('antiBonus');
let stalagtite = document.querySelectorAll('.stalagtite');

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

// Variables bombes
let moreBombInterval;
let moreBombSpeed = 30;
let moreBombIntervalTime = 2000;
let moreBombAcceleration = 5;
let moreBombAccelerationInterval = 5;

// Variables bombes
let stalagtiteInterval;
let stalagtiteSpeed = 5;
let stalagtiteIntervalTime = 5000;
let stalagtiteAcceleration = 5;
let stalagtiteAccelerationInterval = 5;

// Variables vies
let lifeInterval;
let lifeSpeed = 50;

// Variables bonus
let bonusInterval;
let bonusSpeed = 30;

// Variables antiBonus
let antiBonusInterval;
let antiBonusSpeed = 30;

// Variables zone de jeu
let gameInterval;
let gameWidth = document.getElementById('game-container').offsetWidth;
let gameHeight = document.getElementById('game-container').offsetHeight;

// Audio
if (!localStorage.getItem('Audio')) {
  localStorage.setItem('Audio', 'true');
}

let coinAudio = false;
let bombAudio = false;
let lifeAudio = false;
let bonusAudio = false;
let antiBonusAudio = false;
// let backgroundAudio = false;
if (localStorage.getItem('Audio') == 'true') {
  coinAudio = new Audio("./asset/audio/coin_audio.wav");
  bombAudio = new Audio("./asset/audio/bomb-hit.wav");
  lifeAudio = new Audio("./asset/audio/up.mp3");
  bonusAudio = new Audio("./asset/audio/bonus.mp3");
  antiBonusAudio = new Audio("./asset/audio/antiBonus.mp3");
  // backgroundAudio = new Audio("./asset/audio/background_music.mp3");
  // if (backgroundAudio.stop()) {
  //   backgroundAudio.play();
  // }
}

// Première apparition aléatoire
coin.style.left = (Math.random() * (gameWidth - 40)) + 'px';
life.style.left = (Math.random() * (gameWidth - 40)) + 'px';
bomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
moreBomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
bonus.style.left = (Math.random() * (gameWidth - 40)) + 'px';
antiBonus.style.left = (Math.random() * (gameWidth - 40)) + 'px';
firstStalagtiteToSpawn = (Math.random() * (gameWidth - 40)) ;
for (let i = 0; i < stalagtite.length; i++) {
  firstStalagtiteToSpawn += 50;
  stalagtite[i].style.left = firstStalagtiteToSpawn + 'px'
  stalagtite[i].style.display = 'none'
}
life.style.display = 'none'
bonus.style.display = 'none'
antiBonus.style.display = 'none'


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
    if (coinAudio) {
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
    if (lifeCount < 3) {
      lifeCount++;
      if (lifeAudio) {
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
    }
    life.style.top = '0px';
    life.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    life.style.display = 'none'
  }
}

// Colision personnage avec Bonus
function checkCollisionWithBonus() {
  let playerRect = player.getBoundingClientRect();
  let bonusRect = bonus.getBoundingClientRect();

  if (playerRect.left < bonusRect.right &&
    playerRect.right > bonusRect.left &&
    playerRect.top < bonusRect.bottom &&
    playerRect.bottom > bonusRect.top) {
    if (bonusAudio) {
      bonusAudio.currentTime = 0;
      bonusAudio.play();
    }
    player.style.height= '100px'
    setTimeout(() => {
      player.style.height= '300px';
    }, 10000);
    bonus.style.top = '0px';
    bonus.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    bonus.style.display = 'none'
  }
}

function checkCollisionWithAntiBonus() {
  let playerRect = player.getBoundingClientRect();
  let antiBonusRect = antiBonus.getBoundingClientRect();

  if (playerRect.left < antiBonusRect.right &&
    playerRect.right > antiBonusRect.left &&
    playerRect.top < antiBonusRect.bottom &&
    playerRect.bottom > antiBonusRect.top) {
    if (antiBonusAudio) {
      antiBonusAudio.currentTime = 0;
      antiBonusAudio.play();
    }
    player.style.height= '400px'
    setTimeout(() => {
      player.style.height= '300px';
    }, 10000);
    antiBonus.style.top = '0px';
    antiBonus.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    antiBonus.style.display = 'none'
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
    lifeCount -= 1;
    if (bombAudio) {
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

function checkCollisionWithStalagtite() {
  let playerRect = player.getBoundingClientRect();
  for (let j = 0; j < stalagtite.length; j++) {
    let stalagtiteRect = stalagtite[j].getBoundingClientRect();

    if (playerRect.left < stalagtiteRect.right &&
      playerRect.right > stalagtiteRect.left &&
      playerRect.top < stalagtiteRect.bottom &&
      playerRect.bottom > stalagtiteRect.top) {
        firstStalagtiteToSpawn = (Math.random() * (gameWidth - 40)) ;
        topStalagtiteToSpawn = 0;
        for (let i = 0; i < stalagtite.length; i++) {
          firstStalagtiteToSpawn += 50;
          topStalagtiteToSpawn += 20;
          stalagtite[i].style.top = topStalagtiteToSpawn + 'px';
          stalagtite[i].style.left = firstStalagtiteToSpawn + 'px'
        }
      lifeCount -= 1;
      // if (stalagtiteAudio) {
      //   stalagtiteAudio.currentTime = 0;
      //   stalagtiteAudio.volume = 0.2;
      //   stalagtiteAudio.play();
      // }
      player.classList.add('animatedHit')
      setTimeout(() => {
        player.classList.remove('animatedHit');
      }, 1000);
    }
  }
}

function checkCollisionWithMoreBomb() {
  let playerRect = player.getBoundingClientRect();
  let moreBombRect = moreBomb.getBoundingClientRect();

  if (playerRect.left < moreBombRect.right &&
    playerRect.right > moreBombRect.left &&
    playerRect.top < moreBombRect.bottom &&
    playerRect.bottom > moreBombRect.top) {
    moreBomb.style.top = '0px';
    moreBomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    lifeCount -= 1;
    if (bombAudio) {
      bombAudio.currentTime = 0;
      bombAudio.volume = 0.2;
      bombAudio.play();
    }
    player.classList.add('animatedHit')
    setTimeout(() => {
      player.classList.remove('animatedHit');
    }, 1000);
    if (score % 5 === 0 && score <= 10) {
      moreBombSpeed += moreBombAcceleration;
      clearInterval(moreBombInterval);
      moreBombIntervalTime -= 200;
      startMoreBombInterval();
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
    moveBonus();
    moveAntiBonus();


    checkCollisionWithBonus();
    checkCollisionWithAntiBonus();
    checkCollisionWithLife();
    if (score >= 5) {
      moveBombs();
      checkCollisionWithBomb();
      bomb.style.display = "inline"
    }
    if (score >= 22) {
      moveMoreBombs();
      checkCollisionWithMoreBomb();
      moreBomb.style.display = "inline"
    }
    if (score >= 40) {
      moveStalagtite();
      checkCollisionWithStalagtite();
      for (let i = 0; i < stalagtite.length; i++) {
        stalagtite[i].style.display= 'inline';
      }
    }
    checkCollision();
    checkLife();
    // if(score + 10 == totalCoin){
    //   gameOver();
    // }
  }, 50);
  startCoinInterval();
  startLifeInterval();
  startBonusInterval();
  // startStalagtiteInterval();
  startAntiBonusInterval();
}

function gameOver() {

  if (localStorage.getItem('bestScore') < score) {
    localStorage.setItem('bestScore', score);
  }
  clearInterval(gameInterval);
  clearInterval(bombInterval);
  clearInterval(coinInterval);
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
  }, getRandomInterval(20000, 30000));
}

// Timer bonus
function startBonusInterval() {
  setInterval(function () {
    bonus.style.top = '0px';
    bonus.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    bonus.style.display = 'inline';
  }, getRandomInterval(30000, 40000));
}

// Timer antiBonus
function startAntiBonusInterval() {
  setInterval(function () {
    antiBonus.style.top = '0px';
    antiBonus.style.left = (Math.random() * (gameWidth - 40)) + 'px';
    antiBonus.style.display = 'inline';
  }, getRandomInterval(40000, 50000));
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

// Timer bombes
function startMoreBombInterval() {
  moreBombInterval = setInterval(function () {
    moveMoreBombs();
  }, moreBombIntervalTime);
}

function startStalagtiteInterval() {
  stalagtiteInterval = setInterval(function () {
    moveStalagtite();
  }, stalagtiteIntervalTime);
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
  if (topPosition >= gameHeight - 40) {
    life.style.top = '0px';
    life.style.left = (Math.random() * gameWidth - 40) + 'px';
    life.style.display = 'none';
  } else {
    life.style.top = (topPosition + lifeSpeed) + 'px';
  }
}

// Mouvement des bonus
function moveBonus() {
  let topPosition = parseInt(window.getComputedStyle(bonus).getPropertyValue('top'));
  if (topPosition >= gameHeight - 40) {
    bonus.style.top = '0px';
    bonus.style.left = (Math.random() * gameWidth - 40) + 'px';
    bonus.style.display = 'none';
  } else {
    bonus.style.top = (topPosition + bonusSpeed) + 'px';
  }
}

// Mouvement des antiBonus
function moveAntiBonus() {
  let topPosition = parseInt(window.getComputedStyle(antiBonus).getPropertyValue('top'));
  if (topPosition >= gameHeight - 40) {
    antiBonus.style.top = '0px';
    antiBonus.style.left = (Math.random() * gameWidth - 40) + 'px';
    antiBonus.style.display = 'none';
  } else {
    antiBonus.style.top = (topPosition + antiBonusSpeed) + 'px';
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

function moveMoreBombs() {
  let topPosition = parseInt(window.getComputedStyle(moreBomb).getPropertyValue('top'));
  if (topPosition >= gameHeight - 40) {
    moreBomb.style.top = '0px';
    moreBomb.style.left = (Math.random() * (gameWidth - 40)) + 'px';
  } else {
    moreBomb.style.top = (topPosition + moreBombSpeed) + 'px';
  }
}
document.addEventListener('mousemove', movePlayer);

function moveStalagtite() {
  for (let i = 0; i < stalagtite.length; i++) {
    stalagtite[i].style.display= 'inline';
  }
  for (let i = 0; i < stalagtite.length; i++) {
    let topPosition= parseInt(window.getComputedStyle(stalagtite[i]).getPropertyValue('top'));
    if (topPosition >= gameHeight - 40) {
      firstStalagtiteToSpawn = (Math.random() * (gameWidth - 40))
      topStalagtiteToSpawn = 0;
      for (let j = 0; j < stalagtite.length; j++) {
        firstStalagtiteToSpawn += 50;
        topStalagtiteToSpawn += 20;
        stalagtite[j].style.top = topStalagtiteToSpawn + 'px';
        stalagtite[j].style.left = firstStalagtiteToSpawn + 'px';
      }
    } else {
      for (let i = 0; i < stalagtite.length; i++) {
        stalagtite[i].style.top = (topPosition + stalagtiteSpeed) + 'px';
      }
    }
  }
}
document.addEventListener('mousemove', movePlayer);


startGame();

function checkLife() {
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

if (!localStorage.getItem('bestScore')) {
  localStorage.setItem('bestScore', score);
}