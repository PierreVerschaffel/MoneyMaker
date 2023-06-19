let bestScore = localStorage.getItem('bestScore');
let displayBestScore = document.getElementById('bestScore');
let audioOption = document.getElementById('audioOption');
let audioIcon = document.getElementById('audioIcon');

displayBestScore.innerText = 'Meilleur score : ' + bestScore

if(!localStorage.getItem('Audio')){
    localStorage.setItem('Audio', 'true');
}
if(localStorage.getItem('Audio')=='true'){
    audioIcon.src = "../asset/images/speaker.svg"
}else if(localStorage.getItem('Audio')=='false'){
    audioIcon.src = "../asset/images/mute.svg"
}
audioOption.addEventListener("click", function() {
    if(localStorage.getItem('Audio')=='true'){
        localStorage.setItem('Audio','false');
        audioIcon.src = "../asset/images/mute.svg"
    }else if(localStorage.getItem('Audio')=='false'){
        localStorage.setItem('Audio','true');
        audioIcon.src = "../asset/images/speaker.svg"
    }
})