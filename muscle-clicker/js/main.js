"use strict";
/*Copyright Aleh Belko 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/


// GAME DATA ########################################################################################################################
let rotateNumber = null, // Поворот рук и ног 
clickFlag = false, // флаг единственного клика
mesClickFlag = false, // Флаг задержки клика по сообщению
moveFlag = false, // Флаг отмены клика по кнопкам или предмету
adNameFlag, // Inter or Reward
showAdFlag = false, // Show or no ads
// Данные наград за видеорекламу 
rewardFailFlag = false,  
// Данные межстраничного обьявления 
intrstFailFlag = false, canShowIntrst = false,
intrstCount = 0;

// Check mobile device ****************************************************************************************
const isMobile = /iPhone|iPad|iPod|Android|IEMobile|BlackBerry|Opera Mini/i.test(navigator.userAgent);
// Touch and mouse events
let clickDownEvent, clickUpEvent, clickMoveEvent;
if (isMobile) {
	// document.body.overflow = 'hidden';
    clickDownEvent = 'touchstart';
    clickUpEvent = 'touchend';
	clickMoveEvent = 'touchmove';
} else if (!isMobile) {
	// document.body.overflow = 'visible';
	clickDownEvent = 'mousedown';
    clickUpEvent = 'mouseup';
	clickMoveEvent = 'mousemove';
} console.log('isMobile = ' + isMobile);


// Определение языка устройства ******************************************
let lang = navigator.language || navigator.userLanguage; console.log(lang);
const lang_arr = [document.querySelectorAll(".text_eng"), document.querySelectorAll(".text_rus"), document.querySelectorAll(".text_por")],
btnsLang = [document.getElementById('btn-lang-eng'),document.getElementById('btn-lang-rus'),document.getElementById('btn-lang-por')],
btnsLangSW = [document.getElementById('btn-lang-eng-sw'),document.getElementById('btn-lang-rus-sw'),document.getElementById('btn-lang-por-sw')];
let langNum;
if (window.localStorage.getItem("langKey1") !== null) {
	langNum = +window.localStorage.getItem("langKey1"); 
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


// charData  ************************************************************
let charData;
if (window.localStorage.getItem("charDataKey1") !== null) charData = JSON.parse(window.localStorage.getItem("charDataKey1")); 
else charData = {
	// Данные в главном окне
	moneyNum: 0, stmProgressNum: 10, stmMaxProgressNum: 10,
	// Прокачк рук
	bodyForceNum: 1, bodyNeedSpNum: 1,
	// Прокачка ног
	legsForceNum: 1, legsNeedSpNum: 1,
	// Прокачка выносливости
	stmNum: 1, stmNeedSpNum: 1, recStmNum: 0.05, 
	// Очки статов
	spNum: 0, addSpBikeNum: 1, addSpDumbNum: 1
}

// bodyData *************************************************************
let bodyData, numArms, numBody;
if (window.localStorage.getItem("bodyDataKey1") !== null) bodyData = JSON.parse(window.localStorage.getItem("bodyDataKey1")); 
else { 
	bodyData = {
		// Сила подьема рук, отнимание стамины
		armPower: 45, stmMinus: 1,
		// Экспа, деньги, вес гантелей
		dumbExp: 1, dumbMoney: 1, dumbWeight: 10,
		// Уровень тела
		bodyLvlNum: 1, bodyExpNum: 0, bodyMaxExpNum: 10, minusCoefExp: 2,
		// Смещение точек transform-origin и translateX
		transX: 0,
		// Флаг активной гантели
		dumbFlag: 0
	} 
}

// legsData **************************************************************
let legsData, numLegs, numUnderpunts;
if (window.localStorage.getItem("legsDataKey1") !== null) legsData = JSON.parse(window.localStorage.getItem("legsDataKey1"));
else if (window.localStorage.getItem("legsDataKey1") == null) {
	legsData = {
		// Сила подьема ног, отнимание стамины 
		legPower: 2, stmMinus: 1,
		// Экспа, деньги, скорости байков
		bikeExp: 1, bikeMoney: 1, bikeSpeed: 1, speedNumber: 1,
		// Уровень ног
		legsLvlNum: 1, legsExpNum: 0, legsMaxExpNum: 10, minusCoefExp: 2,
		// Флаг активного велотренажера
		bikeFlag: 0
	}
} 

// Numbers char elements *************************************************
function numCharElem() {
	// Номер рук
    if (bodyData.bodyLvlNum <= 30) numArms = bodyData.bodyLvlNum - 1;
    else numArms = 29;
    // Номер тел
	if (bodyData.bodyLvlNum < 3) numBody = 0;
	else if (bodyData.bodyLvlNum <= 30) numBody = bodyData.bodyLvlNum - 2;
	else numBody = 28; 
	// Номер ног
    if (legsData.legsLvlNum <= 30) numLegs = legsData.legsLvlNum - 1;
    else numLegs = 29;
    // Номер труселей
	if (legsData.legsLvlNum < 3) numUnderpunts = 0;
	else if (legsData.legsLvlNum < 8) numUnderpunts = legsData.legsLvlNum - 2;
	else if (legsData.legsLvlNum < 10) numUnderpunts = legsData.legsLvlNum - 3;
	else if (legsData.legsLvlNum < 27) numUnderpunts = legsData.legsLvlNum - 4;
	else numUnderpunts = 22;
} numCharElem();




// START WINDOW #############################################################################################################################
const startWindow = document.getElementById('game-start-window'),
btnsStartWind = document.getElementById('btns-start-wind'),
resetWindow = document.getElementById('reset-window'),
btnsResWind = document.getElementById('btns-res-wind'),
langWindSW = document.getElementById('lang-wind-sw');
let hideBlackWindIntrvl;
// Кнопки
const btnStart = document.getElementById('sw-start_1_'), btnContinue = document.getElementById('sw-continue_1_'),
btnReset = document.getElementById('sw-reset_1_'), btnLastFight = document.getElementById('lastfight');
// btnMoreGames = document.getElementById('more-game');

// Loc number **********************************************************************
let openWindow; 
if (window.localStorage.getItem("openWindowKey1") !== null) {
	openWindow = +window.localStorage.getItem("openWindowKey1");
	if (typeof(openWindow) !== 'number') openWindow = 0;
} else openWindow = 0;

	
// Get LS secondStartGameKey2 ******************************************************
let secondStartGameFlag = 'no'; // Флаг не первого запуска игры
if (window.localStorage.getItem("secondStartGameKey2") !== null) {
	btnContinue.style.display = 'block'; btnReset.style.display = 'block';
} else {
	btnStart.style.display = 'block';
} // btnMoreGames.style.display = 'block';

// Обработчики кнопок start window *************************************************
btnsStartWind.addEventListener(clickDownEvent, clickFuncStart03);
btnsStartWind.addEventListener(clickMoveEvent, clickFuncMove03);
btnsStartWind.addEventListener(clickUpEvent, startWindowBtns);

function startWindowBtns(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-sw-start_1_':
				if (sound == 'on' && electroSound[trackFlag].paused) electroSound[trackFlag].play();
				secondStartGameFlag = 'yes'; window.localStorage.setItem("secondStartGameKey2", secondStartGameFlag); 
				// Появление обучения
			    if (!mesData.finishTutorialFlag) {
			        slowShowMes(mesTutorialMA); mesTutorial[numTutorial].style.display = 'block';
			    } // Change btns 
				startWindow.style.display = 'none'; btnStart.style.display = 'none';
				btnContinue.style.display = 'block'; btnReset.style.display = 'block';
				// Start pullup trans btns counter
				if (pullupBtnCount > 0) {
					transPullupIcon.style.display = 'none'; transPullupTimer.style.display = 'block';
				} else {
					transPullupIcon.style.display = 'block'; transPullupTimer.style.display = 'none';
				} // Start squats trans btns counter
				if (squatBtnCount > 0) {
					transSquatIcon.style.display = 'none'; transSquatTimer.style.display = 'block';
				} else {
					transSquatIcon.style.display = 'block'; transSquatTimer.style.display = 'none';
				} // Start transBtnTimer
				transBtnTimer();
				// Close langWindSW
				if (langWindSW.style.display == 'block') langWindSW.style.display = 'none';
				// Show inter ad
				gdsdk.showAd();
			break;
			case 'btn-sw-continue_1_':
				if (sound == 'on' && electroSound[trackFlag].paused) electroSound[trackFlag].play();
				startWindow.style.display = 'none';
				// Запуск интервала зелий и появления птиц
				if (openWindow <= 1) {
					if (timerData.useStimNum !== null && downTimerIntrvl == null) downTimerStim(); 
					if (showBirdIntvl == null && birds.style.display !== 'block') showBird(); 
				} else if (openWindow >= 2 && downTimerCompIntrvl == null) timerCompEnd();
				// Start pullup trans btns counter
				if (pullupBtnCount > 0) {
					transPullupIcon.style.display = 'none'; transPullupTimer.style.display = 'block';
				} else {
					transPullupIcon.style.display = 'block'; transPullupTimer.style.display = 'none';
				} // Start squats trans btns counter
				if (squatBtnCount > 0) {
					transSquatIcon.style.display = 'none'; transSquatTimer.style.display = 'block';
				} else {
					transSquatIcon.style.display = 'block'; transSquatTimer.style.display = 'none';
				} // Start transBtnTimer
				transBtnTimer();
				// Close langWindSW
				if (langWindSW.style.display == 'block') langWindSW.style.display = 'none';
				// Show inter ad
				gdsdk.showAd();
			break;
			// Select language
			case 'btn-change-lang-sw':
				langWindSW.style.display = 'block';
			break;  
			// Reset progress
			case 'btn-show-reset-window':
				resetWindow.style.display = 'block';
			break;
		} event.target.style.opacity = '0';
	}	
}
// Обработчики кнопок в окне сброса прогресса *************************************
btnsResWind.addEventListener(clickDownEvent, clickFuncStart06);
btnsResWind.addEventListener(clickMoveEvent, clickFuncMove06);
btnsResWind.addEventListener(clickUpEvent, clickResetBtns);

function clickResetBtns(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-not-reset_1_':
				if (sound == 'on') buttonSound.play();
				resetWindow.style.display = 'none';
			break;
			case 'btn-reset':
				if (sound == 'on') buttonSound.play(); 
				resetWindow.style.display = 'none';
				// document.removeEventListener("visibilitychange", saveAllData, false);
				window.localStorage.clear();
				// consentShowFlag = 'showed'; window.localStorage.setItem("consentWindKey1", consentShowFlag);
				window.location.reload();
			break;
		} event.target.style.opacity = '0.3';
	}
}
// Обработчики кнопок в окне сброса выбора языка ******************************
langWindSW.addEventListener(clickDownEvent, clickFuncStart);
langWindSW.addEventListener(clickMoveEvent, clickFuncMove);
langWindSW.addEventListener(clickUpEvent, changeLangFunc);

function changeLangFunc(event) {
	if (!moveFlag) {
		switch(event.target.id) {	
			case 'btn-lang-eng-sw': selectLang(0); break; 
	        case 'btn-lang-rus-sw': selectLang(1); break; 
	        case 'btn-lang-por-sw': selectLang(2); break; 
		}
	}
}
function selectLang(num) {
	if (langNum !== num) {
		btnsLangSW[langNum].style.opacity = '0'; btnsLang[langNum].style.opacity = '0';
		for (let i = 0; i < lang_arr[langNum].length; i++) lang_arr[langNum][i].style.display = 'none';
		langNum = num; window.localStorage.setItem("langKey1", langNum);
		showText(lang_arr[langNum]);
		btnsLangSW[langNum].style.opacity = '0.3'; btnsLang[langNum].style.opacity = '0.3'; 
		// Change name of comp and init words in btn Watch Ads
		if (langNum == 1) {
			if (openWindow == 2) compNameWord = 'Подтяг.'; 
			else compNameWord = 'Присед.';
		} else { 
			if (openWindow == 2) compNameWord = 'Pull-ups'; 
			else compNameWord = 'Squats';
		} compNameMain.innerHTML = compNameWord;
	} 
	if (langWindSW.style.display == 'block') langWindSW.style.display = 'none'; 
	else if (langWindOpt.style.display == 'block') langWindOpt.style.display = 'none';
}





// MAIN WINDOW ##################################################################################################################################
const mainWindow = document.getElementById('game-main'),
// Область клика
clickArea = document.getElementById('click-area'),
// Inter load window
loadInterWindow = document.getElementById('load-inter-window'), startInterTimer = document.getElementById('start-inter-timer'),

// Money ***************************************************************************************************************************************
numFormat = new Intl.NumberFormat(),
moneyMain = document.getElementById('money-number');
moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));

// Exp *****************************************************************************************************************************************
const lvlMain = document.getElementById('lvl-number'), 
bodyIconMain = document.getElementById('body-icon-main'), legsIconMain = document.getElementById('legs-icon-main'),
expProgress = document.querySelector('.progress-exp');

// Stm *****************************************************************************************************************************************
const staminaProgress = document.querySelector('.progress-stamina'), stmProgressRed = document.querySelector('.progress-stamina-red');
// Данные в menu и в основном окне 1 lvl 
// staminaProgress.value = charData.stmProgressNum; staminaProgress.max = charData.stmMaxProgressNum;
staminaProgress.style.width = charData.stmProgressNum * 67 / charData.stmMaxProgressNum + '%';


// Stimulates timers ****************************************************************************************************************************
// Картинки стимуляторов с таймером 
const stimMain = [document.getElementById('stm-main'),document.getElementById('bigstm-main'),document.getElementById('str-main'),
	document.getElementById('bigstr-main'),document.getElementById('str_x5F_stm1-main'),document.getElementById('str_x5F_stm2-main'),
	document.getElementById('str_x5F_stm3-main')],
stimTimer = document.getElementById('stim-timer');
let timerData, strBodyK = 0, strLegsK = 0, stmK = 1;
if (window.localStorage.getItem("timerDataKey1") !== null) timerData = JSON.parse(window.localStorage.getItem("timerDataKey1")); 
else timerData = {
	timerNum: [60, 70, 60, 70, 70, 80, 90], // Таймеры стимуляторов в главном окне
	// useFlag: [false, false, false, false, false], // Флаги включенного таймера
	useStimNum: null // Номер используемого стимулятора 
}
function strStmCoef() {
	if (timerData.useStimNum == 0) stmK = 1.25;
    else if (timerData.useStimNum == 1) stmK = 1.5;
    else if (timerData.useStimNum == 2) {
    	strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 2.5; 
    	strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 2.5;
    } else if (timerData.useStimNum == 3) {
    	strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 5; 
    	strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 5;
    } else if (timerData.useStimNum == 4) {
    	strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 5; 
    	strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 5; 
    	stmK = 1.5;
    } else if (timerData.useStimNum == 5) {
    	strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 7.5; 
    	strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 7.5; 
    	stmK = 1.75;
    } else if (timerData.useStimNum == 6) {
    	strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 10; 
    	strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 10; 
    	stmK = 2;
    }
} 
// Show stim in main window
if (timerData.useStimNum !== null) {
	strStmCoef();
	stimMain[timerData.useStimNum].style.display = 'block'; stimTimer.style.display = 'block'; 
    stimTimer.innerHTML = timerData.timerNum[timerData.useStimNum];
}

// Interval down timer stim in main window 
let downTimerIntrvl = null; 
function downTimerStim() {
    let last = performance.now(), now, step = 1000, dt = 0;         
    function rafDownTimerStim() {
        downTimerIntrvl = requestAnimationFrame(rafDownTimerStim); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
            dt -= step; 
            // Уменьшение таймера стимуляторов
            timerData.timerNum[timerData.useStimNum] -= 1; stimTimer.innerHTML = timerData.timerNum[timerData.useStimNum];
            // Исчезновение иконки и таймера стимулятора
            if (timerData.timerNum[timerData.useStimNum] <= 0) { 
                cancelAnimationFrame(downTimerIntrvl); downTimerIntrvl = null;
                stimMain[timerData.useStimNum].style.display = 'none'; stimTimer.style.display = 'none'; 
                if (timerData.useStimNum == 0 || timerData.useStimNum == 2) timerData.timerNum[timerData.useStimNum] = 60;
                else if (timerData.useStimNum == 1 || timerData.useStimNum == 3 || timerData.useStimNum == 4) timerData.timerNum[timerData.useStimNum]=70;
                else if (timerData.useStimNum == 5) timerData.timerNum[timerData.useStimNum] = 80;
                else if (timerData.useStimNum == 6) timerData.timerNum[timerData.useStimNum] = 90;
                // timerData.useStimNum[timerData.useStimNum] = false; 
                timerData.useStimNum = null;
                strBodyK = 0; strLegsK = 0; stmK = 1;
                if (openWindow == 1) {
                	if (!downRotateFlag) {
                		downRotateFlag = true; 
                		downRotate();
                	} clickFlag = false; 
                } 
            } window.localStorage.setItem("timerDataKey1", JSON.stringify(timerData));
    		//console.log('startRecStamFlag ' + startRecStamFlag);
        } 
    } rafDownTimerStim();
}


// Кнопки перехода на другие локации и таймеры локаций соревнований *****************************************************************************
const transBtnsGroup = document.getElementById('transition'),
btns_trans = [document.getElementById('btn-trans-dumb'),document.getElementById('btn-trans-bike'),
	document.getElementById('btn-trans-pullup'), document.getElementById('btn-trans-squat')],
transPullupIcon = document.getElementById('trans-pullup-icon'), transPullupTimer = document.getElementById('trans-pullup-timer'),
transSquatIcon = document.getElementById('trans-squat-icon'), transSquatTimer = document.getElementById('trans-squat-timer');
// Флаг номера локации на которую совершается переход
let transNum = null, 
// Счетчики таймеров кнопок локаций соревнований
pullupBtnCount;
if (window.localStorage.getItem("pullupTransKey1") !== null) pullupBtnCount = +window.localStorage.getItem("pullupTransKey1");
else pullupBtnCount = 300;
let squatBtnCount; 
if (window.localStorage.getItem("squatTransKey1") !== null) squatBtnCount = +window.localStorage.getItem("squatTransKey1");
else squatBtnCount = 300;

// Функции таймеров на кнопках локаций соревнований *************************************
let compBtnTimerIntvl = null;
function transBtnTimer() {
	let last = performance.now(), now, step = 1000, dt = 0; 
	function rafTransBtnTimer() {
        compBtnTimerIntvl = requestAnimationFrame(rafTransBtnTimer); 
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) {
            dt -= step; 
            // Timer pullupBtnCount
            if (pullupBtnCount > 0) pullupBtnCount -= 1; 
			transPullupTimer.innerHTML = pullupBtnCount; 
		    if (pullupBtnCount <= 0) {
		    	pullupBtnCount = 0; transPullupTimer.style.display = 'none'; transPullupIcon.style.display = 'block'; 
		    } window.localStorage.setItem("pullupTransKey1", pullupBtnCount);
		    // Timer squatBtnCount
            if (squatBtnCount > 0) squatBtnCount -= 1; 
			transSquatTimer.innerHTML = squatBtnCount; 
		    if (squatBtnCount <= 0) {
		    	squatBtnCount = 0; transSquatTimer.style.display = 'none'; transSquatIcon.style.display = 'block'; 
		    } window.localStorage.setItem("squatTransKey1", squatBtnCount);
		    // Stop timer
	        if (pullupBtnCount <= 0 && squatBtnCount <= 0) {    
	            // Появление сообщения о возможности участия в соревнованиях
	        	if (!mesData.mesTrans2Flag && messenges.style.display !== 'block' && menuOpenNum == null) {
	        		mesData.mesTrans2Flag = true; window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
	        		slowShowMes(mesTrans2);
	        	} // Stop intrvl 
	        	cancelAnimationFrame(compBtnTimerIntvl); compBtnTimerIntvl = null;
	        } //console.log('compBtnTimerIntvl');
        }
    } rafTransBtnTimer();
} 

// Интервал таймера на локациях соревнований *******************************************
let downTimerCompIntrvl = null;
function timerCompEnd() { //lvl, name
    let last = performance.now(), now, step = 1000, dt = 0;         
    function rafTimerCompEnd() {
        downTimerCompIntrvl = requestAnimationFrame(rafTimerCompEnd); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
            dt -= step;
	        // Уменьшения времени соревнования
            compTimerNum -= 1; compTimer.innerHTML = compTimerNum;
            if (compTimerNum <= 0) {
            	// Остановка таймера соревнований
            	cancelAnimationFrame(downTimerCompIntrvl); downTimerCompIntrvl = null;
            	compTimerNum = 0; compTimer.innerHTML = compTimerNum;
            	// Название локации на которую осуществляется переход
            	if (openWindow == 2) {
            		transNum = 0; compCoef = bodyData.minusCoefExp;
            	} else if (openWindow == 3) {
            		transNum = 1; compCoef = legsData.minusCoefExp;
            	} // Появление окна завершения соревнования
            	compName.innerHTML = compNameWord; compResult.innerHTML = compCount;
            	compMoneyNum = Math.round(51 * Math.pow((1.25 - compCount * 0.0011), compCount - 1));
            	compMoney.innerHTML = numFormat.format(Math.round(compMoneyNum * compCoef)); 
            	compMoneyX2.innerHTML = numFormat.format(Math.round(compMoneyNum * compCoef) * 2);
            	canShowIntrst = false; slowShowMes(mesCompEnd);
            } window.localStorage.setItem("compTimerNumKey1", compTimerNum);
			// console.log('compTimerNum ' + compTimerNum);
        }
    } rafTimerCompEnd();
}


// Birds data *************************************************************************************************************************************
const birds = document.getElementById('birds'),
bird1 = document.getElementById('bird'), r_wing = document.getElementById('r-wing_1_'), l_wing = document.getElementById('l-wing_1_'),
bird2 = document.getElementById('bird2'), r_wing2 = document.getElementById('r-wing2'), l_wing2 = document.getElementById('l-wing2');
l_wing.style.transformOrigin = '409.11px 364.72px'; r_wing.style.transformOrigin = '452.92px 364.72px';
l_wing2.style.transformOrigin = '412.41px 363.99px'; r_wing2.style.transformOrigin = '454.52px 363.95px';
let showBirdIntvl = null, timerRemoveBirdAmin = null,
rewardNum = null, 
// Reward money
rewardMoney; 
// Count
let showBirdCount;
if (window.localStorage.getItem("birdDataKey1") !== null) showBirdCount = +window.localStorage.getItem("birdDataKey1");
else showBirdCount = 0;

// Функция появление птиц  **************************************************************
let trajectoryNum;
function showBird() { 
	let last = performance.now(), now, step = 1000, dt = 0, showBirdNum;
	function rafBirdAnimFunc() { 
        showBirdIntvl = requestAnimationFrame(rafBirdAnimFunc); 
        now = performance.now(); dt += (now - last); last = now;
		if (dt >= step) {
            dt -= step; showBirdCount += 1;
			if (showBirdCount >= 100) {
				showBirdCount = 0; 
				cancelAnimationFrame(showBirdIntvl); showBirdIntvl = null;
				birds.style.display = 'block';
				// Рандомный выбор появляющейся птицы
	            showBirdNum = Math.floor(Math.random() * 2) + 1;
				if (showBirdNum == 1) bird1.style.display = 'block';
				else if (showBirdNum == 2) bird2.style.display = 'block';
				// Рандомный выбор траектории полета
				trajectoryNum = Math.floor(Math.random() * 3) + 1;
				birds.classList.add('flying' + trajectoryNum);
				if (bird1.style.display == 'block') {
					r_wing.classList.add('waving-right-wing'); l_wing.classList.add('waving-left-wing'); 
				} else if (bird2.style.display == 'block') {
					r_wing2.classList.add('waving-right-wing'); l_wing2.classList.add('waving-left-wing'); 
				} // Отмена классов полета и исчезновение птицы
				timerRemoveBirdAmin = setTimeout(function() {
					hideBirds(); 
					if (menuOpenNum == null) showBird(); 
				}, 19500);
			} window.localStorage.setItem("birdDataKey1", showBirdCount);
			//console.log('showBirdCount ' + showBirdCount);
		} 
	} rafBirdAnimFunc();
} 
// Отмена классов полета и исчезновение птицы
function hideBirds() {
	if (bird1.style.display == 'block') {
		bird1.style.display = 'none'; r_wing.classList.remove('waving-right-wing'); l_wing.classList.remove('waving-left-wing'); 
	} else if (bird2.style.display == 'block') {
		bird2.style.display = 'none'; r_wing2.classList.remove('waving-right-wing'); l_wing2.classList.remove('waving-left-wing'); 
	} birds.style.display = 'none'; birds.classList.remove('flying' + trajectoryNum);
}

// Функция показа окна предложения награды за просмотр видеорекламы *********************
function showRewardWindow() { 
	let lvNum = Math.max(bodyData.bodyLvlNum, legsData.legsLvlNum), 
	randomNum = Math.ceil(Math.random() * 100), 
	strOrBigStm; 
    if (randomNum <= Math.ceil(0 + lvNum * 0.35)) {
        rewardNum = 6; rewardPics[6].style.display = 'block';
    } else if (randomNum <= Math.ceil(4 + lvNum * 0.35)) {
        rewardNum = 5; rewardPics[5].style.display = 'block';
    } else if (randomNum <= Math.ceil(10 + lvNum * 0.3)) {
        rewardNum = 4; rewardPics[4].style.display = 'block';
    } else if (randomNum <= Math.ceil(20 + lvNum * 0.2)) {
        rewardNum = 3; rewardPics[3].style.display = 'block';
    } else if (randomNum <= 30) {
    	strOrBigStm = Math.floor(Math.random() * 2);
    	if (!strOrBigStm) {
        	rewardNum = 1; rewardPics[1].style.display = 'block';
    	} else {
    		rewardNum = 2; rewardPics[2].style.display = 'block';
    	}
    } else {
        rewardNum = 0; rewardPics[0].style.display = 'block'; 
        rewardMoney = Math.round(100 * Math.pow((1.27 - lvNum * 0.0017), lvNum - 1));
        rewardQuantMoney.innerHTML = numFormat.format(rewardMoney);
        // Cмещение цены предмета
        if (rewardMoney >= 100000) rewardPics[0].style.transform = 'translateX(-30px)';
        else if (rewardMoney >= 10000) rewardPics[0].style.transform = 'translateX(-20px)';
        else if (rewardMoney >= 1000) rewardPics[0].style.transform = 'translateX(-10px)';
        else rewardPics[0].style.transform = 'translateX(0x)';
    } // Исчезновение птиц и классов анимаций
	clearTimeout(timerRemoveBirdAmin); hideBirds(); 
	// Появление окна предложения просмотра видеорекламы
	slowShowMes(mesReward);
}

// Обработчик нажатия на птицу ************************************************
birds.addEventListener(clickDownEvent, showRewardWindow, false);


// Кнопки менюх ***************************************************************************************************************************
const btns_menu_MA = document.getElementById('game-btns'),
btns_menu = [document.getElementById('btn-menu_1_'),document.getElementById('btn-inventory_1_'),document.getElementById('btn-shop_1_'),
	document.getElementById('btn-options_1_')],
menuWinds = [document.getElementById('game-menu'), document.getElementById('game-inventory'), document.getElementById('game-shop'),
	document.getElementById('game-options')];
let menuOpenNum = null; // Номер открытого меню


// Char Elements ******************************************************************************************************************************
let char, 
beard, hair,
rightUpperEyelid, rightLowerEyelid, leftUpperEyelid, leftLowerEyelid,
mouth1, mouth2,
first_left_leg, second_left_leg, first_left_legs, left_legs,
first_right_leg, second_right_leg, first_right_legs, right_legs,
bodys, underpant,
second_left_arms, first_left_arms, first_left_arm, left_arm,
second_right_arms, first_right_arms, first_right_arm, right_arm;




// MESSAGES ###################################################################################################################################
const messenges = document.getElementById('game-messanges'), 
mesTrans = document.getElementById('mes-trans'), mesTrans2 = document.getElementById('mes-trans2'),
mesStamina = document.getElementById('mes-stamina'), mesFirstbuy = document.getElementById('mes-firstbuy'), 
mesOnlyUse = document.getElementById('mes-onlyuse'), mesCantUse = document.getElementById('mes-cantuse'),
mesLvlup = document.getElementById('mes-lvlup'), mesLvlup2 = document.getElementById('mes-lvlup2'),
// Tutorial mes *********************************************************
mesTutorialMA = document.getElementById('mes-start'), btnsTutorial = document.getElementById('btns-tutorial'), 
imgCloseTutorial = document.getElementById('img_exit_tutorial'), imgForwardTutorial = document.getElementById('img_forward_tutorial'),
mesTutorial = [document.getElementById('start_mes_1'),document.getElementById('start_mes_2'),
	document.getElementById('start_mes_3'),document.getElementById('start_mes_4'),document.getElementById('start_mes_5'),
	document.getElementById('start_mes_6'),document.getElementById('start_mes_7'),document.getElementById('start_mes_8'),
	document.getElementById('start_mes_9'),document.getElementById('start_mes_10')],
windCloseTutorial = document.getElementById('start_mes_close'), numTutorialElem = document.getElementById('num-start_mes');
let numTutorial = 0; // Номер показываемого сообщения
function upDownBtnsTutorial() {
	switch (numTutorial) {
		case 0: btnsTutorial.style.WebkitTransform = 'translateY(0px)'; break;
		case 1: btnsTutorial.style.WebkitTransform = 'translateY(0px)'; break;
		case 2: btnsTutorial.style.WebkitTransform = 'translateY(-123.2px)'; break;
		case 3: btnsTutorial.style.WebkitTransform = 'translateY(-179.7px)'; break;
		case 4: btnsTutorial.style.WebkitTransform = 'translateY(-123.2px)'; break;
		case 5: btnsTutorial.style.WebkitTransform = 'translateY(-54.8px)'; break;
		case 6: btnsTutorial.style.WebkitTransform = 'translateY(220px)'; break;
		case 7: btnsTutorial.style.WebkitTransform = 'translateY(-98.8px)'; break;
		case 8: btnsTutorial.style.WebkitTransform = 'translateY(168px)'; break;
		case 9: btnsTutorial.style.WebkitTransform = 'translateY(168px)'; break;
	}
}
function closeTutorialFunc() {
	btnsTutorial.style.display = 'none';
	mesTutorial[numTutorial].style.display = 'none'; 
	slowHideMes(mesTutorialMA);
}
// Rate mes *********************************************************
const mesRate = document.getElementById('mes-rate');
let countShowMesRate; // Счетчик открытия mesRate
if (window.localStorage.getItem("countShowMesRateKey1") !== null) countShowMesRate = +window.localStorage.getItem("countShowMesRateKey1"); 
else countShowMesRate = 0;
// Mes competition end **********************************************
const mesCompLeave = document.getElementById('mes-comp-leave'), mesCompEnd = document.getElementById('mes-compend'), 
compName = document.getElementById('comp-name'), compResult = document.getElementById('comp-result'), 
compMoney = document.getElementById('comp-money_1_'), compMoneyX2 = document.getElementById('comp-moneyX2');
let compCoef;
// Reward mes *******************************************************
const mesReward = document.getElementById('mes-reward'), btnWatchAd = document.getElementById('btn-watch'),
rewardPics = [document.getElementById('reward-money'),document.getElementById('reward-bigstm'),
	document.getElementById('reward-str'),document.getElementById('reward-bigstr'),document.getElementById('reward-str_x5F_stm1'),
	document.getElementById('reward-str_x5F_stm2'),document.getElementById('reward-str_x5F_stm3')],
rewardQuantMoney = document.getElementById('reward-money-number');

let shopMesTimeout = null, // Таймаут сообщения в магазе
timerOneUseMes = null, // Таймаут сообщения о использовании только одного стимулятора
timerCantUseMes = null, // Таймаут сообщения о невозможности использования стимуляторов на локациях соревнований
timerLvlUp2Mes = null;

// Local Storage messenges data **********************************************************
let mesData;
if (window.localStorage.getItem("mesDataKey1") !== null) mesData = JSON.parse(window.localStorage.getItem("mesDataKey1"));
else mesData = {
	finishTutorialFlag: false, mesTransFlag: false, mesTrans2Flag: false, mesStaminaFlag: false, mesLvlupFlag: false, mesFirstbuyFlag: false, 
	mesRateFlag: false, mesRewardFlag: false, mesRewardCount: 0 //mesShopFlag: false,
}

// Event Listener messages ***************************************************************
messenges.addEventListener(clickUpEvent, mesAction, false);
messenges.addEventListener(clickDownEvent, mesStartFunc, false);
messenges.addEventListener(clickMoveEvent, mesMoveFunc, false);

function mesStartFunc() {
	moveFlag = false;
}
function mesMoveFunc() {
	if (isMobile && !moveFlag) moveFlag = true;
}
function mesAction(event) {
	if (!moveFlag && !mesClickFlag) {
		switch (event.target.id) {
			// Стартовое сообщение ***********************************************************************
			// Пропуск обучения
			case 'btn-skip_tutorial': 
				btnsTutorial.style.display = 'none'; mesTutorial[numTutorial].style.display = 'none'; 
				windCloseTutorial.style.display = 'block';
			break;
			// Окно подтверждения закрытия обучения
			case 'btn-start_mes_close': 
				mesData.finishTutorialFlag = true; window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
				slowHideMes(mesTutorialMA);
			break;
			case 'start_mes_not_close': 
				windCloseTutorial.style.display = 'none';
				mesTutorial[numTutorial].style.display = 'block'; btnsTutorial.style.display = 'block';
			break;
			// Кнопки меню в окнах обучения
			case 'tutorial-btn-menu':
				closeTutorialFunc();
				if (menuOpenNum !== 0) openMenu(0);
			break;
			case 'tutorial-btn-inventory':
				closeTutorialFunc();
				if (menuOpenNum !== 1) openMenu(1);
			break;
			case 'tutorial-btn-shop':
				closeTutorialFunc();
				if (menuOpenNum !== 2) openMenu(2);
			break;
			case 'tutorial-btn-options':
				closeTutorialFunc();
				if (menuOpenNum !== 3) openMenu(3);
			break;
			// Transition btns
			case 'tutorial-trans-dumb':
				transNum = 0; 
				if (openWindow >= 2) {
					canShowIntrst = false; slowShowMes(mesCompLeave); 
					// In mesAction() make stop
				} else if (openWindow == 1) {
					canShowIntrst = true; transFunc(transNum);
				}
			break;
			case 'tutorial-trans-bike':
				transNum = 1; 
				if (openWindow >= 2) {
					canShowIntrst = false; slowShowMes(mesCompLeave);
				} else if (openWindow == 0) {
					canShowIntrst = true; transFunc(transNum);
				}
			break;
			// Переход между сообщений обучения
			case 'btn-forward_tutorial': 
				if (numTutorial < 9) {
					mesTutorial[numTutorial].style.display = 'none';
					numTutorial += 1; numTutorialElem.innerHTML = numTutorial + 1;
					mesTutorial[numTutorial].style.display = 'block'; 					
					if (numTutorial == 9) {
						imgForwardTutorial.style.display = 'none'; 
						imgCloseTutorial.style.display = 'block'; 
					} // Смещение кнопок 
					upDownBtnsTutorial();
				} else {
					btnsTutorial.style.display = 'none'; mesTutorial[numTutorial].style.display = 'none'; 
					windCloseTutorial.style.display = 'block';
				} 
			break;
			case 'btn-back-tutorial': 
				if (numTutorial > 0) {
					mesTutorial[numTutorial].style.display = 'none'; 
					if (numTutorial == 9) {
						imgForwardTutorial.style.display = 'block'; 
						imgCloseTutorial.style.display = 'none';
					} numTutorial -= 1; 
					numTutorialElem.innerHTML = numTutorial + 1;
					mesTutorial[numTutorial].style.display = 'block';
					// Смещение кнопок 
					upDownBtnsTutorial();
				} 
			break;
			// Сообщение предложения просмотра видеорекламы ******************************
			case 'btn-notwatch':
				slowHideMes(mesReward); rewardPics.forEach(function(item) {item.style.display = 'none';}); 
			break;
			case 'btn-watch':
				if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
					gdsdk.showAd('rewarded').then(response => {
						// Ad process done. You can track "SDK_REWARDED_WATCH_COMPLETE" event if that event triggered, that means the user watched the advertisement completely, you can give reward there.
						adNameFlag = 'reward';
					}).catch(error => {
						// An error catched. Please don't give reward here.
					});
				}
			break;
			// Сообщение - покинуть соревнование *****************************************
			case 'btn-leave':
				slowHideMes(mesCompLeave); 
				// Появление окна завершения соревнования
            	if (openWindow == 2) {
            		compName.innerHTML = compNameWord; 
            		compCoef = bodyData.minusCoefExp;
            	} else if (openWindow == 3) {
					compName.innerHTML = compNameWord; 
					compCoef = legsData.minusCoefExp;
				} compResult.innerHTML = compCount; 
				compMoneyNum = Math.round(51 * Math.pow((1.25 - compCount * 0.0011), compCount - 1));
            	compMoney.innerHTML = numFormat.format(Math.round(compMoneyNum * compCoef)); 
            	compMoneyX2.innerHTML = numFormat.format(Math.round(compMoneyNum * compCoef) * 2);
				setTimeout(function() {
					slowShowMes(mesCompEnd);
				}, 600); 
			break;
			case 'btn-stay':
				slowHideMes(mesCompLeave);
			break;
			// Сообщение награда за соревнование *********************************************
			case 'btn-continue-comp':
				// Добавление денег
				charData.moneyNum += Math.round(compMoneyNum * compCoef);
				window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
				moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
				moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum));
				// Переход
				transFunc(transNum); slowHideMes(mesCompEnd); 
			break;
			case 'btn-watch-comp_1_':
				// Показ видеорекламы
				// showRewardVideo(); // if (!rewardFailFlag) rewarded.show();
				if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
					gdsdk.showAd('rewarded').then(response => {
						// Ad process done. You can track "SDK_REWARDED_WATCH_COMPLETE" event if that event triggered, that means the user watched the advertisement completely, you can give reward there.
						adNameFlag = 'reward';
					}).catch(error => {
						// An error catched. Please don't give reward here.
					});
				}
			break;
			// Сообщение о возможности использовать только одно зелье ************************
			case 'exit-mes-onlyuse':
				clearTimeout(timerOneUseMes); slowHideMes(mesOnlyUse);
			break;
			// Сообщение о невозможности использовать стимуляторы на локациях соревнований ***
			case 'exit-mes-cantuse':
				clearTimeout(timerCantUseMes); slowHideMes(mesCantUse);
			break;
			// // Сообщение оценки игры *********************************************************
			// case 'btn-rate-no':
			// 	slowHideMes(mesRate);
			// break;
			// case 'btn-rate-yes':
			// 	slowHideMes(mesRate);
			// 	mesData.mesRateFlag = true; window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
			// 	window.location.href = "https://play.google.com/store/apps/details?id=com.barsukstudio.muscleclicker";
			// break;
			// Сообщение об увеличении уровня ************************************************
			case 'exit-mes-lvlup':
				slowHideMes(mesLvlup);
			break;
			case 'btn-mes-lvlup':
				if (sound == 'on') buttonSound.play(); 
				slowHideMes(mesLvlup); openMenu(0); // Open menu
			break;
			// Mes Level Up 2 ****************************************************************
			case 'exit-mes-lvlup2':
				clearTimeout(timerLvlUp2Mes); slowHideMes(mesLvlup2);
			break;
			case 'btn-mes-lvlup2':
				if (sound == 'on') buttonSound.play(); 
				clearTimeout(timerLvlUp2Mes); slowHideMes(mesLvlup2); openMenu(0); // Open menu
			break;
			// Сообщение о стамине ***********************************************************
			case 'exit-mes-stamina':
				slowHideMes(mesStamina);
			break;
			// Сообщение о первой покупке ****************************************************
			case 'exit-mes-firstbuy':
				slowHideMes(mesFirstbuy); 
			break;
			case 'btn-mes-shop':
				if (sound == 'on') buttonSound.play(); 
				slowHideMes(mesFirstbuy); openMenu(2); 
				// if (!mesData.mesShopFlag) { // Сообщение продавца
				// 	mesShop.style.display = 'block'; moneyShopMA.style.display = 'none'; mesData.mesShopFlag = true;
				// 	window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
				// 	shopMesTimeout = setTimeout(function() {
				// 		mesShop.style.display = 'none'; moneyShopMA.style.display = 'block';
				// 	}, 10000);
				// } 
			break;
			// Сообщение перехода на соревнования *******************************************
			case 'exit-mes-trans2':
				slowHideMes(mesTrans2);
			break;
			case 'btn-mes-trans2':
				transNum = 2; canShowIntrst = true; transFunc(transNum); slowHideMes(mesTrans2);
			break;
			case 'btn-mes-trans3':
				transNum = 3; canShowIntrst = true; transFunc(transNum); slowHideMes(mesTrans2);
			break;
			// Сообщение перехода на bike ***************************************************
			// case 'exit-mes-trans':
			// 	slowHideMes(mesTrans);
			// break;
			// case 'btn-mes-trans':
			// 	transNum = 1; canShowIntrst = true; transFunc(transNum); slowHideMes(mesTrans);
			// break;
			// Стартовое сообщение **********************************************************
			// case 'exit-mes-start':
			// 	slowHideMes(mesStart); setTimeout(function() {slowShowMes(mesTrans);}, 600);
			// break;
		}
	}
}




// MENU CHAR ###############################################################################################################################
const btnCharMenu = document.getElementById('btn_x5F_menu_1_'), // Кнопка меню чара
progressBarsMenu = document.getElementById('progress-bars-menu'), // Группа прогресс баров опыта
// Уровень тела
bodyLvl = document.getElementById('body-lvl-number_1_'),
bodyExp = document.querySelector('.progress-body-exp'); // Progress-bar
bodyLvl.innerHTML = bodyData.bodyLvlNum;
// bodyExp.value = bodyData.bodyExpNum; bodyExp.max = bodyData.bodyMaxExpNum;
bodyExp.style.width = bodyData.bodyExpNum * 58 / bodyData.bodyMaxExpNum + '%';
// Уровень ног
const legsLvl = document.getElementById('legs-lvl-number_1_'),
legsExp = document.querySelector('.progress-legs-exp'); // Progress-bar
legsLvl.innerHTML = legsData.legsLvlNum;
// legsExp.value = legsData.legsExpNum; legsExp.max = legsData.legsMaxExpNum; 
legsExp.style.width = legsData.legsExpNum * 58 / legsData.legsMaxExpNum + '%';
// Прокачка тела
const bodyForce = document.getElementById('body-force-number_1_'), bodyNeedPoints = document.getElementById('body-force-need-number_1_'),
bodyForceBtnUp = document.getElementById('up-body-force_1_');
bodyForce.innerHTML = charData.bodyForceNum; bodyNeedPoints.innerHTML = charData.bodyNeedSpNum;
// Прокачка ног
const legsForce = document.getElementById('legs-force-number_1_'), legsNeedPoints = document.getElementById('legs-force-need-number_1_'),
legsForceBtnUp = document.getElementById('up-legs-force_1_');
legsForce.innerHTML = charData.legsForceNum; legsNeedPoints.innerHTML = charData.legsNeedSpNum;
// Прокачка выносливости
const stamina = document.getElementById('stamina-number_3_'), staminaNeedPoints = document.getElementById('stamina-need-number_3_'),
staminaBtnUp = document.getElementById('up-stamina_3_');
stamina.innerHTML = charData.stmNum; staminaNeedPoints.innerHTML = charData.stmNeedSpNum;
// Очки статусов
const statusPoints = document.getElementById('sp-number_1_');
statusPoints.innerHTML = charData.spNum;
// Палитра цветов
const paletteColor = document.getElementById('palette-color'), paletteHair = document.getElementById('palette-hairstyles'), 
paletteBeard = document.getElementById('palette-beards'), 
tshirtColor = document.querySelectorAll('.tshirt-color'), shortsColor = document.querySelectorAll('.shorts-color'),
hairColor = document.querySelectorAll('.hair-color'),
menuColors = [document.getElementById('color1-choice'),document.getElementById('color2-choice'),document.getElementById('color3-choice'),
	document.getElementById('color4-choice'),document.getElementById('color5-choice'),document.getElementById('color6-choice'),
	document.getElementById('color7-choice'),document.getElementById('color8-choice'),document.getElementById('color9-choice'),
	document.getElementById('color10-choice'),document.getElementById('color11-choice'),document.getElementById('color12-choice'),
	document.getElementById('color13-choice'),document.getElementById('color14-choice'),document.getElementById('color15-choice'),
	document.getElementById('color16-choice')];
// Флаг выбраной палитры майки или шорт
let paletteFlag = null;
const colorName = ["#EDF3F4","#FFF98F","#F7F119","#89C9A0","#2BAF49","#6AAED3","#1E6BC1","#AD84EF","#8A34D6","#EF7B86","#CC4040","#F4BD4D","#FC9003",
	"#936B49","#70481D","#2D2C05"];
// Colors Tshirt *******************************
let colorNumTshirt;
if (window.localStorage.getItem("colorNumTshirtKey1") !== null) {
	colorNumTshirt = +window.localStorage.getItem("colorNumTshirtKey1");
	for (let i = 0; i < tshirtColor.length; i++) tshirtColor[i].style.fill = colorName[colorNumTshirt];
} else colorNumTshirt = 0;
// Colors Shorts *******************************
let colorNumShorts;
if (window.localStorage.getItem("colorNumShortsKey1") !== null) {
	colorNumShorts = +window.localStorage.getItem("colorNumShortsKey1");
	for (let i = 0; i < shortsColor.length; i++) shortsColor[i].style.fill = colorName[colorNumShorts];
} else colorNumShorts = 3;
// Colors Hair *********************************
let colorNumHair;
if (window.localStorage.getItem("colorNumHairKey1") !== null) {
	colorNumHair = +window.localStorage.getItem("colorNumHairKey1"); 
	for (let i = 0; i < hairColor.length; i++) hairColor[i].style.fill = colorName[colorNumHair];
} else colorNumHair = 14;
// Hairstyles number ***************************
const menuHair = [document.getElementById('backgr-hair1-choice'),document.getElementById('backgr-hair2-choice'),
	document.getElementById('backgr-hair3-choice'),document.getElementById('backgr-hair4-choice'),document.getElementById('backgr-hair5-choice'),document.getElementById('backgr-hair6-choice'),document.getElementById('backgr-hair7-choice'),document.getElementById('backgr-hair8-choice'),document.getElementById('backgr-hair9-choice')];
let numHair;
if (window.localStorage.getItem("numHairKey1") !== null) numHair = +window.localStorage.getItem("numHairKey1"); 
else numHair = 0;
// Beards number *******************************
const menuBeards = [document.getElementById('backgr-beard1-choice'),document.getElementById('backgr-beard2-choice'),
	document.getElementById('backgr-beard3-choice'),document.getElementById('backgr-beard4-choice'),document.getElementById('backgr-beard5-choice'),document.getElementById('backgr-beard6-choice'),document.getElementById('backgr-beard7-choice'),document.getElementById('backgr-beard8-choice'),document.getElementById('backgr-beard9-choice')];
let numBeard;
if (window.localStorage.getItem("numBeardKey1") !== null) numBeard = +window.localStorage.getItem("numBeardKey1"); 
else numBeard = -1;




// MENU INVENTORY ##########################################################################################################################
const btnInventory = document.getElementById('btn_x5F_inventory_1_'),
// Inventory dumb and bike
inventaryDumb = document.getElementById('inventary-dumb'), inventaryBike = document.getElementById('inventory-bike');
// Стимуляторы в инвертаре  
let stimsInvent; 
const stim_invent = [
	[document.getElementById('stim_1-dumb'),document.getElementById('stim_2-dumb'),document.getElementById('stim_3-dumb'),
		document.getElementById('stim_4-dumb'),document.getElementById('stim_5-dumb'),document.getElementById('stim_6-dumb'),
		document.getElementById('stim_7-dumb')],
	[document.getElementById('stim_1-bike'),document.getElementById('stim_2-bike'),document.getElementById('stim_3-bike'),
		document.getElementById('stim_4-bike'),document.getElementById('stim_5-bike'),document.getElementById('stim_6-bike'),
		document.getElementById('stim_7-bike')]
],
stimQuantInvent = [
	[document.getElementById('quant-stim_1-dumb'),document.getElementById('quant-stim_2-dumb'),document.getElementById('quant-stim_3-dumb'),document.getElementById('quant-stim_4-dumb'),document.getElementById('quant-stim_5-dumb'),
		document.getElementById('quant-stim_6-dumb'),document.getElementById('quant-stim_7-dumb')],
	[document.getElementById('quant-stim_1-bike'),document.getElementById('quant-stim_2-bike'),document.getElementById('quant-stim_3-bike'),document.getElementById('quant-stim_4-bike'),document.getElementById('quant-stim_5-bike'),
		document.getElementById('quant-stim_6-bike'),document.getElementById('quant-stim_7-bike')]
],
// Гантели в инвертаре 
dumbsInvent = document.getElementById('dumbs-invent'),
dumb_invent = [document.getElementById('dumb1-invent'),document.getElementById('dumb2-invent'),document.getElementById('dumb3-invent'),
	document.getElementById('dumb4-invent'),document.getElementById('dumb5-invent'),document.getElementById('dumb6-invent'),
	document.getElementById('dumb7-invent'),document.getElementById('dumb8-invent'),document.getElementById('dumb9-invent'),
	document.getElementById('dumb10-invent'),document.getElementById('dumb11-invent'),document.getElementById('dumb12-invent'),
	document.getElementById('dumb13-invent'),document.getElementById('dumb14-invent'),document.getElementById('dumb15-invent'),
	document.getElementById('dumb16-invent'),document.getElementById('dumb17-invent'),document.getElementById('dumb18-invent'),
	document.getElementById('dumb19-invent'),document.getElementById('dumb20-invent'),document.getElementById('dumb21-invent'),
	document.getElementById('dumb22-invent'),document.getElementById('dumb23-invent'),document.getElementById('dumb24-invent')],
// Велотренажеры в инвертаре 
bikesInvent = document.getElementById('bikes-invent'),
bike_invent = [document.getElementById('bike1-invent'),document.getElementById('bike2-invent'),document.getElementById('bike3-invent'),document.getElementById('bike4-invent'),document.getElementById('bike5-invent'),document.getElementById('bike6-invent'),
	document.getElementById('bike7-invent'),document.getElementById('bike8-invent')];

// Inventory data *********************************************************************
let inventData;
if (window.localStorage.getItem("inventDataKey1") !== null) inventData = JSON.parse(window.localStorage.getItem("inventDataKey1")); 
else inventData = {
	// Флаги появления вещей в инвентарях
	dumbInventFlag: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
	bikeInventFlag: [true, false, false, false, false, false, false, false],
	// Количество стимуляторов в инвентаре
	stimInventNum: [0, 0, 0, 0, 0, 0, 0]
} // Появления стимуляторов в инвентаре
for (let i = 0; i < 7; i++) {
	stimQuantInvent[0][i].innerHTML = inventData.stimInventNum[i]; 
	stimQuantInvent[1][i].innerHTML = inventData.stimInventNum[i];
} // Появления гантелей в инвентаре 
for (let i = 0; i < 24; i++) {
	if (inventData.dumbInventFlag[i]) dumb_invent[i].style.display = 'block';
} // Появления велотренажеров в инвентаре 
for (let i = 0; i < inventData.bikeInventFlag.length; i++) {
	if (inventData.bikeInventFlag[i]) bike_invent[i].style.display = 'block';
} 





// MENU SHOP ################################################################################################################################
const btnShop = document.getElementById('btn_x5F_shop_1_'),
// Money and sp in shop menu 
moneyShopMA = document.getElementById('game-money-shop'), 
moneyShop = document.getElementById('money-number-shop'), spShop = document.getElementById('sp-number-shop'); 
moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum)); spShop.innerHTML = charData.spNum;	
// Message shop menu
// const mesShop = document.getElementById('mes-shop'), 
const bikesShop = document.getElementById('bikes-shop'), dumbsShop = document.getElementById('dumbs-shop'), 
stimsShop = document.getElementById('stims-shop'), purchsShop = document.getElementById('purchases'), 
// Items in shop menu
dumbShop = [document.getElementById('dumb1-shop'),document.getElementById('dumb2-shop'),
	document.getElementById('dumb3-shop'),document.getElementById('dumb4-shop'),document.getElementById('dumb5-shop'),
	document.getElementById('dumb6-shop'),document.getElementById('dumb7-shop'),document.getElementById('dumb8-shop'),
	document.getElementById('dumb9-shop'),document.getElementById('dumb10-shop'),document.getElementById('dumb11-shop'),
	document.getElementById('dumb12-shop'),document.getElementById('dumb13-shop'),document.getElementById('dumb14-shop'),
	document.getElementById('dumb15-shop'),document.getElementById('dumb16-shop'),document.getElementById('dumb17-shop'),
	document.getElementById('dumb18-shop'),document.getElementById('dumb19-shop'),document.getElementById('dumb20-shop'),
	document.getElementById('dumb21-shop'),document.getElementById('dumb22-shop'),document.getElementById('dumb23-shop'),
	document.getElementById('dumb24-shop')],
bikeShop = [document.getElementById('bike1-shop'),document.getElementById('bike2-shop'),document.getElementById('bike3-shop'),
	document.getElementById('bike4-shop'),document.getElementById('bike5-shop'),document.getElementById('bike6-shop'),
	document.getElementById('bike7-shop'),document.getElementById('bike8-shop')],
stimShop = [document.getElementById('stm-shop'),document.getElementById('bigstm-shop'),document.getElementById('str-shop'),
	document.getElementById('bigstr-shop'),document.getElementById('str_x5F_stm1-shop'),document.getElementById('str_x5F_stm2-shop'),
	document.getElementById('str_x5F_stm3-shop')],
purchShop = [document.getElementById('sp1-shop'),document.getElementById('sp2-shop'),document.getElementById('sp3-shop'),
	document.getElementById('sp4-shop'),document.getElementById('money1-shop'),document.getElementById('money2-shop'),
	document.getElementById('money3-shop'),document.getElementById('money4-shop')],
// Окна информации о предметах в магазине **************************************************************
infoShopMA = document.getElementById('game-info-shop'), 
infoDumbs = document.getElementById('info-dumbs'), infoBikes = document.getElementById('info-bikes'),
infoStims = document.getElementById('info-stims'), infoPurchs = document.getElementById('info-purchs'),
mesHavntMoney = document.getElementById('havent-money'), infoBackgr = document.getElementById('info-backgr'),
infoPurchWind = document.getElementById('info-purch-wind'), btnBuyItem = document.getElementById('buy-item'), 
infoDumb = [document.getElementById('info-dumb1'),document.getElementById('info-dumb2'),document.getElementById('info-dumb3'),
	document.getElementById('info-dumb4'),document.getElementById('info-dumb5'),document.getElementById('info-dumb6'),
	document.getElementById('info-dumb7'),document.getElementById('info-dumb8'),document.getElementById('info-dumb9'),
	document.getElementById('info-dumb10'),document.getElementById('info-dumb11'),document.getElementById('info-dumb12'),
	document.getElementById('info-dumb13'),document.getElementById('info-dumb14'),document.getElementById('info-dumb15'),
	document.getElementById('info-dumb16'),document.getElementById('info-dumb17'),document.getElementById('info-dumb18'),
	document.getElementById('info-dumb19'),document.getElementById('info-dumb20'),document.getElementById('info-dumb21'),
	document.getElementById('info-dumb22'),document.getElementById('info-dumb23'),document.getElementById('info-dumb24')],
infoBike = [document.getElementById('info-bike1'),document.getElementById('info-bike2'),document.getElementById('info-bike3'),
	document.getElementById('info-bike4'),document.getElementById('info-bike5'),document.getElementById('info-bike6'),
	document.getElementById('info-bike7'),document.getElementById('info-bike8')],
infoStim = [document.getElementById('info-stm'),document.getElementById('info-bigstm'),document.getElementById('info-str'),
	document.getElementById('info-bigstr'),document.getElementById('info-str_x5F_stm1'),document.getElementById('info-str_x5F_stm2'),
	document.getElementById('info-str_x5F_stm3')],
infoPurch = [document.getElementById('info-money1'),document.getElementById('info-money2'),document.getElementById('info-money3'),document.getElementById('info-sp1'),document.getElementById('info-sp2'),document.getElementById('info-sp3'),document.getElementById('info-money4'),document.getElementById('info-money5'),document.getElementById('info-sp4'),document.getElementById('info-sp5')],
// Цены предметов 
priceDumbElem = [document.getElementById('price-dumb1'),document.getElementById('price-dumb2'),document.getElementById('price-dumb3'),
	document.getElementById('price-dumb4'),document.getElementById('price-dumb5'),document.getElementById('price-dumb6'),
	document.getElementById('price-dumb7'),document.getElementById('price-dumb8'),document.getElementById('price-dumb9'),
	document.getElementById('price-dumb10'),document.getElementById('price-dumb11'),document.getElementById('price-dumb12'),
	document.getElementById('price-dumb13'),document.getElementById('price-dumb14'),document.getElementById('price-dumb15'),
	document.getElementById('price-dumb16'),document.getElementById('price-dumb17'),document.getElementById('price-dumb18'),
	document.getElementById('price-dumb19'),document.getElementById('price-dumb20'),document.getElementById('price-dumb21'),
	document.getElementById('price-dumb22'),document.getElementById('price-dumb23'),document.getElementById('price-dumb24')],
priceBikeElem = [document.getElementById('price-bike1'),document.getElementById('price-bike2'),document.getElementById('price-bike3'),
	document.getElementById('price-bike4'),document.getElementById('price-bike5'),document.getElementById('price-bike6'),
	document.getElementById('price-bike7'),document.getElementById('price-bike8')],
priceStimElem = [document.getElementById('price-stm'),document.getElementById('price-bigstm'),document.getElementById('price-str'),
	document.getElementById('price-bigstr'),document.getElementById('price-str_x5F_stm1'),document.getElementById('price-str_x5F_stm2'),
	document.getElementById('price-str_x5F_stm3')],
pricePurchElem = document.getElementById('info-purch-price');
let pricePurchNum = [0, 0, 0, 0];
// How much money and sp will be received
const infoItemReward = [document.getElementById('info-money1-num'),document.getElementById('info-money2-num'),document.getElementById('info-money3-num'),document.getElementById('info-sp1-num'),document.getElementById('info-sp2-num'),document.getElementById('info-sp3-num')],
// Watch video ********************************************************
btnWatchAds = document.getElementById('watch-ads'), //rewardMoney = Math.round(100 * Math.pow((1.2 - lvlNum * 0.0008), lvlNum - 1));
numAdsShop = document.getElementById('num-ads'); 
// let waitAdsShop;
// if (lang == 'ru-RU' || lang == 'ru') waitAdsShop = document.getElementById('wait-ads-rus'); 
// else if (lang == 'pt-BR' || lang == 'pt') waitAdsShop = document.getElementById('wait-ads-por'); 
// else waitAdsShop = document.getElementById('wait-ads-eng'); 
// waitAdsShop.style.display = 'none'; 
// Watch ads numbers
const watchAdsPurchConst = [1, 2, 3, 1, 2, 3];
let watchAdsPurchNum, rewardShopMoney, rewardShopSp;
if (window.localStorage.getItem("watchAdsPurchNumKey1") !== null) watchAdsPurchNum = JSON.parse(window.localStorage.getItem("watchAdsPurchNumKey1"));  
else watchAdsPurchNum = [1, 2, 3, 1, 2, 3];
// Цены предметов ***********************************************
// const priceDumbNum = [0,0,100,300,590,1130,2125,3910,7040,12385,21305,35795,58700,93920,146515,222700,329600,474630,664485,903695,1192880,1526885,1893340,2272000],
// priceBikeNum = [0,1430,9165,48180,205215,697330,1857365,3798885];
const priceDumbNum = [0,0,80,240,470,900,1700,3100,5600,9850,16950,28500,46700,74700,116600,177300,262500,378000,530000,722000,955000,1227000,1530000,1855000],
priceBikeNum = [0,1200,7800,41600,179000,615000,1660000,3470000];
// Флаг названия показываемой вещи в окне информации в магазине
let itemName = null, 
// Номера выбраных предметов в магазине *************************
numDumb = null, numBike = null, numStim = null, numPurch = null;
// Цены предметов ***********************************************
// Цены гантелей
for (let i = 0; i < priceDumbElem.length; i++) {
	priceDumbElem[i].innerHTML = priceDumbNum[i];
} // Цены велотренажеров
for (let i = 0; i < priceBikeElem.length; i++) {
	priceBikeElem[i].innerHTML = priceBikeNum[i];
} // Цены стимуляторов
let priceStimNum, priceStimConst = [40,90,80,180,270,400,550],
lvlNum = Math.max(bodyData.bodyLvlNum, legsData.legsLvlNum);
priceStimNum = priceStimConst.map(function(num) {return Math.round(num * Math.pow((1.23 - lvlNum * 0.0013), lvlNum - 1));});
for (let i = 0; i < priceStimElem.length; i++) priceStimElem[i].innerHTML = priceStimNum[i];





// MENU OPTIONS #########################################################################################################################
const btnOptions = document.getElementById('btn_x5F_options_1_'), 
creditWindow = document.getElementById('credit-window'),
langWindOpt = document.getElementById('lang-wind-opt'),
// Звуки 
noSoundElem = document.getElementById('no-sound'),
buttonSound = document.getElementById('button-sound'), moneySound = document.getElementById('money-sound'), 
drinkSound = document.getElementById('eating-sound'), failSound = document.getElementById('fail-sound'),
lvlupSound = document.getElementById('lvlup-sound'),
electroSound = [document.getElementById('electro-sound1'),document.getElementById('electro-sound2'),document.getElementById('electro-sound3')],
// Треки
soundTracks = document.getElementById('tracks'),
btnsTrack = [document.getElementById('btn-track_x5F_1'),document.getElementById('btn-track_x5F_2'),document.getElementById('btn-track_x5F_3')], 
// Фоны
backgrounds = document.getElementById('backgrounds'),
backgrMain = [document.getElementById('backgr-main1'),document.getElementById('backgr-main2'),document.getElementById('backgr-main3'),
	document.getElementById('backgr-main4'),document.getElementById('backgr-comp')],
backgrInvent = [document.getElementById('backgr-invent1'),document.getElementById('backgr-invent2'),
	document.getElementById('backgr-invent3'),document.getElementById('backgr-invent4'),document.getElementById('backgr-invent-comp')],
backgrShop = [document.getElementById('backgr-shop1'),document.getElementById('backgr-shop2'),document.getElementById('backgr-shop3'),
	document.getElementById('backgr-shop4'),document.getElementById('backgr-shop-comp')];
// Tacks data *******************************************************
let trackFlag;
if (window.localStorage.getItem("trackKey1") !== null) trackFlag = +window.localStorage.getItem("trackKey1");
else if (window.localStorage.getItem("trackKey1") == null) trackFlag = 0;
btnsTrack[trackFlag].style.opacity = '0.6';
// Volume setup *****************************************************
let sound, musikNotPlayFlag = false;
if (window.localStorage.getItem("volumeDataKey1") !== null) sound = window.localStorage.getItem("volumeDataKey1"); 
else sound = 'on';
// Флаг звуков 
if (sound == 'on') {
	noSoundElem.style.display = 'none'; electroSound[trackFlag].play();
	// if (electroSound[trackFlag].paused) musikNotPlayFlag = true;
} else if (sound == 'off') {
	noSoundElem.style.display = 'block'; electroSound[trackFlag].pause(); 
} 
// Background data **************************************************
let backgrFlag;
if (window.localStorage.getItem("backgrKey1") !== null) {
	backgrFlag = +window.localStorage.getItem("backgrKey1");
	if (typeof(backgrFlag) !== 'number') backgrFlag = 0;
} else backgrFlag = 0;
backgrMain[backgrFlag].style.display = 'block'; backgrInvent[backgrFlag].style.display = 'block'; backgrShop[backgrFlag].style.display = 'block';





// MAIN FUNCTIONS ###########################################################################################################################
// Touch and swipe functions *********************************************************************
function clickFuncStart() {
    moveFlag = false;
}
function clickFuncMove() {
    if (isMobile && !moveFlag) moveFlag = true;
}
// Touch and swipe functions 0.3 and 0 opacity btn ***********************************************
function clickFuncStart03(event) {
    moveFlag = false; 
    if (!mesClickFlag) event.target.style.opacity = '0.3';
}
function clickFuncMove03(event) {
    if (isMobile && !moveFlag) moveFlag = true;
    event.target.style.opacity = '0';
}
// Touch and swipe functions 0.6 and 0 opacity btn ***********************************************
function clickFuncStart06(event) {
    moveFlag = false; 
    if (!mesClickFlag) event.target.style.opacity = '0.6';
}
function clickFuncMove06(event) {
    if (isMobile && !moveFlag) moveFlag = true;
    event.target.style.opacity = '0.3';
}


// Востановление стамины *******************************************************************************************************************
let intervalRecStam = null, rotateNumHalf = false; // Флаг разделения на 2 rotateNumber
function recoveryStamina() {
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;
    function rafRecoveryStamina() {
        intervalRecStam = requestAnimationFrame(rafRecoveryStamina); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) { 
            while (dt >= step) {
	        	dt -= step;	k += 1;        
		    } // Проверка на стимуляторы
			if (openWindow < 2) charData.stmProgressNum += charData.recStmNum * stmK * k; 
			else charData.stmProgressNum += charData.recStmNum * k;
			// Остановка востановления стамины
			if (charData.stmProgressNum >= charData.stmMaxProgressNum) {
				charData.stmProgressNum = charData.stmMaxProgressNum; cancelAnimationFrame(intervalRecStam); startRecStamFlag = false;
			} // Увеличение силы после востановления > 20%
			if (openWindow < 2 && charData.stmProgressNum > charData.stmMaxProgressNum * 0.2 && rotateNumHalf) {
				rotateNumHalf = false; rotateNumber *= 2;
			} // Значение стамины в статус баре 
			// staminaProgress.value = charData.stmProgressNum;
			staminaProgress.style.width = charData.stmProgressNum * 67 / charData.stmMaxProgressNum + '%';
			k = 0;
		}
	} rafRecoveryStamina();
} // Востановление стамины если меньше 100% 
let startRecStamFlag = false; // Флаг запуска функции востановления стамины
if (charData.stmProgressNum < charData.stmMaxProgressNum && !startRecStamFlag) {
	startRecStamFlag = true; recoveryStamina();
}


// Функции изменения лица при физ нагрузке ************************************************************************************************
function changeMouth(disp, num) { 
	mouth2.style.display = disp;
	rightUpperEyelid.style.transform = 'translateY(' + num + 'px)'; rightLowerEyelid.style.transform = 'translateY(' + -num + 'px)'; 
	leftUpperEyelid.style.transform = 'translateY(' + num + 'px)'; leftLowerEyelid.style.transform = 'translateY(' + -num + 'px)';
	rightUpperEyelid.style.transform = 'translateY(' + num + 'px)'; rightLowerEyelid.style.transform = 'translateY(' + -num + 'px)'; 
	leftUpperEyelid.style.transform = 'translateY(' + num + 'px)'; leftLowerEyelid.style.transform = 'translateY(' + -num + 'px)';
}


// Функции появления и исчезновения элементов чара ****************************************************************************************
function bodyShowHideElem(disp) {
	bodys[numBody].style.display = disp; second_left_arms[numArms].style.display = disp; first_left_arms[numArms].style.display = disp; 
	second_right_arms[numArms].style.display = disp; first_right_arms[numArms].style.display = disp;
}
//bodyShowHideElem('block');
function legsShowHideElem(disp) {
	first_left_leg[numLegs].style.display = disp; second_left_leg[numLegs].style.display = disp; first_right_leg[numLegs].style.display = disp; 
	second_right_leg[numLegs].style.display = disp; underpant[numUnderpunts].style.display = disp;
}

// Функция отображения элементов чара *******************************************************************************************************
function initElem(disp) {
	char.style.display = disp;
    // Появление причесок 
    if (numHair > -1) hair[numHair].style.display = disp;
    // Появление бород 
    if (numBeard > -1) beard[numBeard].style.display = disp;
    // Появление элементов туловища и рук 
    bodyShowHideElem(disp);
	// Появление элементов ног 
    legsShowHideElem(disp);
}


// Slow show mes ******************************************************************************************************************************
let showMesIntrvl;
function slowShowMes(mes) { 
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0, opacNum = 0; 
	if (openWindow == 1) stopEng();
	else clickFlag = false;
	// Остановка интервала появления птицы и интервалов зелий
    if (menuOpenNum == null) {
        if (openWindow <= 1) {
			// Остановка интервала появления птицы
			if (showBirdIntvl !== null) {
				cancelAnimationFrame(showBirdIntvl); showBirdIntvl = null; 
			} // Остановка интервала зелий	
			if (timerData.useStimNum !== null && downTimerIntrvl !== null) {
				cancelAnimationFrame(downTimerIntrvl); downTimerIntrvl = null;
			} 
		} else if (openWindow >= 2 && downTimerCompIntrvl !== null) {
			cancelAnimationFrame(downTimerCompIntrvl); downTimerCompIntrvl = null;
		}
    } // Открытие сообщения
	mesClickFlag = true; messenges.style.display = 'block'; 
	mes.style.opacity = 0; mes.style.display = 'block';     
    function rafSlowShowMes() {
        showMesIntrvl = requestAnimationFrame(rafSlowShowMes); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step;	k += 1;
	        } opacNum += 0.03 * k; 
	        if (opacNum >= 1) {
	        	opacNum = 1; mesClickFlag = false; cancelAnimationFrame(showMesIntrvl);
	        } mes.style.opacity = opacNum;
	        k = 0;
	    }
    } rafSlowShowMes(); 
} 
// Slow hide mes *************************************************************************************************************************
const mesArray = [mesTrans2,mesStamina,mesFirstbuy,mesOnlyUse,mesCantUse,mesLvlup,mesLvlup2,mesRate,mesReward,mesCompLeave,mesCompEnd];
let hideMesIntrvl, notHideMes;
function slowHideMes(mes) {
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0, opacNum = 1;        
	mesClickFlag = true;
    function rafSlowShowMes() {
        hideMesIntrvl = requestAnimationFrame(rafSlowShowMes); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step;	k += 1;
	        } opacNum -= 0.06 * k; 
	        if (mes == mesLvlup2) opacNum -= 0.04;
	        if (opacNum <= 0) {
	        	// Запуск интервала зелий и появления птиц
	        	if (menuOpenNum == null) { 
		            if (openWindow <= 1) {
						// Запуск интервала зелий
						if (timerData.useStimNum !== null && downTimerIntrvl == null) downTimerStim(); 
						// Запуск интервала появления птицы
						if (showBirdIntvl == null && birds.style.display !== 'block') showBird(); 
					} else if (openWindow >= 2 && downTimerCompIntrvl == null) timerCompEnd();
				} // Исчезновение сообщения
	        	mesClickFlag = false; opacNum = 0; cancelAnimationFrame(hideMesIntrvl);
	        	mes.style.display = 'none';
	        	// Проверка на незакрытые сообщения 
	        	if (mesArray.some((elem) => elem.style.display == 'block')) {
	        		notHideMes = mesArray.filter((elem) => elem.style.display == 'block');
	        		notHideMes.forEach(function(item) {item.style.display = 'none'})
	        	} messenges.style.display = 'none';
	        } mes.style.opacity = opacNum;
	        k = 0;
	    }
    } rafSlowShowMes();
}



