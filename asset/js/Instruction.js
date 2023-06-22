let audioOption = document.getElementById('audioOptionMenu');
let audioIcon = document.getElementById('audioIcon');
let easy = document.getElementById('easyBtn');
let medium = document.getElementById('mediumBtn');
let hard = document.getElementById('hardBtn');



if(!localStorage.getItem('Audio')){
    localStorage.setItem('Audio', 'true');
}
if(localStorage.getItem('Audio')=='true'){
    audioIcon.src = "./asset/images/speaker.svg"
}else if(localStorage.getItem('Audio')=='false'){
    audioIcon.src = "./asset/images/mute.svg"
}
audioOption.addEventListener("click", function() {
    if(localStorage.getItem('Audio')=='true'){
        localStorage.setItem('Audio','false');
        audioIcon.src = "./asset/images/mute.svg"
    }else if(localStorage.getItem('Audio')=='false'){
        localStorage.setItem('Audio','true');
        audioIcon.src = "./asset/images/speaker.svg"
    }
})

easy.addEventListener('click',function(){
    localStorage.setItem('difficulty','easy');
});
medium.addEventListener('click',function(){
    localStorage.setItem('difficulty','medium');
});
hard.addEventListener('click',function(){
    localStorage.setItem('difficulty','hard');
});