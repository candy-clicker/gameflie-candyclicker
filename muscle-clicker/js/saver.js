"use strict";
document.body.oncontextmenu = function (e) {return false;};



// let key = "myKey";
// let o = {};
// console.log(o[key]); // value


// SAVER SCREEN DATA ******************************************************************************************************************************
const gameScreenSaver = document.getElementById('game-screen-saver'),
studioName = document.getElementById('studio'),
presentsWord = document.getElementById('presentse-word');
let showWordsIntrvl, hideWordsIntrvl;

// Появление слов
function showWordsFunc() {
    let opacNum1 = 0, opacNum2 = 0;         
    function rafShowWordsFunc() {
        showWordsIntrvl = requestAnimationFrame(rafShowWordsFunc); 
        if (opacNum1 < 1) {
            opacNum1 += 0.0125; if (opacNum1 > 1) opacNum1 = 1;
        } else if (opacNum1 >= 1) {
            opacNum2 += 0.0125; 
            if (opacNum2 > 1) {
                opacNum2 = 1; 
                cancelAnimationFrame(showWordsIntrvl);
                setTimeout(function () {hideWordsFunc();}, 500);
            }
        } studioName.style.opacity = opacNum1 + '';
        presentsWord.style.opacity = opacNum2 + '';
    } rafShowWordsFunc();
} 

// Исчезновение слов
function hideWordsFunc() {
    let opacNum = 1;         
    function rafHideWordsFunc() {
        hideWordsIntrvl = requestAnimationFrame(rafHideWordsFunc); 
        opacNum -= 0.025;
        if (opacNum < 0) {
            opacNum = 0; 
            cancelAnimationFrame(hideWordsIntrvl);
            // window.location.replace("game.html");
            mainWindow.style.display = 'block'; btns_menu_MA.style.display = 'block'; 
            expProgress.style.display = 'block'; staminaProgress.style.display = 'block';
            gameScreenSaver.style.display = 'none';
        }  studioName.style.opacity = opacNum + '';
        presentsWord.style.opacity = opacNum + '';
    } rafHideWordsFunc();
}


// START SCREEN SAVER 
window.onload = function() {
	showWordsFunc();
}