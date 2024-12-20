"use strict";

// BTNS MENU ################################################################################################################################
const btnsMenu = document.getElementById('btns-menu'),
menuWindow = [document.getElementById('map-menu'),document.getElementById('char-menu'),document.getElementById('shop-menu'),document.getElementById('options-menu')];
let menuOpenNum = -1;

btnsMenu.addEventListener(clickDownEvent, clickFuncStart03);
btnsMenu.addEventListener(clickMoveEvent, clickFuncMove03);
btnsMenu.addEventListener(clickUpEvent, btnsMenuFunc);

function btnsMenuFunc(event) {
	if (!moveFlag && !clickFlag) {
		switch (event.target.id) {
			case 'btn-locs': openMenu(0); break;
			case 'btn-menu': openMenu(1); break;
			case 'btn-shop': openMenu(2); break;
			case 'btn-options':openMenu(3); break;
		} event.target.style.opacity = '0';
	}	
}
function openMenu(num) { 
	pauseEngine();
	// Установка нового номера и открытие меню 
	menuOpenNum = num; menuWindow[menuOpenNum].style.display = 'block'; 
	// Появление прогресс баров в меню чара
	if (menuOpenNum == 0) shineBtnMap(btnMapLoc[locNum]);
	else if (menuOpenNum == 1) {
		// progressExpMenu.value = expNum; progressExpMenu.max = maxExpNum;
		progressExpMenu.style.width = expNum * 25.7 / maxExpNum + '%';
		lvlMenu.innerHTML = lvlNum;
	} else if (menuOpenNum == 2) {
		moneyShopQuant.innerHTML = numFormat.format(Math.round(moneyNum));
		spShopQuant.innerHTML = spNum;
	}
}
function closeMenu(num) { 
	if (num == 0) {
		cancelAnimationFrame(shineBtnMapIntrvl); shineBtnMapIntrvl = false;
	} 
	menuWindow[num].style.display = 'none'; 
	menuOpenNum = -1;
	// Show tutorial
	if (!finishTutorialFlag) {
		mesTutorialMA.style.display = 'block'; mesTutorial[numTutorial].style.display = 'block';
	} else continueEngine();
}





// MAP MENU ###################################################################################################################################
const btnsMapChar = document.getElementById('btns-loc-menu'), btnExitMapMenu = document.getElementById('exit-map-menu-group'),
cityMA = document.getElementById('city-ma'); cityMA.style.display = 'block'; 
const city = [document.getElementById('city_1'),document.getElementById('city_2'),document.getElementById('city_3'),document.getElementById('city_4'),document.getElementById('city_5'),document.getElementById('city_6'),document.getElementById('city_7'),document.getElementById('city_8'),document.getElementById('city_9'),document.getElementById('city_10'),document.getElementById('city_11'),document.getElementById('city_12')],
windows = [document.querySelectorAll('.windows_0'),document.querySelectorAll('.windows_1'),document.querySelectorAll('.windows_2'),document.querySelectorAll('.windows_3'),document.querySelectorAll('.windows_4'),document.querySelectorAll('.windows_5'),document.querySelectorAll('.windows_6'),document.querySelectorAll('.windows_7'),document.querySelectorAll('.windows_8'),document.querySelectorAll('.windows_9'),document.querySelectorAll('.windows_10'),document.querySelectorAll('.windows_11')],
btnMapLoc = [document.getElementById('btn-city-1'),document.getElementById('btn-city-2'),document.getElementById('btn-city-3'),document.getElementById('btn-city-4'),document.getElementById('btn-city-5'),document.getElementById('btn-city-6'),document.getElementById('btn-city-7'),document.getElementById('btn-city-8'),document.getElementById('btn-city-9'),document.getElementById('btn-city-10'),document.getElementById('btn-city-11'),document.getElementById('btn-city-12')];
// Loc number ************************************************************
let locNum;
if (window.localStorage.getItem("locNumKey5") !== null) locNum = +window.localStorage.getItem("locNumKey5");
else locNum = 0;
// Flags of available loc ************************************************
let locAvailFlag;
if (window.localStorage.getItem("locAvailFlagKey5") !== null) locAvailFlag = JSON.parse(window.localStorage.getItem("locAvailFlagKey5")); 
else locAvailFlag = [true,false,false,false,false,false,false,false,false,false,false,false];
// Button illumination
for (let i = 0; i < 12; i++) {
	if (locAvailFlag[i]) {
		btnMapLoc[i].style.opacity = '0'; btnMapLoc[i].style.fill = '#00FF36';
	} else {
		btnMapLoc[i].style.opacity = '0.6'; btnMapLoc[i].style.fill = '#000';
	}
} // btnMapLoc[locNum].style.opacity = '0.3'; 
// Shine choice btn loc
let shineBtnMapIntrvl = false;
function shineBtnMap(btn) {
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0,
	posFlag = 1, opacNum = 0, count = 0;
	//if (soundData.soundFlag == 'on') failSound.play(); 
	btn.style.opacity = opacNum + '';
	if (shineBtnMapIntrvl) cancelAnimationFrame(shineBtnMapIntrvl);
    function rafShineBtnMap() {
        shineBtnMapIntrvl = requestAnimationFrame(rafShineBtnMap); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step; k += 1;
	        } 
	        if (posFlag == 1) {
				opacNum += 0.0075 * k;
				if (opacNum >= 0.3) {
					opacNum = 0.3; posFlag = 2;
				} 
			} else if (posFlag == 2) {
				opacNum -= 0.0075 * k;
				if (opacNum <= 0) {
					opacNum = 0; posFlag = 1; count += 1;
				} 
			} btn.style.opacity = opacNum + ''; 
			k = 0;
			// console.log('shineBtnMap');
		}
	} rafShineBtnMap();
}

// Show loc and set viewBox **********************************************
city[locNum].style.display = 'block';
const viewBoxX = [9200, 9800, 9500, 9580, 9510, 9210, 9240, 10120, 10820, 10425, 12970, 12970]; //[9200, 9800, 9500, 9580, 9510, 9210, 9240, 10120, 10820, 10425, 12970, 12970];
cityMA.setAttribute('viewBox', '0 0 ' + viewBoxX[locNum] + ' 1080');
// Loc data **************************************************************
const cityData = [ 
	[23, 1, 28, 1],
	[42, 2, 48, 1], // 1 - 46;
	[86, 4, 96, 1], // 1 - 92;
	[134, 8, 144, 1.35], // 1 - 136
	[170, 10, 184, 2], // 1 - 174
	[219, 13, 232, 3.1], // 1 - 219
	[304, 16, 320, 4.6], // 1 - 304
	[378, 22, 400, 7.25], // 1 - 378
	[516, 28, 544, 10.65], // 1 - 516
	[770, 46, 816, 14.45], // 1 - 770
	[987, 59, 1096, 21.5], // 1 - 1037
	[1209, 69, 1298, 36.3], // 1 - 1229
];
let numX = -(cityMA.clientWidth - document.documentElement.clientWidth) / cityData[locNum][0], // Значение прокрутки с каждым заженным окном
startX = cityData[locNum][1], // Номер окна с которого начинается прокрутка
startReturnX = cityData[locNum][2], // // Номер окна с которого начинается прокрутка в обратную сторону
maxX = -(cityMA.clientWidth - document.documentElement.clientWidth), // Максимальное значение прокрутки
windK = cityData[locNum][3], // Множитель windowNum
colorWind; 
// if (locNum < 4) colorWind = "#4F4748";
// else colorWind = "#666162";

// Event listener btns ***************************************************************
btnsMapChar.addEventListener(clickDownEvent, menuMapStart, false);
btnsMapChar.addEventListener(clickMoveEvent, menuMapMove, false);
btnsMapChar.addEventListener(clickUpEvent, menuMapEnd, false);

function menuMapStart(event) {
	moveFlag = false; 
    if (event.target.style.opacity == '0') event.target.style.opacity = '0.3';
}
function menuMapMove(event) {
	if (isMobileFlag && !moveFlag) moveFlag = true;
    if (event.target.style.opacity == '0.3' && event.target !== btnMapLoc[locNum]) event.target.style.opacity = '0'; // && event.target.id !== btnMapLoc[locNum].id
}
function menuMapEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-city-1': openLoc(0); break;
			case 'btn-city-2': openLoc(1); break;
			case 'btn-city-3': openLoc(2); break;
			case 'btn-city-4': openLoc(3); break;
			case 'btn-city-5': openLoc(4); break;
			case 'btn-city-6': openLoc(5); break;
			case 'btn-city-7': openLoc(6); break;
			case 'btn-city-8': openLoc(7); break;
			case 'btn-city-9': openLoc(8); break;
			case 'btn-city-10': openLoc(9); break;
			case 'btn-city-11': openLoc(10); break;
			case 'btn-city-12': openLoc(11); break;
		} 
	}
}
function openLoc(num) {
	if (locAvailFlag[num]) {
		stopEngine(); 
		// Hide old loc
		cancelAnimationFrame(shineBtnMapIntrvl); shineBtnMapIntrvl = false;
		city[locNum].style.display = 'none'; btnMapLoc[locNum].style.opacity = '0';
		// Set new location number 
		locNum = num; window.localStorage.setItem("locNumKey5", locNum); 
		// Show new loc
		city[locNum].style.display = 'block'; shineBtnMap(btnMapLoc[locNum]); //btnMapLoc[locNum].style.opacity = '0.3'; 
		// New loc data
		cityMA.setAttribute('viewBox', '0 0 ' + viewBoxX[locNum] + ' 1080');
		numX = -(cityMA.clientWidth - document.documentElement.clientWidth) / cityData[locNum][0];
		startX = cityData[locNum][1];
		startReturnX = cityData[locNum][2];
		maxX = -(cityMA.clientWidth - document.documentElement.clientWidth);
		windK = cityData[locNum][3];
		closeMenu(0);
		// Show mes rate and inter
		countShowMesRate += 1; 
		intrstCount += 1;
	    // if (!mesData.mesRateFlag && countShowMesRate >= 6) {
	    //     countShowMesRate = 0; slowShowMes(mesRate);
	    // } else 
		if (intrstCount >= 4 && !intrstFailFlag) {
			// showInterVideo();
			if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
				adNameFlag = 'inter';
				gdsdk.showAd();
			}
		} // window.localStorage.setItem("countShowMesRateKey5", countShowMesRate);
	} // Звуковой сигнал запрета  
	else if (!locAvailFlag[num] && soundData.soundFlag == 'on') failSound.play();
	// Отмена подсветки
	if (event.target.style.opacity == '0.3' && event.target !== btnMapLoc[locNum]) event.target.style.opacity = '0';
}

// Event listener exit char menu 
btnExitMapMenu.addEventListener(clickDownEvent, clickFuncStart03, false);
btnExitMapMenu.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnExitMapMenu.addEventListener(clickUpEvent, menuMapExit, false);

function menuMapExit(event) {
	if (!moveFlag) {
		closeMenu(0);
		event.target.style.opacity = '0';
	}
}





// CHAR MENU ####################################################################################################################################
const btnsMenuChar = document.getElementById('btns-up-char-menu'), btnExitCharMenu = document.getElementById('btn-exit-char-menu'),
// Char lvl
lvlMenu = document.getElementById('lvl-char-menu'),
progressExpMenu = document.getElementById('progress-exp-menu');
// Pump str ************************************************************************
// Char Str 
let charStr;
if (window.localStorage.getItem("charStrKey5") !== null) charStr = +window.localStorage.getItem("charStrKey5");
else charStr = 0.04;
// Str num
let strLvlNum;
if (window.localStorage.getItem("strLvlNumKey5") !== null) strLvlNum = +window.localStorage.getItem("strLvlNumKey5");
else strLvlNum = 1;
const strMenuLvl = document.getElementById('str-num'); strMenuLvl.innerHTML = strLvlNum;
// Need str num
let strNeedNum;
if (window.localStorage.getItem("strNeedNumKey5") !== null) strNeedNum = +window.localStorage.getItem("strNeedNumKey5");
else strNeedNum = 1;
const strMenuNeed = document.getElementById('str-need-num'); strMenuNeed.innerHTML = strNeedNum;
// Pump int ************************************************************************
// Char Int 
let charInt;
if (window.localStorage.getItem("charIntKey5") !== null) charInt = +window.localStorage.getItem("charIntKey5");
else charInt = 1;
// Int num
let intLvlNum;
if (window.localStorage.getItem("intLvlNumKey5") !== null) intLvlNum = +window.localStorage.getItem("intLvlNumKey5");
else intLvlNum = 1;
const intMenuLvl = document.getElementById('int-num'); intMenuLvl.innerHTML = intLvlNum;
// Need int num
let intNeedNum;
if (window.localStorage.getItem("intNeedNumKey5") !== null) intNeedNum = +window.localStorage.getItem("intNeedNumKey5");
else intNeedNum = 1;
const intMenuNeed = document.getElementById('int-need-num'); intMenuNeed.innerHTML = intNeedNum;
// Pump stm ************************************************************************
// Recovery stm
let recStm;
if (window.localStorage.getItem("recStmKey5") !== null) recStm = +window.localStorage.getItem("recStmKey5");
else recStm = 0.002;
// Stm num
let stmLvlNum;
if (window.localStorage.getItem("stmLvlNumKey5") !== null) stmLvlNum = +window.localStorage.getItem("stmLvlNumKey5");
else stmLvlNum = 1;
const stmMenuLvl = document.getElementById('stm-num'); stmMenuLvl.innerHTML = stmLvlNum;
// Need stm num
let stmNeedNum;
if (window.localStorage.getItem("stmNeedNumKey5") !== null) stmNeedNum = +window.localStorage.getItem("stmNeedNumKey5");
else stmNeedNum = 1;
const stmMenuNeed = document.getElementById('stm-need-num'); stmMenuNeed.innerHTML = stmNeedNum;
// Очки статусов *******************************************************************
let spNum;
if (window.localStorage.getItem("spNumKey5") !== null) spNum = +window.localStorage.getItem("spNumKey5");
else spNum = 0;
const spMenu = document.getElementById('sp-num'), spMenuGroup = document.getElementById('sp-group');
spMenu.innerHTML = spNum;
// Add sp num
let addSpNum;
if (window.localStorage.getItem("addSpNumKey5") !== null) addSpNum = +window.localStorage.getItem("addSpNumKey5");
else addSpNum = 1;

// Event listener btns ***************************************************************
btnsMenuChar.addEventListener(clickDownEvent, clickFuncStart06, false);
btnsMenuChar.addEventListener(clickMoveEvent, clickFuncMove06, false);
btnsMenuChar.addEventListener(clickUpEvent, menuCharEnd, false);

function menuCharEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-up-str':
				if (strLvlNum < 100 && spNum >= strNeedNum) {
					if (soundData.soundFlag == 'on') buttonSound.play(); 
					strLvlNum += 1; window.localStorage.setItem("strLvlNumKey5", strLvlNum); 
					strMenuLvl.innerHTML = strLvlNum;
					// Отнимание sp
					spNum -= strNeedNum; window.localStorage.setItem("spNumKey5", spNum); 
					// Change need sp num
					if (strLvlNum % 4 == 0) {
						strNeedNum += 1; window.localStorage.setItem("strNeedNumKey5", strNeedNum);
						strMenuNeed.innerHTML = strNeedNum;
					} spMenu.innerHTML = spNum;	
					// Увеличение str 
					charStr += 0.004; //(0.006 + 0.0006 * lvlNum)
					window.localStorage.setItem("charStrKey5", charStr);				
				} // Звуковой сигнал нехватки sp + функция покраснения количества sp
				else if (strLvlNum < 100 && spNum < strNeedNum) shakeElem(spMenuGroup, spMenu, '#FFFFFF');
			break;
			case 'btn-up-int':
				if (intLvlNum < 100 && spNum >= intNeedNum) {
					if (soundData.soundFlag == 'on') buttonSound.play(); 
					intLvlNum += 1; window.localStorage.setItem("intLvlNumKey5", intLvlNum); 
					intMenuLvl.innerHTML = intLvlNum;
					// Отнимание sp
					spNum -= intNeedNum; window.localStorage.setItem("spNumKey5", spNum); 
					// Change need sp num
					if (intLvlNum % 4 == 0) {
						intNeedNum += 1; window.localStorage.setItem("intNeedNumKey5", intNeedNum); 
						intMenuNeed.innerHTML = intNeedNum;
					} spMenu.innerHTML = spNum;	
					// Увеличение int
					charInt += intLvlNum * intLvlNum * 0.1; window.localStorage.setItem("charIntKey5", charInt);
				} // Shake elem
				else if (intLvlNum < 100 && spNum < intNeedNum) shakeElem(spMenuGroup, spMenu, '#FFFFFF');
			break;
			case 'btn-up-stm':
				if (stmLvlNum < 100 && spNum >= stmNeedNum) {
					if (soundData.soundFlag == 'on') buttonSound.play(); 
					stmLvlNum += 1; window.localStorage.setItem("stmLvlNumKey5", stmLvlNum); 
					stmMenuLvl.innerHTML = stmLvlNum;
					// Отнимание sp
					spNum -= stmNeedNum; window.localStorage.setItem("spNumKey5", spNum); 
					// Change need sp num
					if (stmLvlNum % 4 == 0) {
						stmNeedNum += 1; window.localStorage.setItem("stmNeedNumKey5", stmNeedNum); 
						stmMenuNeed.innerHTML = stmNeedNum;
					} spMenu.innerHTML = spNum;	
					// Увеличение stm
					maxStmNum += 0.1; //(0.2 + 0.02 * lvlNum)
					window.localStorage.setItem("maxStmNumKey5", maxStmNum); 
					recStm += 0.0004; //(0.0006 + 0.00006 * lvlNum)
					window.localStorage.setItem("recStmKey5", recStm);  
					progressStm.style.width = stmNum * 25.7 / maxStmNum + '%'; //progressStm.max = maxStmNum; 		
					// Start recoveryStamina()
					if (!recStamIntrvl) recoveryStamina();
				} // Звуковой сигнал нехватки sp + функция покраснения количества sp
				else if (stmLvlNum < 100 && spNum < stmNeedNum) shakeElem(spMenuGroup, spMenu, '#FFFFFF');
			break;
		} // Отмена подсветки
		event.target.style.opacity = '0.3';
	}
}

// Event listener exit char menu *********************************************************
btnExitCharMenu.addEventListener(clickDownEvent, clickFuncStart03, false);
btnExitCharMenu.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnExitCharMenu.addEventListener(clickUpEvent, menuCharExit, false);

function menuCharExit(event) {
	if (!moveFlag) {
		closeMenu(1);
		event.target.style.opacity = '0';
	}
}





// SHOP MENU ################################################################################################################################
const moneyShopGroup = document.getElementById('money-shop'),
moneyShopQuant = document.getElementById('money-shop-num'), spShopQuant = document.getElementById('sp-shop-num'); 
moneyShopQuant.innerHTML = numFormat.format(Math.round(moneyNum)); spShopQuant.innerHTML = numFormat.format(Math.round(spNum));
// Generators group
const generBtnsGroupShop = document.getElementById('gener-btns-group-shop'),
// Generators group
skinBtnsGroupShop = document.getElementById('skin-btns-group-shop'),
// Stimulators group
stimBtnsGroupShop = document.getElementById('stim-btns-group-shop'),
// Purchases group
purchBtnsGroupShop = document.getElementById('purch-btns-group-shop');

// Info window ********************************************************************
const infoShopWind = document.getElementById('info-shop-wind'),
// Btn buy group
buyPriceGroup = document.getElementById('buy-price-group'), 
itemPriceGroup = document.getElementById('price-info'), itemPriceInfo = document.getElementById('price-info-num'), 
itemPurchPriceInfo = document.getElementById('price-info-purch-num');
let priceNum = 0;
// btnBuy = document.getElementById('btn-buy'), buyText = document.getElementById('buy-text'),
// Btn select group
const useSelectGroup = document.getElementById('use-select-group'),
selectText = document.getElementById('select-text'), useText = document.getElementById('use-text'),
// Btn watch ads group
buyAdsGroup = document.getElementById('buy-ads-group'), btnWatchAdInfo = document.getElementById('btn-watch-ad'),
numAdsInfo = document.getElementById('num-ads'), waitAdsInfo = document.getElementById('wait-ads');
let rewardShopMoney, rewardShopSp,
// The number of the selected item in the store
selectItemNum = 0;


// Generators info **************************************************************************************************************************
const generatorsInfoGroup = document.getElementById('generators-info'),
generatorInfo = [document.getElementById('generator-1-info'),document.getElementById('generator-2-info'),document.getElementById('generator-3-info'),document.getElementById('generator-4-info'),document.getElementById('generator-5-info'),document.getElementById('generator-6-info'),document.getElementById('generator-7-info'),document.getElementById('generator-8-info'),document.getElementById('generator-9-info'),document.getElementById('generator-10-info'),document.getElementById('generator-11-info'),document.getElementById('generator-12-info'),document.getElementById('generator-13-info'),document.getElementById('generator-14-info')],
generHaveElem = [document.getElementById('gener-have-elem-1'),document.getElementById('gener-have-elem-2'),document.getElementById('gener-have-elem-3'),document.getElementById('gener-have-elem-4'),document.getElementById('gener-have-elem-5'),document.getElementById('gener-have-elem-6'),document.getElementById('gener-have-elem-7'),document.getElementById('gener-have-elem-8'),document.getElementById('gener-have-elem-9'),document.getElementById('gener-have-elem-10'),document.getElementById('gener-have-elem-11'),document.getElementById('gener-have-elem-12'),document.getElementById('gener-have-elem-13'),document.getElementById('gener-have-elem-14')];
// Show gener have elements
for (let i = 0; i < generAvailFlag.length; i++) {
	if (generAvailFlag[i]) generHaveElem[i].style.display = 'block'; 
} // Gener info energy data
const generEnergyInfoGroup = document.getElementById('gener-energy-group-info'), generEnergyInfo = document.getElementById('gener-energy-info');
let generInfoEnergyNum = 0;
// Gener info hp data
const generHpInfoGroup = document.getElementById('gener-hp-group-info'), generHpInfo = document.getElementById('gener-hp-info');
let generInfoHpNum = 0;

// Event listener generators group 
generBtnsGroupShop.addEventListener(clickDownEvent, clickFuncStart03, false);
generBtnsGroupShop.addEventListener(clickMoveEvent, clickFuncMove03, false);
generBtnsGroupShop.addEventListener(clickUpEvent, generatorsShopEnd, false);

function generatorsShopEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			// Generators
			case 'btn-gener-1-shop': selectGenerator(0); break;
			case 'btn-gener-2-shop': selectGenerator(1); break;
			case 'btn-gener-3-shop': selectGenerator(2); break;
			case 'btn-gener-4-shop': selectGenerator(3); break;
			case 'btn-gener-5-shop': selectGenerator(4); break;
			case 'btn-gener-6-shop': selectGenerator(5); break;
			case 'btn-gener-7-shop': selectGenerator(6); break;
			case 'btn-gener-8-shop': selectGenerator(7); break;
			case 'btn-gener-9-shop': selectGenerator(8); break;
			case 'btn-gener-10-shop':selectGenerator(9); break;
			case 'btn-gener-11-shop':selectGenerator(10);break;
			case 'btn-gener-12-shop':selectGenerator(11);break;
			case 'btn-gener-13-shop':selectGenerator(12);break;
			case 'btn-gener-14-shop':selectGenerator(13);break;
			case 'btn-gener-15-shop':selectGenerator(14);break;
		} // Отмена подсветки
		event.target.style.opacity = '0';
	}
}
function selectGenerator(num) {
	selectItemNum = num; infoShopWind.style.display = 'block'; 
	generatorsInfoGroup.style.display = 'block'; generatorInfo[selectItemNum].style.display = 'block';
	// Btn select
	if (generAvailFlag[selectItemNum]) {
		useSelectGroup.style.display = 'block'; selectText.style.display = 'block';
	} // Btn buy with price
	else {
		buyPriceGroup.style.display = 'block'; itemPriceGroup.style.display = 'block';
		priceNum = Math.floor(Math.pow(2.5, (selectItemNum - 1)) * 2000); // * 400
		centerPos(priceNum, itemPriceGroup);
		itemPriceInfo.innerHTML = numFormat.format(priceNum);
	} // Energy info
	generInfoEnergyNum = (Math.pow(2, (selectItemNum + 2)) * Math.pow(1.5, (generUpgrLvl[selectItemNum] - 1))) * 2.5;
	centerPos(generInfoEnergyNum, generEnergyInfoGroup);
	generEnergyInfo.innerHTML = numFormat.format(Math.round(generInfoEnergyNum));
	// Hp info
	generInfoHpNum = generHpMaxNum[selectItemNum]; 
	centerPos(generInfoHpNum, generHpInfoGroup);
	generHpInfo.innerHTML = numFormat.format(Math.round(generInfoHpNum));
}


// Skins info ********************************************************************************************************************************
const skinsInfoGroup = document.getElementById('skins-info'),
skinsInfo = [document.getElementById('skin-1-info'),document.getElementById('skin-2-info'),document.getElementById('skin-3-info'),document.getElementById('skin-4-info'),document.getElementById('skin-5-info'),document.getElementById('skin-6-info'),document.getElementById('skin-7-info')],
skinsHaveElem = [document.getElementById('skin-have-elem-1'),document.getElementById('skin-have-elem-2'),document.getElementById('skin-have-elem-3'),document.getElementById('skin-have-elem-4'),document.getElementById('skin-have-elem-5'),document.getElementById('skin-have-elem-6'),document.getElementById('skin-have-elem-7')],
// Locked elem
skinLockedElem = document.getElementById('locked-skin-elem'), skinLockedLvl = document.getElementById('locked-skin-lvl'); 
// Flags of available skins 
let skinsAvailFlag;
if (window.localStorage.getItem("skinsAvailFlagKey5") !== null) skinsAvailFlag = JSON.parse(window.localStorage.getItem("skinsAvailFlagKey5")); 
else skinsAvailFlag = [true,false,false,false,false,false,false];
// Show skins have elements
for (let i = 0; i < skinsAvailFlag.length; i++) {
	if (skinsAvailFlag[i]) skinsHaveElem[i].style.display = 'block'; 
} 
// Skin number
let skinNum;
if (window.localStorage.getItem("skinNumKey5") !== null) skinNum = +window.localStorage.getItem("skinNumKey5");
else skinNum = 0;
// Show clothes on char
choiceSkin(skinNum, 'block');

function choiceSkin(num, display) {
	// Show new clothes
	head_Char[num].style.display = display; body_Char[num].style.display = display;
	if (f_r_arm_Char[num] !== null) f_r_arm_Char[num].style.display = display;
	s_r_arm_Char[num].style.display = display;
	if (f_l_arm_Char[num] !== null) f_l_arm_Char[num].style.display = display;
	s_l_arm_Char[num].style.display = display;
	if (f_r_leg_Char[num] !== null) f_r_leg_Char[num].style.display = display;
	s_r_leg_Char[num].style.display = display; r_foot_Char[num].style.display = display;
	if (f_l_leg_Char[num] !== null) f_l_leg_Char[num].style.display = display;
	s_l_leg_Char[num].style.display = display; l_foot_Char[num].style.display = display;
	ass_Char[num].style.display = display;
}

// Event listener generators group 
skinBtnsGroupShop.addEventListener(clickDownEvent, clickFuncStart03, false);
skinBtnsGroupShop.addEventListener(clickMoveEvent, clickFuncMove03, false);
skinBtnsGroupShop.addEventListener(clickUpEvent, scinsShopEnd, false);

function scinsShopEnd(event) { 
	if (!moveFlag) {
		switch (event.target.id) {
			// Generators
			case 'btn-skin-1-shop': selectSkin(0); break;
			case 'btn-skin-2-shop': selectSkin(1); break;
			case 'btn-skin-3-shop': selectSkin(2); break;
			case 'btn-skin-4-shop': selectSkin(3); break;
			case 'btn-skin-5-shop': selectSkin(4); break;
			case 'btn-skin-6-shop': selectSkin(5); break;
			case 'btn-skin-7-shop': selectSkin(6); break;
			case 'btn-skin-8-shop': selectSkin(7); break;
		} // Отмена подсветки
		event.target.style.opacity = '0';
	}
}
function selectSkin(num) { 
	selectItemNum = num;
	infoShopWind.style.display = 'block'; skinsInfoGroup.style.display = 'block'; // skinsInfo[selectItemNum].style.display = 'block';
	// Show char
	charArea.append(char);
	char.style.transform = 'translate(' + (42 + w_left_hide) + '%, -280px)'; hba.style.WebkitTransform = 'rotate(0deg)';
	l_leg.style.WebkitTransform = 'rotate(70deg)'; l_f_leg.style.WebkitTransform = 'rotate(-80deg)'; l_foot.style.WebkitTransform = 'rotate(13deg)';
	r_leg.style.WebkitTransform = 'rotate(10deg)'; r_f_leg.style.WebkitTransform = 'rotate(0deg)'; r_foot.style.WebkitTransform = 'rotate(-10deg)';
	r_arm.style.WebkitTransform = 'rotate(5deg)'; f_r_arm.style.WebkitTransform = 'rotate(0deg)';
	l_arm.style.WebkitTransform = 'rotate(-5deg)'; f_l_arm.style.WebkitTransform = 'rotate(0deg)';
	// Show clothes on char
	choiceSkin(skinNum, 'none');
	choiceSkin(selectItemNum, 'block');
	// Btn select or locked elem
	if (skinsAvailFlag[selectItemNum]) {
		useSelectGroup.style.display = 'block'; selectText.style.display = 'block';
	} else {
		let n;
		if (langNum == 1) n = 'Ур';
		else n = 'Lvl';
		skinLockedElem.style.display = 'block';
		if (selectItemNum == 1) skinLockedLvl.innerHTML = '6 ' + n;
		else if (selectItemNum == 2) skinLockedLvl.innerHTML = '11 ' + n;
		else if (selectItemNum == 3) skinLockedLvl.innerHTML = '15 ' + n;
		else if (selectItemNum == 4) skinLockedLvl.innerHTML = '18 ' + n;
		else if (selectItemNum == 5) skinLockedLvl.innerHTML = '20 ' + n;
		else if (selectItemNum == 6) skinLockedLvl.innerHTML = '21 ' + n;
	} // Price
	// itemPriceGroup.style.display = 'block';
	// priceNum = Math.floor(Math.pow(2.5, (selectItemNum - 1)) * 2000); // * 400
	// centerPos(priceNum, itemPriceGroup);
	// itemPriceInfo.innerHTML = numFormat.format(priceNum);
}


// Stimulators info ***************************************************************************************************************************
const stimulatorsInfoGroup = document.getElementById('stimulators-info'),
stimInfo = [document.getElementById('info-stim-1'),document.getElementById('info-stim-2'),document.getElementById('info-stim-3'),document.getElementById('info-stim-4'),document.getElementById('info-stim-5'),document.getElementById('info-stim-6'),document.getElementById('info-stim-7'),document.getElementById('info-stim-8'),document.getElementById('info-stim-9')],
quantStim = [document.getElementById('quant-stim-1-shop'),document.getElementById('quant-stim-2-shop'),document.getElementById('quant-stim-3-shop'),document.getElementById('quant-stim-4-shop'),document.getElementById('quant-stim-5-shop'),document.getElementById('quant-stim-6-shop'),document.getElementById('quant-stim-7-shop'),document.getElementById('quant-stim-8-shop'),document.getElementById('quant-stim-9-shop')];
// Stimulators num 
let stimNum;
if (window.localStorage.getItem("stimNumKey5") !== null) stimNum = JSON.parse(window.localStorage.getItem("stimNumKey5")); 
else stimNum = [0,0,0,0,0,0,0,0,0];
// Show stim quant
for (let i = 0; i < stimNum.length; i++) quantStim[i].innerHTML = stimNum[i];
// Stim price
let stimPrice, stimPriceConst = [100,100,100,235,235,235,335,575,860];
stimPrice = stimPriceConst.map(function(num) {return Math.round(num * Math.pow((1.36 - lvlNum * 0.0016), lvlNum - 1));});
// if (window.localStorage.getItem("stimPriceKey5") !== null) stimPrice = JSON.parse(window.localStorage.getItem("stimPriceKey5")); 
// else stimPrice = [150,150,150,350,350,350,500,860,1290]; //[30,75,30,75,30,75,200,350,530];

// Event listener stimulators group 
stimBtnsGroupShop.addEventListener(clickDownEvent, clickFuncStart03, false);
stimBtnsGroupShop.addEventListener(clickMoveEvent, clickFuncMove03, false);
stimBtnsGroupShop.addEventListener(clickUpEvent, stimShopEnd, false);

function stimShopEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			// Generators
			case 'btn-stim-1-shop': selectStim(0); break;
			case 'btn-stim-2-shop': selectStim(1); break;
			case 'btn-stim-3-shop': selectStim(2); break;
			case 'btn-stim-4-shop': selectStim(3); break;
			case 'btn-stim-5-shop': selectStim(4); break;
			case 'btn-stim-6-shop': selectStim(5); break;
			case 'btn-stim-7-shop': selectStim(6); break;
			case 'btn-stim-8-shop': selectStim(7); break;
			case 'btn-stim-9-shop': selectStim(8); break;
		} // Отмена подсветки
		event.target.style.opacity = '0';
	}
}
function selectStim(num) {
	selectItemNum = num; infoShopWind.style.display = 'block'; 
	// Stim info
	stimulatorsInfoGroup.style.display = 'block'; stimInfo[selectItemNum].style.display = 'block';
	// Show btn buy
	buyPriceGroup.style.display = 'block'; itemPriceGroup.style.display = 'block';
	priceNum = stimPrice[selectItemNum]; // Math.round(Math.pow((1.18 - lvlNum * 0.0007), lvlNum - 1)) * stimPrice[selectItemNum];
	centerPos(stimPrice[selectItemNum], itemPriceGroup);
	itemPriceInfo.innerHTML = numFormat.format(stimPrice[selectItemNum]);	
	// Show btn use
	if (stimNum[selectItemNum] > 0) {
		useSelectGroup.style.display = 'block'; useText.style.display = 'block';
		useSelectGroup.style.transform = 'translateX(111px)'; buyPriceGroup.style.transform = 'translateX(-111px)';
	}
}

// Purchases info ****************************************************************************************************************************
const purchasesInfoGroup = document.getElementById('purchases-info'), purchInfoElem = document.getElementById('purch-info-elem'),
purchasesInfo = [document.getElementById('info-money-1'),document.getElementById('info-money-2'),document.getElementById('info-money-3'),document.getElementById('info-sp-1'),document.getElementById('info-sp-2'),document.getElementById('info-sp-3'),document.getElementById('info-money-4'),document.getElementById('info-money-5'),document.getElementById('info-sp-4'),document.getElementById('info-sp-5')],
// infoItemReward = [document.getElementById('info-money-1'),document.getElementById('info-money-2'),document.getElementById('info-money-3'),document.getElementById('info-sp-1'),document.getElementById('info-sp-2'),document.getElementById('info-sp-3')];
infoPurchMoneyGroup = document.getElementById('info-money-group'), infoPurchMoneyNum = document.getElementById('info-money-num'),
infoPurchSpGroup = document.getElementById('info-sp-group'), infoPurchSpNum = document.getElementById('info-sp-num');
// Колич просмотров рекламы для получ бустов
let purchAdsConst = [1, 3, 5, 1, 3, 5], purchAdsNum;
if (window.localStorage.getItem("purchAdsNumKey5") !== null) purchAdsNum = JSON.parse(window.localStorage.getItem("purchAdsNumKey5")); 
else purchAdsNum = [1, 3, 5, 1, 3, 5];
// Prices purchases
let pricePurchNum = [0, 0, 0, 0];

// Event listener stimulators group 
purchBtnsGroupShop.addEventListener(clickDownEvent, clickFuncStart03, false);
purchBtnsGroupShop.addEventListener(clickMoveEvent, clickFuncMove03, false);
purchBtnsGroupShop.addEventListener(clickUpEvent, purchShopEnd, false);

function purchShopEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			// Generators
			case 'btn-money-1-shop': selectPurch(0); break;
			case 'btn-money-2-shop': selectPurch(1); break;
			case 'btn-money-3-shop': selectPurch(2); break;
			case 'btn-sp-1-shop': selectPurch(3); break;
			case 'btn-sp-2-shop': selectPurch(4); break;
			case 'btn-sp-3-shop': selectPurch(5); break;
			case 'btn-money-4-shop': selectPurch(6); break;
			case 'btn-money-5-shop': selectPurch(7); break;
			case 'btn-sp-4-shop': selectPurch(8); break;
			case 'btn-sp-5-shop': selectPurch(9); break;
		} // Отмена подсветки
		event.target.style.opacity = '0';
	}
}
function selectPurch(num) {
	// Open info wind
	selectItemNum = num;
	infoShopWind.style.display = 'block'; 
	// Purch info
	purchasesInfoGroup.style.display = 'block'; purchasesInfo[selectItemNum].style.display = 'block';
	// Items for Watch Ads
	if (selectItemNum < 6) {
		// Show btn watch ads group
		buyAdsGroup.style.display = 'block';
		purchInfoElem.style.display = 'block';
		// Show number ads
		if (langNum == 1) {
			if (purchAdsNum[selectItemNum] == 1 || purchAdsNum[selectItemNum] == 5) numAdsInfo.innerHTML = purchAdsNum[selectItemNum] + ' раз';
			else numAdsInfo.innerHTML = purchAdsNum[selectItemNum] + ' раза';
		} else if (langNum == 2) numAdsInfo.innerHTML = purchAdsNum[selectItemNum] + ' vezes';
		else numAdsInfo.innerHTML = purchAdsNum[selectItemNum] + ' times';
		// Init item money
		if (selectItemNum < 3) { 
			rewardShopMoney = Math.round(120 * Math.pow((1.4 - lvlNum * 0.002), lvlNum - 1));
	        infoPurchMoneyGroup.style.display = 'block';
			if (selectItemNum == 0) infoPurchMoneyNum.innerHTML = numFormat.format(rewardShopMoney); 
			else if (selectItemNum == 1) infoPurchMoneyNum.innerHTML = numFormat.format(rewardShopMoney * 5); 
			else if (selectItemNum == 2) infoPurchMoneyNum.innerHTML = numFormat.format(rewardShopMoney * 10);
		} // Init item sp
		else {
			rewardShopSp = Math.round(addSpNum * 0.8);
			infoPurchSpGroup.style.display = 'block';
			if (selectItemNum == 3) infoPurchSpNum.innerHTML = numFormat.format(rewardShopSp); 
			else if (selectItemNum == 4) infoPurchSpNum.innerHTML = numFormat.format(rewardShopSp * 5); 
			else if (selectItemNum == 5) infoPurchSpNum.innerHTML = numFormat.format(rewardShopSp * 10);
		}  
	} // Purchased items 
	else {
		// Show btn buy group
		buyPriceGroup.style.display = 'block'; itemPurchPriceInfo.style.display = 'block'; 
		// Присваивание цены
		if (selectItemNum == 6) {
			itemPurchPriceInfo.innerHTML = pricePurchNum[0];
			infoPurchMoneyGroup.style.display = 'block'; infoPurchMoneyNum.innerHTML = '40 000 000';
		} else if (selectItemNum == 7) {
			itemPurchPriceInfo.innerHTML = pricePurchNum[1];
			infoPurchMoneyGroup.style.display = 'block'; infoPurchMoneyNum.innerHTML = '200 000 000';
		} else if (selectItemNum == 8) {
			itemPurchPriceInfo.innerHTML = pricePurchNum[2];
			infoPurchSpGroup.style.display = 'block'; infoPurchSpNum.innerHTML = 200;
		} else if (selectItemNum == 9) {
			itemPurchPriceInfo.innerHTML = pricePurchNum[3];
			infoPurchSpGroup.style.display = 'block'; infoPurchSpNum.innerHTML = 1000;
		}
	}
}


// Event listener Btns Info Window ***********************************************************************************************************
const btnsInfoShop = document.getElementById('btns-info-shop');

btnsInfoShop.addEventListener(clickDownEvent, infoWindowStart, false);
btnsInfoShop.addEventListener(clickMoveEvent, infoWindowMove, false);
btnsInfoShop.addEventListener(clickUpEvent, infoWindowEnd, false);

function infoWindowStart(event) {
	moveFlag = false;
	if (event.target.id == 'btn-buy' || event.target.id == 'btn-use-select' || event.target.id == 'btn-watch-ad') event.target.style.opacity = '0.3';
}
function infoWindowMove(event) {
	if (isMobileFlag && !moveFlag) moveFlag = true;
	if ((event.target.id == 'btn-buy' || event.target.id == 'btn-use-select' || event.target.id == 'btn-watch-ad') && event.target.style.opacity !== '0') event.target.style.opacity = '0';
} 
let mesOnlyUseTimeout;
function infoWindowEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			// Close area
			case 'exit-info-shop-wind': closeInfoWind(); break;
			// Close mes only use stim
			// case 'close-mes-only-use':
			// 	clearTimeout(mesOnlyUseTimeout); slowHideMes(mesOnlyOneStim);
			// break;
			// Btn buy
			case 'btn-buy': 
				// Generators buy **********************************************************************
				if (generatorsInfoGroup.style.display == 'block') {
					if (moneyNum > priceNum) {
						if (soundData.soundFlag == 'on') moneySound.play(); 
						// Decr money
						moneyNum -= priceNum; window.localStorage.setItem("moneyNumKey5", moneyNum);
						moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum)); moneyShopQuant.innerHTML = numFormat.format(Math.round(moneyNum));
						// Generator available flag
						generAvailFlag[selectItemNum] = true; window.localStorage.setItem("generAvailFlagKey5", JSON.stringify(generAvailFlag));
						generHaveElem[selectItemNum].style.display = 'block'; 
						// Choice generator
						choiceGenerator();
					} // Havnt money
					else shakeElem(moneyShopGroup, moneyShopQuant, '#F4EE14');
				} // Stimulators buy ************************************************************************
				else if (stimulatorsInfoGroup.style.display == 'block') {
					if (moneyNum > priceNum) {
						if (soundData.soundFlag == 'on') moneySound.play(); 
						// Decr money
						moneyNum -= priceNum; window.localStorage.setItem("moneyNumKey5", moneyNum);
						moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum)); moneyShopQuant.innerHTML = numFormat.format(Math.round(moneyNum));
						// Add stim quant
						stimNum[selectItemNum] += 1; window.localStorage.setItem("stimNumKey5", JSON.stringify(stimNum));
						quantStim[selectItemNum].innerHTML = stimNum[selectItemNum];
						// Close info window
						closeInfoWind(); 
					} // Mes - Can use only one stim
					// else if (stimTimerGroup.style.display == 'block') {
					// 	if (soundData.soundFlag == 'on') failSound.play(); 
					// 	// Close info window
					// 	//closeInfoWind();
					// 	// Show mes
					// 	slowShowMes(mesOnlyOneStim); 
					// 	mesOnlyUseTimeout = setTimeout(function() {
					// 		slowHideMes(mesOnlyOneStim);
					// 	}, 2500);
					// } 
					// Havnt money
					else shakeElem(moneyShopGroup, moneyShopQuant, '#F4EE14');
				} // Purchases buy ************************************************************************
				else if (purchasesInfoGroup.style.display == 'block') {
					if (selectItemNum == 6) purchaseMoney1();
					else if (selectItemNum == 7) purchaseMoney2();
					else if (selectItemNum == 8) purchaseSP1();
					else if (selectItemNum == 9) purchaseSP2();
				} 
			break;
			// Btn use or select
			case 'btn-use-select': 
				// Generators select ********************************************************************** 
				if (generatorsInfoGroup.style.display == 'block') {
					if (soundData.soundFlag == 'on') buttonSound.play(); 
					choiceGenerator();
				} // Skins select ************************************************************************
				else if (skinsInfoGroup.style.display == 'block') {
					if (soundData.soundFlag == 'on') buttonSound.play(); 
					skinNum = selectItemNum; window.localStorage.setItem("skinNumKey5", skinNum); 
					// Close info window and shop menu
					closeInfoWind(); 
					closeMenu(2);
				} // Stim select ************************************************************************
				else if (stimulatorsInfoGroup.style.display == 'block') {
					if (soundData.soundFlag == 'on') drinkSound.play(); 
					// Decr stim quant
					stimNum[selectItemNum] -= 1; window.localStorage.setItem("stimNumKey5", JSON.stringify(stimNum));
					quantStim[selectItemNum].innerHTML = stimNum[selectItemNum];
					// Start stim timer
					if (stimTimerGroup.style.display == 'block') {
            			stimTimerImg[useStimNum].style.display = 'none'; 
            			stimTimerNum = [60,60,60,70,70,70,70,80,90];
            			// Начальные значения коэф стимуляторов
            			strBoost = 0; stmBoost = 1; intBoost = 1;
					} else stimTimerGroup.style.display = 'block';
					useStimNum = selectItemNum; window.localStorage.setItem("useStimNumKey5", useStimNum);
					stimTimerImg[useStimNum].style.display = 'block';
					stimTimer.innerHTML = stimTimerNum[useStimNum]; 
					setBoost();
					// Close info window and shop menu
					closeInfoWind(); closeMenu(2);
				}
			break;
			// Btn watch ads
			case 'btn-watch-ad': 
				// if (!rewardFailFlag) showRewardVideo();// rewarded.show();  
				if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
					gdsdk.showAd('rewarded').then(response => {
						// Ad process done. You can track "SDK_REWARDED_WATCH_COMPLETE" event if that event triggered, that means the user watched the advertisement completely, you can give reward there.
						adNameFlag = 'reward';
					}).catch(error => {
						// An error catched. Please don't give reward here.
					});
				}
			break;
		} // Отмена подсветки
		event.target.style.opacity = '0';
	}
}
function choiceGenerator() {
	// Hide generator
	generMainWind[generNum].style.display = 'none';
	// Generator number
	generNum = selectItemNum; window.localStorage.setItem("generNumKey5", generNum); 
	// Generator energy
	generatorEnergy = Math.pow(2, (generNum + 2)) * Math.pow(1.5, (generUpgrLvl[generNum] - 1));
	generMaxEnergy = generatorEnergy * 2.5;
	// Generator resist
	generatorResist = 0.003 + 0.001 * generNum + 0.0005 * (generUpgrLvl[generNum] - 1);
	// Int num for repair and upgrade 
	generIntRepair = (generNum + generUpgrLvl[generNum]);
	generIntUpgrade = Math.round(generIntRepair * 1.5);
	// Generator HP
	//generHpMaxNum[generNum] = generHpMaxNum[generNum] * Math.pow(1.5, (generUpgrLvl[generNum] - 1));
	// progressHp.max = generHpMaxNum[generNum]; progressHp.value = generHpNum[generNum];
	progressHp.style.width = generHpNum[generNum] * 12 / generHpMaxNum[generNum] + '%';
	// Generator upgrade
	// progressUpgrade.max = generHpMaxNum[generNum] * 4; progressUpgrade.value = generUpgradeNum[generNum]; 
	progressUpgrade.style.width = generUpgradeNum[generNum] * 12 / (generHpMaxNum[generNum] * 4) + '%';
	// Generator usage flag
	if (generHpNum[generNum] >= generHpMaxNum[generNum]) usageGenerFlag = 'whole';
	else {
		if (generHpNum[generNum] <= 0) usageGenerFlag = 'broken';
		else usageGenerFlag = 'used';
	} // Generator action
	if (actName == 'upgrade') {
		showHpOrUpgrElem('block', 'none'); //, '#E8CEAF', '#937D45', '#AA7337'
		if (usageGenerFlag == 'whole') choiceAct('work', upgradeBtnImg, upgradeMainWind, 'block', 'none');
		else if (usageGenerFlag !== 'whole') choiceAct('work', repairBtnImg, upgradeMainWind, 'block', 'none');
	} else if (actName == 'repair') { 
		if (usageGenerFlag == 'whole') choiceAct('work', upgradeBtnImg, repairMainWind, 'block', 'none');
		else choiceAct('work', repairBtnImg, repairMainWind, 'block', 'none');
	} else if (actName == 'work') {
		if (usageGenerFlag == 'whole') {
			repairBtnImg.style.display = 'none'; upgradeBtnImg.style.display = 'block'; 
		} else {
			repairBtnImg.style.display = 'block'; upgradeBtnImg.style.display = 'none';
		}
	} // Show generator
	generMainWind[generNum].style.display = 'block';
	// Close info window and menu shop
	closeInfoWind();
	closeMenu(2);
	console.log('*********** '); 
	console.log('generNum ' + generNum); console.log('generUpgrLvl[generNum] ' + generUpgrLvl[generNum]);
	console.log('generatorEnergy ' + generatorEnergy); console.log('generMaxEnergy ' + generMaxEnergy);
	console.log('generatorResist ' + generatorResist);
	console.log('generIntRepair ' + generIntRepair); console.log('generIntUpgrade ' + generIntUpgrade);
	console.log('generHpNum[generNum] ' + generHpNum[generNum]); console.log('generHpMaxNum[generNum] ' + generHpMaxNum[generNum]);
	console.log('generUpgradeNum[generNum] ' + generUpgradeNum[generNum]); console.log('progressUpgrade.max ' + progressUpgrade.max);
}


// Event listener exit shop menu **********************************************************************************************************
const btnExitShopMenu = document.getElementById('group-exit-shop-menu'), exitInfoShopArea = document.getElementById('exit-info-shop-wind');
// Area close info wind
exitInfoShopArea.addEventListener(clickDownEvent, clickFuncStart, false);
exitInfoShopArea.addEventListener(clickMoveEvent, clickFuncMove, false);
exitInfoShopArea.addEventListener(clickUpEvent, menuShopExit, false);
// Btn close info wind and menu
btnExitShopMenu.addEventListener(clickDownEvent, clickFuncStart03, false);
btnExitShopMenu.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnExitShopMenu.addEventListener(clickUpEvent, menuShopExit, false);

function menuShopExit(event) {
	if (!moveFlag) { 
		if (infoShopWind.style.display == 'block') closeInfoWind();
		else closeMenu(2);
		if (event.target.id == 'btn-exit-shop-menu') event.target.style.opacity = '0';
	}
}
function closeInfoWind() {
	if (generatorsInfoGroup.style.display == 'block') { 
		generatorInfo[selectItemNum].style.display = 'none'; 
		generatorsInfoGroup.style.display = 'none';
	} else if (skinsInfoGroup.style.display == 'block') { 
		// Back pos char
		charArea.prepend(char); charArea.prepend(pedal); charArea.prepend(backgr);
		char.style.transform = 'translate(0px, 0px)';
		l_leg.style.WebkitTransform = 'rotate(0deg)'; l_f_leg.style.WebkitTransform = 'rotate(0deg)'; l_foot.style.WebkitTransform = 'rotate(0deg)';
		r_leg.style.WebkitTransform = 'rotate(0deg)'; r_f_leg.style.WebkitTransform = 'rotate(0deg)'; r_foot.style.WebkitTransform = 'rotate(0deg)';
		r_arm.style.WebkitTransform = 'rotate(18.25deg)'; f_r_arm.style.WebkitTransform = 'rotate(-36.5deg)';
		l_arm.style.WebkitTransform = 'rotate(18.25deg)'; f_l_arm.style.WebkitTransform = 'rotate(-50deg)';
		if (skinNum !== selectItemNum) {
			choiceSkin(selectItemNum, 'none');
			choiceSkin(skinNum, 'block');
		} // skinsInfo[selectItemNum].style.display = 'none'; 
		if (skinLockedElem.style.display == 'block') skinLockedElem.style.display = 'none';
		skinsInfoGroup.style.display = 'none';
	} else if (stimulatorsInfoGroup.style.display == 'block') {
		stimInfo[selectItemNum].style.display = 'none'; 
		stimulatorsInfoGroup.style.display = 'none';
		// buyUseText.style.display = 'none';
	} else if (purchasesInfoGroup.style.display == 'block') { 
		purchasesInfo[selectItemNum].style.display = 'none'; 
		infoPurchMoneyGroup.style.display = 'none'; infoPurchSpGroup.style.display = 'none';
		if (selectItemNum < 6) {
			buyAdsGroup.style.display = 'none'; purchInfoElem.style.display = 'none';
		}
	} // Hide btn buy
	if (buyPriceGroup.style.display == 'block') {
		if (itemPriceGroup.style.display == 'block') itemPriceGroup.style.display = 'none'; 
		else if (itemPurchPriceInfo.style.display == 'block') itemPurchPriceInfo.style.display = 'none'; 
		buyPriceGroup.style.transform = 'translateX(0px)'; buyPriceGroup.style.display = 'none';
	} // Hide btn use-select 
	if (useSelectGroup.style.display == 'block') {
		if (selectText.style.display == 'block') selectText.style.display = 'none';
		else if (useText.style.display == 'block') useText.style.display = 'none';
		useSelectGroup.style.transform = 'translateX(0px)'; useSelectGroup.style.display = 'none';
	} // Close info window
	infoShopWind.style.display = 'none';
}





// OPTIONS MENU ##############################################################################################################################
const btnsMenuOptions = document.getElementById('btns-opt'), btnsTracksGroup = document.getElementById('btns-sound-opt'),
langWindOpt = document.getElementById('opt-lang-wind'), creditWindow = document.getElementById('credit-window'),
// Вкл/Выкл звуков и музыки 
soundCross = document.getElementById('no-sound'), musicCross = document.getElementById('no-music'),
// Звуки и музыка
buttonSound = document.getElementById('button-sound'), moneySound = document.getElementById('money-sound'), drinkSound = document.getElementById('eating-sound'), failSound = document.getElementById('fail-sound'), lvlupSound = document.getElementById('lvlup-sound'), energySound = document.getElementById('energy-sound'), hammerSound = document.getElementById('hammer-sound'), rachetSound = document.getElementById('rachet-sound'),
electroTreck = [document.getElementById('track-1'),document.getElementById('track-2'),document.getElementById('track-3')], 
btnsTracks = [document.getElementById('btn-track_1'),document.getElementById('btn-track_2'),document.getElementById('btn-track_3')];
// Сохраняемый обьект звуков и музыки
let soundData; // Get LS soundDataKey5
if (window.localStorage.getItem("soundDataKey5") !== null) soundData = JSON.parse(window.localStorage.getItem("soundDataKey5")); 
else soundData = {	
	treckNum: 0, // Номер выбраного трека
	soundFlag: 'on', // Флаг вкл/выкл звуков
	musicFlag: 'on', // Флаг вкл/выкл треков
} // Заметнение кнопки выбраного трека
btnsTracks[soundData.treckNum].style.opacity = '0.6';
// Play track
if (soundData.musicFlag == 'on') electroTreck[soundData.treckNum].play();
// Появление крестов на кнопках вкл/выкл звуков и музыки
else if (soundData.musicFlag == 'off') musicCross.style.display = 'block';
if (soundData.soundFlag == 'off') soundCross.style.display = 'block';

// Btns menu options 
btnsMenuOptions.addEventListener(clickDownEvent, clickFuncStart03, false);
btnsMenuOptions.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnsMenuOptions.addEventListener(clickUpEvent, menuOptEnd);

function menuOptStart(event) {
	moveFlag = false;
	event.target.style.opacity = '0.6';
}
function menuOptMove(event) {
	if (isMobileFlag && !moveFlag) moveFlag = true;
	event.target.style.opacity = '0.3';
}
function menuOptEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-credits': creditWindow.style.display = 'block'; break;
			// case 'btn-policy': 
			// 	// window.location.replace("https://barsukstudio.github.io/energy_privacy.html");
			// 	consentWindow.style.display = 'block'; 
			// 	agreeUserCons.style.display = 'none'; yesUserCons.style.display = 'block'; noUserCons.style.display = 'block';
			// 	hideBanner(); // banner.hide();
			// break;
			// case 'btn-more-games-opt': window.location.replace("https://play.google.com/store/apps/dev?id=6043684000948739501"); break;
			case 'btn-exit-game': 
				// Close menu options
				menuWindow[3].style.display = 'none'; 
				menuOpenNum = -1;
				if (langWindOpt.style.display == 'block') langWindOpt.style.display = 'none';
				// Show star window
				startWindow.style.display = 'block'; 
			break;
			case 'btn-lang': langWindOpt.style.display = 'block'; break;
		} // Отмена подсветки
		event.target.style.opacity = '0';
	}
}

// Обработчики кнопок в окне сброса выбора языка ******************************************************************************************
langWindOpt.addEventListener(clickDownEvent, clickFuncStart);
langWindOpt.addEventListener(clickMoveEvent, clickFuncMove);
langWindOpt.addEventListener(clickUpEvent, changeLangFunc);

function changeLangFunc(event) {
	if (!moveFlag) {
		switch(event.target.id) {	
			case 'btn-lang-eng-opt': selectLang(0); break; 
	        case 'btn-lang-rus-opt': selectLang(1); break; 
	        case 'btn-lang-por-opt': selectLang(2); break; 
		}
	}
}
function selectLang(num) {
	if (langNum !== num) {
		btnsLangSW[langNum].style.opacity = '0'; btnsLang[langNum].style.opacity = '0';
		for (let i = 0; i < lang_arr[langNum].length; i++) lang_arr[langNum][i].style.display = 'none';
		langNum = num; window.localStorage.setItem("langKey5", langNum);
		showText(lang_arr[langNum]);
		btnsLangSW[langNum].style.opacity = '0.3'; btnsLang[langNum].style.opacity = '0.3'; 
	} if (langWindSW.style.display == 'block') langWindSW.style.display = 'none'; 
	else if (langWindOpt.style.display == 'block') langWindOpt.style.display = 'none';
}

// Select tracks ************************************************************************************************************************
btnsTracksGroup.addEventListener(clickDownEvent, trackOptStart);
btnsTracksGroup.addEventListener(clickMoveEvent, trackOptMove);
btnsTracksGroup.addEventListener(clickUpEvent, trackOptEnd);

function trackOptStart(event) {
	moveFlag = false;
	event.target.style.opacity = '0.6';
}
function trackOptMove(event) {
	if (isMobileFlag && !moveFlag) moveFlag = true;
	if (event.target !== btnsTracks[soundData.treckNum]) event.target.style.opacity = '0.3';
}
function trackOptEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			// On/Off musik and sounds **************************
			case 'music-on-off': 
				if (soundData.musicFlag == 'on') {
					musicCross.style.display = 'block';
					soundData.musicFlag = 'off'; 
					electroTreck[soundData.treckNum].pause();
					electroTreck[soundData.treckNum].currentTime = 0;
				} else {
					musicCross.style.display = 'none';
					soundData.musicFlag = 'on'; 
					electroTreck[soundData.treckNum].play();
				} window.localStorage.setItem("soundDataKey5", JSON.stringify(soundData));
			break;
			case 'sound-on-off': 
				if (soundData.soundFlag == 'on') {
					soundCross.style.display = 'block';
					soundData.soundFlag = 'off'; 
				} else {
					soundCross.style.display = 'none';
					soundData.soundFlag = 'on'; 
					buttonSound.play();
				} window.localStorage.setItem("soundDataKey5", JSON.stringify(soundData));
			break;
			// Select tracks ************************************
			case 'btn-track_1': selectTteck(0); break;
			case 'btn-track_2': selectTteck(1); break;
			case 'btn-track_3': selectTteck(2); break;
		} if (event.target !== btnsTracks[soundData.treckNum]) event.target.style.opacity = '0.3';
	}
}
function selectTteck(num) {
	if (soundData.musicFlag == 'on') {
		electroTreck[soundData.treckNum].pause();
		electroTreck[soundData.treckNum].currentTime = 0;
	} btnsTracks[soundData.treckNum].style.opacity = '0.3';
	soundData.treckNum = num; 
	if (soundData.musicFlag == 'on') electroTreck[soundData.treckNum].play();
	btnsTracks[soundData.treckNum].style.opacity = '0.6';
	window.localStorage.setItem("soundDataKey5", JSON.stringify(soundData)); 
}


// Event listener exit opt menu *********************************************************************************************************
const btnExitOptMenu = document.getElementById('btn-exit-opt-menu');

btnExitOptMenu.addEventListener(clickDownEvent, clickFuncStart03, false);
btnExitOptMenu.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnExitOptMenu.addEventListener(clickUpEvent, menuOptExit, false);

function menuOptExit(event) {
	if (!moveFlag) {
		if (langWindOpt.style.display == 'block') langWindOpt.style.display = 'none';
		if (creditWindow.style.display == 'block') creditWindow.style.display = 'none';
		else if (consentWindow.style.display == 'block') {
			consentWindow.style.display = 'none'; 
			showBanner();
		} else closeMenu(3);
		event.target.style.opacity = '0';
	}
}


// User consent window ******************************************************************************************************************
const consentWindow = document.getElementById('consent-window'),
yesUserCons = document.getElementById('yes-uc'), noUserCons = document.getElementById('no-uc'), agreeUserCons = document.getElementById('agree-uc'),
btnsConsentWindow = document.getElementById('btns-consent-window');
let consentShowFlag = null; // Сохраняемый в LS флаг показанного сообщения user consent

btnsConsentWindow.addEventListener(clickDownEvent, pushConsentBtns); 
btnsConsentWindow.addEventListener(clickMoveEvent, moveConsentBtns); 
btnsConsentWindow.addEventListener(clickUpEvent, consentWindowBtns);

function pushConsentBtns(event) {
    moveFlag = false;
    event.target.style.opacity = '0.1';
}
function moveConsentBtns(event) {
    if (isMobileFlag && !moveFlag) moveFlag = true;
    event.target.style.opacity = '0';
}
function consentWindowBtns(event) {
    if (!moveFlag) {
        switch (event.target.id) {
            case 'btn-privacy-policy':
                window.location.replace("https://barsukstudio.github.io/energy_privacy.html");
            break;
            case 'btn-relevant-ads':
                consentWindow.style.display = 'none';
                showBanner();// banner.show(); 
            break;
            case 'btn-not-relevant-ads':
                consentWindow.style.display = 'none';
                showBanner();// banner.show();  
            break;
            case 'btn-agree-uc':
                consentWindow.style.display = 'none';
                showBanner();// banner.show();  
            break;
        }
    } event.target.style.opacity = '0';
}






