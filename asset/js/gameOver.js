let bestScore = localStorage.getItem('bestScore');
let displayBestScore = document.getElementById('bestScore');
let audioOption = document.getElementById('audioOption');
let audioIcon = document.getElementById('audioIcon');
let money = localStorage.getItem('money');
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

if(localStorage.getItem("played")=="true"){
    if(!localStorage.getItem('Bank')){
        localStorage.setItem('Bank',money);
        localStorage.setItem('money',0)
    }else{
        total=parseInt(localStorage.getItem('Bank'))+parseInt(money);
        localStorage.setItem('Bank',total);
        localStorage.setItem('money',0)
    }
    localStorage.setItem("played","false");
}
