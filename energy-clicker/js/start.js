"use strict";
document.body.oncontextmenu = function (e) {return false;};


// Определение языка устройства ************************************************************************************************************
let lang = navigator.language || navigator.userLanguage; console.log(lang);
const lang_arr = [document.querySelectorAll(".text_eng"), document.querySelectorAll(".text_rus"), document.querySelectorAll(".text_por")],
btnsLang = [document.getElementById('btn-lang-eng-opt'),document.getElementById('btn-lang-rus-opt'),document.getElementById('btn-lang-por-opt')],
btnsLangSW = [document.getElementById('btn-lang-eng-sw'),document.getElementById('btn-lang-rus-sw'),document.getElementById('btn-lang-por-sw')];
let langNum = 1;
if (window.localStorage.getItem("langKey5") !== null) {
	langNum = +window.localStorage.getItem("langKey5"); 
	showText(lang_arr[langNum]);
} else { 
	if (lang == 'ru-RU' || lang == 'ru') {
		langNum = 1; showText(lang_arr[1]);
	} else if (lang == 'pt-BR' || lang == 'pt') {
		langNum = 2; showText(lang_arr[2]);
	} else {
		langNum = 0; showText(lang_arr[0]);
	}
} btnsLang[langNum].style.opacity = '0.3'; btnsLangSW[langNum].style.opacity = '0.3';

function showText(lang_text) {
	for (let i = 0; i < lang_text.length; i++) lang_text[i].style.display = 'block';
}


// Check mobile device *******************************************************************************************************************
const isMobileFlag = /iPhone|iPad|iPod|Android|IEMobile|BlackBerry|Opera Mini/i.test(navigator.userAgent);
// Touch and mouse events
let clickDownEvent, clickUpEvent, clickMoveEvent;
if (isMobileFlag) {
    clickDownEvent = 'touchstart';
    clickUpEvent = 'touchend';
	clickMoveEvent = 'touchmove';
} else if (!isMobileFlag) {
	clickDownEvent = 'mousedown';
    clickUpEvent = 'mouseup';
	clickMoveEvent = 'mousemove';
} console.log('isMobileFlag = ' + isMobileFlag);





// SAVER SCREEN ############################################################################################################################
const screenSaver = document.getElementById('game-screen-saver'),
studioName = document.getElementById('studio'), presentsWord = document.getElementById('presentse-word');
let showWordsIntrvl, hideWordsIntrvl;

// Появление слов
function showWordsFunc() {
    let opacNum1 = 0, opacNum2 = 0;    
    screenSaver.style.display = 'block';     
    function rafShowWordsFunc() {
        showWordsIntrvl = requestAnimationFrame(rafShowWordsFunc); 
        if (opacNum1 < 1) {
            opacNum1 += 0.0125*10; if (opacNum1 > 1) opacNum1 = 1;
        } else if (opacNum1 >= 1) {
            opacNum2 += 0.0125*10; 
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
let w_left_hide, w_rigth_hide;
function hideWordsFunc() {
    let opacNum = 1;         
    function rafHideWordsFunc() {
        hideWordsIntrvl = requestAnimationFrame(rafHideWordsFunc); 
        opacNum -= 0.025*10;
        if (opacNum < 0) {
            opacNum = 0;
            cancelAnimationFrame(hideWordsIntrvl);
            startWindow.style.display = 'block'; 
			cityMA.style.display = 'block';
			charMA.style.display = 'block';
            screenSaver.style.display = 'none';
			// Change elements position 
            if (document.documentElement.clientWidth / document.documentElement.clientHeight > 16 / 9) { 
                let w = (document.documentElement.clientWidth/document.documentElement.clientHeight) / (16/9) * 100;
                w_left_hide = (w - 100) / 2;
                charArea.style.transform = 'translateX(' + -(w_left_hide) + '%)'; 
				startWindow.style.transform = 'translateX(' + w_left_hide + '%)'; 
				consentWindow.style.transform = 'translateX(' + w_left_hide + '%)'; 
				menuWindow[0].style.transform = 'translateX(' + w_left_hide + '%)'; 
				menuWindow[2].style.transform = 'translateX(' + w_left_hide + '%)'; 
				btnExitShopMenu.style.transform = 'translateX(' + w_left_hide + '%)'; 
				btnExitMapMenu.style.transform = 'translateX(' + w_left_hide + '%)'; 
                // // Смещение элементов влево 
                // let elemsToLeft = [btnMenu[0], btnMenu[1], btnMenu[2], btnMenu[3], mesTutorial[1], mesTutorial[2], mesTutorial[3],     
                //     mesTutorial[4]];
                // for (let i = 0; i < elemsToLeft.length; i++) elemsToLeft[i].style.transform = 'translateX(' + -(w_left_hide / 2) + '%)';
                // // Смещение элементов вправо 
                // let elemsToRight = [btnStart, btnContinue, btnReset, btnLang, langWindSW, btnExitCharMenu, btnMenuShopExitGroup, btnExitOptGroup, btnMenuExitGroup, btnMenu[4], btnMenu[5], btnMenu[6], btnMenu[7], mesTutorial[5], mesTutorial[6], mesTutorial[7], mesLvlUp];
                // for (let i = 0; i < elemsToRight.length; i++) {
                //     if (i < 9) elemsToRight[i].style.transform = 'translateX(' + w_left_hide + '%)';
                //     else elemsToRight[i].style.transform = 'translateX(' + (w_left_hide / 2) + '%)';
                // }
            } else {
                w_left_hide = 0; 
            } console.log('w_left_hide ' + w_left_hide);
            // Get LS secondStartGameKey5 
			if (window.localStorage.getItem("secondStartGameKey5") !== null) {
				secondStartGameFlag = window.localStorage.getItem("secondStartGameKey5");
				btnContinue.style.display = 'block'; btnReset.style.display = 'block';
			} else {
				btnStart.style.display = 'block';
				btnLang.style.transform = 'translateX(-207.6px)'; langWindSW.style.transform = 'translateX(-207.6px)';
			} 
        } studioName.style.opacity = opacNum + '';
        presentsWord.style.opacity = opacNum + '';
    } rafHideWordsFunc();
}




// START WINDOW #########################################################################################################################
const startWindow = document.getElementById('start-window'), btnsStartWind = document.getElementById('btns-start-window'),
resetWindow = document.getElementById('reset-window'), btnsResWind = document.getElementById('btns-reset-wind'),
// Кнопки
btnStart = document.getElementById('sw-start'), btnContinue = document.getElementById('sw-continue'),
btnReset = document.getElementById('sw-reset'), 
btnLang = document.getElementById('sw-lang'), langWindSW = document.getElementById('sw-lang-wind');
let secondStartGameFlag = 'no'; // Флаг не первого запуска игры

// Обработчики кнопок start window *************************************************
btnsStartWind.addEventListener(clickDownEvent, clickStart03);
btnsStartWind.addEventListener(clickMoveEvent, clickMove03);
btnsStartWind.addEventListener(clickUpEvent, startWindowBtns);

function startWindowBtns(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-sw-start':
				secondStartGameFlag = 'yes'; window.localStorage.setItem("secondStartGameKey5", secondStartGameFlag); 
				startWindow.style.display = 'none';
				btnStart.style.display = 'none'; btnContinue.style.display = 'block'; btnReset.style.display = 'block';
				btnLang.style.transform = 'translateX(0px)'; langWindSW.style.transform = 'translateX(0px)';
				if (langWindSW.style.display == 'block') langWindSW.style.display = 'none'; 
				// Show tutorial
                if (!finishTutorialFlag) {
                    btnsTutorialGroup.style.display = 'block'; mesTutorial[numTutorial].style.display = 'block';
                    slowShowMes(mesTutorialMA);
                } // Show inter ad
				gdsdk.showAd();
			break;
			case 'btn-sw-continue':
				startWindow.style.display = 'none';
				if (langWindSW.style.display == 'block') langWindSW.style.display = 'none'; 
				// Start downTimerStim and showBird
			    if (useStimNum > -1 && !downTimerStimIntrvl) downTimerStim(); 
			    if (moveBirdIntrvl == false && showBirdIntvl == false) showBird(); 
				// Show inter ad
				gdsdk.showAd();
			break;
			case 'btn-show-reset-window':
				resetWindow.style.display = 'block';
			break;
			case 'btn-more-games':
				window.location.replace("https://play.google.com/store/apps/dev?id=6043684000948739501");
			break;
			case 'btn-sw-lang':
				langWindSW.style.display = 'block';
			break;  
		} event.target.style.opacity = '0';
	}	
}

// Обработчики кнопок в окне сброса прогресса **************************************************************************************
btnsResWind.addEventListener(clickDownEvent, clickStart03);
btnsResWind.addEventListener(clickMoveEvent, clickMove03);
btnsResWind.addEventListener(clickUpEvent, clickResetBtns);

function clickStart03(event) {
    moveFlag = false; 
    event.target.style.opacity = '0.3';
}
function clickMove03(event) {
	if (isMobileFlag && !moveFlag) moveFlag = true;
    if (event.target.style.opacity !== '0') event.target.style.opacity = '0';
}
function clickResetBtns(event) {
	switch (event.target.id) {
		case 'btn-not-reset':
			if (soundData.soundFlag == 'on') buttonSound.play();
			resetWindow.style.display = 'none';
		break;
		case 'btn-reset':
			if (soundData.soundFlag == 'on') buttonSound.play(); 
			resetWindow.style.display = 'none';
			window.localStorage.clear();
			consentShowFlag = 'showed'; window.localStorage.setItem("consentWindKey5", consentShowFlag);
			window.location.reload();
		break;
	} event.target.style.opacity = '0';
}

// Обработчики кнопок в окне сброса выбора языка ******************************************************************************************
langWindSW.addEventListener(clickDownEvent, clickStart);
langWindSW.addEventListener(clickMoveEvent, clickMove);
langWindSW.addEventListener(clickUpEvent, changeLangFunc);

function clickStart(event) {
    moveFlag = false; 
}
function clickMove(event) {
    if (isMobileFlag && !moveFlag) moveFlag = true;
}
function changeLangFunc(event) { console.log('changeLangFunc');
	if (!moveFlag) {
		switch(event.target.id) {	
			case 'btn-lang-eng-sw': selectLang(0); break; 
	        case 'btn-lang-rus-sw': selectLang(1); break; 
	        case 'btn-lang-por-sw': selectLang(2); break; 
		}
	}
}
function selectLang(num) { console.log('selectLang');
	if (langNum !== num) {
		btnsLangSW[langNum].style.opacity = '0'; btnsLang[langNum].style.opacity = '0';
		for (let i = 0; i < lang_arr[langNum].length; i++) lang_arr[langNum][i].style.display = 'none';
		langNum = num; window.localStorage.setItem("langKey5", langNum);
		showText(lang_arr[langNum]);
		btnsLangSW[langNum].style.opacity = '0.3'; btnsLang[langNum].style.opacity = '0.3'; 
	} if (langWindSW.style.display == 'block') langWindSW.style.display = 'none'; 
	else if (langWindOpt.style.display == 'block') langWindOpt.style.display = 'none';
}