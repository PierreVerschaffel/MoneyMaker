
let credit = localStorage.getItem("Bank");

// Déclaration de mes buttons d'achat

let firstBtn = document.querySelector('#btn-1');
let secondBtn = document.querySelector('#btn-2');
let thirdBtn = document.querySelector('#btn-3');
let forthBtn = document.querySelector('#btn-4');

// Déclaration du solde

let solde = document.querySelector('#bank');

solde.innerText = "Votre solde : " + credit;

// Variable de contrôle

let firstButtonClicked = false;
let secondButtonClicked = false;
let thirdButtonClicked = false;
let forthButtonClicked = false;

// Pièce bleu
function blueCoin() {
    if (localStorage.getItem('coin') === 'blue') {
        firstBtn.innerText = 'équiper';
        localStorage.setItem('coin', 'disable');
    } else if (localStorage.getItem('coin') === "disable") {
        firstBtn.innerText = 'déséquiper';
        localStorage.setItem('coin', 'blue');
    } else if (!localStorage.getItem('coin')) {
        if (credit >= 100) {
            credit = credit - 100;
            localStorage.setItem('coin', 'blue');
            localStorage.setItem('Bank', credit);
            solde.innerText = "Votre solde : " + credit;
            firstBtn.innerText = 'déséquiper';
        }
    }
}

if(localStorage.getItem('coin')==='disable'){
    firstBtn.innerText="équiper";
}else if(localStorage.getItem('coin')==='blue'){
    firstBtn.innerText='déséquiper';
}

firstBtn.addEventListener('click', blueCoin);

// Skin bleu

function blueSkin() {
    if (localStorage.getItem('skin') === 'blue') {
        secondBtn.innerText = 'équiper';
        localStorage.setItem('skin', 'disable');
    } else if (localStorage.getItem('skin') === "disable") {
        secondBtn.innerText = 'déséquiper';
        localStorage.setItem('skin', 'blue');
    } else if (!localStorage.getItem('skin')) {
        if (credit >= 200) {
            credit = credit - 200;
            localStorage.setItem('skin', 'blue');
            localStorage.setItem('Bank', credit);
            solde.innerText = "Votre solde : " + credit;
            secondBtn.innerText = 'déséquiper';
        }
    }
}

if(localStorage.getItem('skin')==='disable'){
    secondBtn.innerText="équiper";
}else if(localStorage.getItem('skin')==='blue'){
    secondBtn.innerText='déséquiper';
}

secondBtn.addEventListener('click', blueSkin);

// Skin coeur

function heart() {
    if (localStorage.getItem('heart') === 'real') {
        thirdBtn.innerText = 'équiper';
        localStorage.setItem('heart', 'disable');
    } else if (localStorage.getItem('heart') === "disable") {
        thirdBtn.innerText = 'déséquiper';
        localStorage.setItem('heart', 'real');
    } else if (!localStorage.getItem('heart')) {
        if (credit >= 200) {
            credit = credit - 200;
            localStorage.setItem('heart', 'real');
            localStorage.setItem('Bank', credit);
            solde.innerText = "Votre solde : " + credit;
            thirdBtn.innerText = 'déséquiper';
        }
    }
}

if(localStorage.getItem('heart')==='disable'){
    thirdBtn.innerText="équiper";
}else if(localStorage.getItem('heart')==='real'){
    thirdBtn.innerText='déséquiper';
}

thirdBtn.addEventListener('click', heart);

// Multiplier

function multiplier() {
    if (localStorage.getItem('multiplier') === 'active') {
        forthBtn.innerText = 'acquis';
    } else if (!localStorage.getItem('multiplier')) {
        if (credit >= 400) {
            credit = credit - 400;
            localStorage.setItem('multiplier', 'active');
            localStorage.setItem('Bank', credit);
            solde.innerText = "Votre solde : " + credit;
            forthBtn.innerText = 'acquis';
        }
    }
}


if(localStorage.getItem('multiplier')==='active'){
    forthBtn.innerText='acquis';
}

forthBtn.addEventListener('click', multiplier);