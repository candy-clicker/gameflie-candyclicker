"use strict";

// LOCATIONS TRANSITION AND SHOW INTRST ADS ################################################################################################
transBtnsGroup.addEventListener(clickDownEvent, startTrans, false);
transBtnsGroup.addEventListener(clickMoveEvent, moveTrans, false);
transBtnsGroup.addEventListener(clickUpEvent, transition, false);

function startTrans() {
	moveFlag = false;
}
function moveTrans() {
	if (isMobile && !moveFlag) moveFlag = true;
}

function transition(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			// Exercises
			case 'btn-trans-dumb':
				transNum = 0; 
				if (openWindow >= 2) {
					canShowIntrst = false; slowShowMes(mesCompLeave); 
					// In mesAction() make stop
				} else if (openWindow == 1) {
					canShowIntrst = true; transFunc(transNum);
				}
			break;
			case 'btn-trans-bike':
				transNum = 1; 
				if (openWindow >= 2) {
					canShowIntrst = false; slowShowMes(mesCompLeave);
				} else if (openWindow == 0) {
					canShowIntrst = true; transFunc(transNum);
				}
			break;
			case 'btn-trans-pullup': 
				if (transPullupIcon.style.display == 'block') {
					// Исчезновение птиц и классов анимаций
					if (birds.style.display == 'block') {
						clearTimeout(timerRemoveBirdAmin); hideBirds(); 
					} transNum = 2; 
					if (openWindow == 3) {
						canShowIntrst = false; slowShowMes(mesCompLeave); 
					} else if (openWindow <= 1) {
						canShowIntrst = true; transFunc(transNum);
					}
				} else if (sound == 'on') failSound.play();
			break;
			case 'btn-trans-squat': 
				if (transSquatIcon.style.display == 'block') {
					// Исчезновение птиц и классов анимаций
					if (birds.style.display == 'block') {
						clearTimeout(timerRemoveBirdAmin); hideBirds(); 
					} transNum = 3; 
					if (openWindow == 2) {
						canShowIntrst = false; slowShowMes(mesCompLeave); 
					} else if (openWindow <= 1) {
						canShowIntrst = true; transFunc(transNum);
					}
				} else if (sound == 'on') failSound.play();
			break;
		} 
	}
}
function transFunc(numLoc) { 
	// Init new location
	hideLocation();
	openWindow = numLoc; window.localStorage.setItem("openWindowKey1", openWindow);
	showLocation();
	// Show mes rate 
    // if (!mesData.mesRateFlag && countShowMesRate >= 10 && messenges.style.display !== 'block') {
    //     countShowMesRate = 0; window.localStorage.setItem("countShowMesRateKey1", countShowMesRate);  
    //     // slowShowMes(mesRate);
	// 	// rateGameFunc();
    // }
	// Show intrst 
	if (canShowIntrst && intrstCount >= 4 && messenges.style.display !== 'block') { // && countShowInter >= 60
		// showInterVideo(); // interStartWindFunc();
		if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
			intrstCount = 0; adNameFlag = 'inter';
			gdsdk.showAd();
	    }
	} // Stop btn comp timer
	if (openWindow < 2) {
		cancelAnimationFrame(downTimerCompIntrvl); downTimerCompIntrvl = null;
	}
}




// BTNS MENU #################################################################################################################################
btns_menu_MA.addEventListener(clickDownEvent, touchMenus);
btns_menu_MA.addEventListener(clickMoveEvent, moveMenus);
btns_menu_MA.addEventListener(clickUpEvent, btnsMenuFunc);

function touchMenus() {
	moveFlag = false;
}
function moveMenus() {
	if (isMobile && !moveFlag) moveFlag = true;
}

function btnsMenuFunc(event) {
	if (!clickFlag && !moveFlag) {
		switch (event.target.id) {
			case 'btn-menu_1_':
				if (menuOpenNum !== 0) openMenu(0);
				else if (menuOpenNum == 0) closeMenu(0);
			break;
			case 'btn-inventory_1_':
				if (menuOpenNum !== 1) openMenu(1); 
				else if (menuOpenNum == 1) closeMenu(1);
			break;
			case 'btn-shop_1_':
				if (menuOpenNum !== 2) openMenu(2);  
				else if (menuOpenNum == 2) closeMenu(2); 
			break;
			case 'btn-options_1_':
				if (menuOpenNum !== 3) openMenu(3); 
				else if (menuOpenNum == 3) closeMenu(3);
			break;
		}
	}	
}
let closeCharMenuFlag = true;
function openMenu(num) {
	// Hide menu
	if (menuOpenNum !== null) closeMenu2();
	// Check char menu 
	if (menuWinds[0].style.display == 'block') {
		btns_menu[0].style.opacity = 0; menuWinds[0].style.display = 'none'; 
	} // Set new menu number
	menuOpenNum = num; 
	// Show menu
	btns_menu[menuOpenNum].style.opacity = 0.4;
	menuWinds[menuOpenNum].style.display = 'block';
	if (menuOpenNum == 0) {
		bodyExp.style.width = bodyData.bodyExpNum * 58 / bodyData.bodyMaxExpNum + '%';
		legsExp.style.width = legsData.legsExpNum * 58 / legsData.legsMaxExpNum + '%';
	} else if (menuOpenNum == 1) window.scrollTo(0,0);
	else if (menuOpenNum == 2) {
		window.scrollTo(0,0);
		moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum)); spShop.innerHTML = charData.spNum;	
		moneyShopMA.style.display = 'block'; 
		// if (!mesData.mesShopFlag) { // Сообщение продавца
		// 	mesShop.style.display = 'block'; moneyShopMA.style.display = 'none'; 
		// 	mesData.mesShopFlag = true; window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
		// 	shopMesTimeout = setTimeout(function() {
		// 		mesShop.style.display = 'none'; moneyShopMA.style.display = 'block';
		// 	}, 10000);
		// } 
	} // Stop timers
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
}
function closeMenu(num) {
	closeMenu2();
	if (closeCharMenuFlag) {
		// Set null menu number
		menuOpenNum = null; 
		// Show tutorial
		if (!mesData.finishTutorialFlag) {
			slowShowMes(mesTutorialMA);
			mesTutorial[numTutorial].style.display = 'block';
			btnsTutorial.style.display = 'block';
			if (numTutorial == 9) {
				imgForwardTutorial.style.display = 'none'; 
				imgCloseTutorial.style.display = 'block'; 
			} upDownBtnsTutorial();
		} // Continue timers
		if (openWindow <= 1) {
			// Запуск интервала зелий
			if (timerData.useStimNum !== null && downTimerIntrvl == null) downTimerStim();
			// Запуск интервала появления птицы
			if (showBirdIntvl == null && birds.style.display !== 'block') showBird(); 
		} else if (openWindow >= 2 && downTimerCompIntrvl == null) timerCompEnd();
	}
}

function closeMenu2() {
	closeCharMenuFlag = true;
	if (menuOpenNum == 0) {
		if (paletteColor.style.display == 'block') {
			if (paletteFlag == "tshirt") menuColors[colorNumTshirt].style.stroke = 'none'; 
			else if (paletteFlag == "shorts") menuColors[colorNumShorts].style.stroke = 'none';
			else if (paletteFlag == "hair") menuColors[colorNumHair].style.stroke = 'none';
			paletteColor.style.display = 'none'; closeCharMenuFlag = false;
		} else if (paletteHair.style.display == 'block') {
			menuHair[numHair+1].style.stroke = 'none'; paletteHair.style.display = 'none'; closeCharMenuFlag = false;
		} else if (paletteBeard.style.display == 'block') {
			menuBeards[numBeard+1].style.stroke = 'none'; paletteBeard.style.display = 'none'; closeCharMenuFlag = false;
		}
	} else if (menuOpenNum == 2) {
		moneyShopMA.style.display = 'none'; 
		if (infoShopMA.style.display == 'block') infoShopMA.style.display = 'none';
		// if (mesShop.style.display == 'block') {
		// 	clearTimeout(shopMesTimeout); mesShop.style.display = 'none';
		// } 
	} else if (menuOpenNum == 3) {
		if (creditWindow.style.display == 'block') creditWindow.style.display = 'none';
		if (langWindOpt.style.display == 'block') langWindOpt.style.display = 'none';
		// if (consentWindow.style.display == 'block') {
		// 	consentWindow.style.display = 'none'; messenges.style.display = 'none';
		// 	showBanner(); // banner.show();
		// } 
	} // Hide open menu
	if (closeCharMenuFlag) {
		btns_menu[menuOpenNum].style.opacity = 0; menuWinds[menuOpenNum].style.display = 'none'; 
	}
}





// CHAR MENU #################################################################################################################################
menuWinds[0].addEventListener(clickDownEvent, menuFuncStart);
menuWinds[0].addEventListener(clickMoveEvent, menuFuncMove);
menuWinds[0].addEventListener(clickUpEvent, menuFuncEnd);

function menuFuncStart() {
	moveFlag = false;
}
function menuFuncMove() {
	if (isMobile && !moveFlag) moveFlag = true;
}

function menuFuncEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-up-body-force_1_':
				if (charData.bodyForceNum < 99 && charData.spNum - charData.bodyNeedSpNum >= 0) {
					if (sound == 'on') buttonSound.play(); 
					charData.bodyForceNum += 1;
					// Отнимание sp
					charData.spNum -= charData.bodyNeedSpNum; 
					if (charData.bodyForceNum % 4 == 0) charData.bodyNeedSpNum += 1;
					bodyForce.innerHTML = charData.bodyForceNum; bodyNeedPoints.innerHTML = charData.bodyNeedSpNum;
					statusPoints.innerHTML = charData.spNum;	
					// Увеличение силы рук
					bodyData.armPower += (4 + (bodyData.bodyLvlNum - 2) * 0.4);
					// LS
					window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
					window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
				} else {
					if (sound == 'on') failSound.play();
				}
			break;
			case 'btn-up-legs-force':
				if (charData.legsForceNum < 99 && charData.spNum - charData.legsNeedSpNum >= 0) {
					if (sound == 'on') buttonSound.play(); 
					charData.legsForceNum += 1;
					// Отнимание sp
					charData.spNum -= charData.legsNeedSpNum;
					if (charData.legsForceNum % 4 == 0) charData.legsNeedSpNum += 1;
					legsForce.innerHTML = charData.legsForceNum; legsNeedPoints.innerHTML = charData.legsNeedSpNum;
					statusPoints.innerHTML = charData.spNum;	
					// Увеличение силы ног
					legsData.legPower += (0.2 + (legsData.legsLvlNum - 2) * 0.02);
					// LS
					window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
					window.localStorage.setItem("legsDataKey1", JSON.stringify(legsData));
				} else {
					if (sound == 'on') failSound.play();
				}
			break;
			case 'btn-up-stamina':
				if (charData.stmNum < 99 && charData.spNum - charData.stmNeedSpNum >= 0) {
					if (sound == 'on') buttonSound.play(); 
					charData.stmNum += 1;
					// Отнимание sp
					charData.spNum -= charData.stmNeedSpNum;
					if (charData.stmNum % 4 == 0) charData.stmNeedSpNum += 1;
					stamina.innerHTML = charData.stmNum; staminaNeedPoints.innerHTML = charData.stmNeedSpNum;
					statusPoints.innerHTML = charData.spNum;	
					// Увеличение количества и скорости востановления стамины
					let lvNum = (bodyData.bodyLvlNum + legsData.legsLvlNum) * 0.5;
					charData.stmMaxProgressNum += 2 * (1 + lvNum * lvNum * 0.01); //4; 
					charData.recStmNum += 0.0125 * (1 + lvNum * lvNum * 0.01); //0.0215;
					// staminaProgress.max = charData.stmMaxProgressNum;
					// Перезапуск функции востановления стамины
					cancelAnimationFrame(intervalRecStam); startRecStamFlag = true; recoveryStamina();
					// LS
					window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
				} else {
					if (sound == 'on') failSound.play();
				}
			break;
			// Кнопки смены цвета майки и шорт
			case 'btn-tshirt-color': 
				paletteColor.style.display = 'block'; paletteFlag = "tshirt"; //progressBarsMenu.style.display = 'none';
				menuColors[colorNumTshirt].style.stroke = '#7a7a7a';
				// menuColors[colorNumTshirt].setAttribute('stroke', '#7a7a7a')
			break;
			case 'btn-shorts-color': 
				paletteColor.style.display = 'block'; paletteFlag = "shorts"; //progressBarsMenu.style.display = 'none';
				menuColors[colorNumShorts].style.stroke = '#7a7a7a';
			break;
			// Кнопка смены цвета волос
			case 'btn-hair-color': 
				paletteColor.style.display = 'block'; paletteFlag = "hair"; //progressBarsMenu.style.display = 'none';
				menuColors[colorNumHair].style.stroke = '#7a7a7a';
			break;
			// Кнопки выбора причесок и бород
			case 'btn-hairstales': 
				paletteHair.style.display = 'block'; //progressBarsMenu.style.display = 'none';
				menuHair[numHair+1].style.stroke = '#7a7a7a';
			break;
			case 'btn-beards': 
				paletteBeard.style.display = 'block'; //progressBarsMenu.style.display = 'none';
				menuBeards[numBeard+1].style.stroke = '#7a7a7a';
			break;
		}
	}
}

// Обработчик смены причесок ******************************************************************************************************************
paletteHair.addEventListener(clickUpEvent, changeHair);

function changeHair(event) { 
	if (!moveFlag) {
		let num;
		switch (event.target.id) {
			case 'btn-hair1-choice': num = -1;break;
			case 'btn-hair2-choice': num = 0; break;
			case 'btn-hair3-choice': num = 1; break;
			case 'btn-hair4-choice': num = 2; break;
			case 'btn-hair5-choice': num = 3; break;
			case 'btn-hair6-choice': num = 4; break;
			case 'btn-hair7-choice': num = 5; break;
			case 'btn-hair8-choice': num = 6; break;
			case 'btn-hair9-choice': num = 7; break;
			default: return;
		} // Смена прически
		if (numHair > -1) hair[numHair].style.display = 'none'; 
		menuHair[numHair+1].style.stroke = 'none';
		numHair = num; window.localStorage.setItem("numHairKey1", numHair); 
		if (numHair > -1) hair[numHair].style.display = 'block';
		menuHair[numHair+1].style.stroke = '#7a7a7a';
		// Исчезновение палитры и меню чара 
		// closeMenu(0); paletteHair.style.display = 'none';
	}
}

// Обработчик смены бород **********************************************************************************************************************
paletteBeard.addEventListener(clickUpEvent, changeBeard);

function changeBeard(event) { 
	if (!moveFlag) {
		let num;
		switch (event.target.id) {
			case 'btn-beard1-choice': num = -1;break;
			case 'btn-beard2-choice': num = 0; break;
			case 'btn-beard3-choice': num = 1; break;
			case 'btn-beard4-choice': num = 2; break;
			case 'btn-beard5-choice': num = 3; break;
			case 'btn-beard6-choice': num = 4; break;
			case 'btn-beard7-choice': num = 5; break;
			case 'btn-beard8-choice': num = 6; break;
			case 'btn-beard9-choice': num = 7; break;
			default: return;
		} // Смена прически
		if (numBeard > -1) beard[numBeard].style.display = 'none'; 
		menuBeards[numBeard+1].style.stroke = 'none';
		numBeard = num; window.localStorage.setItem("numBeardKey1", numBeard);
		if (numBeard !== -1) beard[numBeard].style.display = 'block'; 
		menuBeards[numBeard+1].style.stroke = '#7a7a7a';
		// Исчезновение палитры и меню чара 
		// closeMenu(0); paletteBeard.style.display = 'none';
	}
}

// Обработчик смены цвета майки, шорт и волос ************************************************************************************************
paletteColor.addEventListener(clickUpEvent, changeColor);

function changeColor(event) { 
	if (!moveFlag) {
		let colorNum;
		switch (event.target.id) {
			case 'color1-choice': colorNum = 0; break;
			case 'color2-choice': colorNum = 1; break;
			case 'color3-choice': colorNum = 2; break;
			case 'color4-choice': colorNum = 3; break;
			case 'color5-choice': colorNum = 4; break;
			case 'color6-choice': colorNum = 5; break;
			case 'color7-choice': colorNum = 6; break;
			case 'color8-choice': colorNum = 7; break;
			case 'color9-choice': colorNum = 8; break;
			case 'color10-choice': colorNum = 9; break;
			case 'color11-choice': colorNum = 10; break;
			case 'color12-choice': colorNum = 11; break;
			case 'color13-choice': colorNum = 12; break;
			case 'color14-choice': colorNum = 13; break;
			case 'color15-choice': colorNum = 14; break;
			case 'color16-choice': colorNum = 15; break;
			default: return;
		} // Смена цвета майки
		if (paletteFlag == "tshirt") {
			menuColors[colorNumTshirt].style.stroke = 'none'; 
			colorNumTshirt = colorNum; window.localStorage.setItem("colorNumTshirtKey1", colorNumTshirt);
			menuColors[colorNumTshirt].style.stroke = '#7a7a7a';
			for (let i = 0; i < tshirtColor.length; i++) {tshirtColor[i].style.fill = colorName[colorNumTshirt];}
		} // Смена цвета шорт
		else if (paletteFlag == "shorts") {
			menuColors[colorNumShorts].style.stroke = 'none';
			colorNumShorts = colorNum; window.localStorage.setItem("colorNumShortsKey1", colorNumShorts);
			menuColors[colorNumShorts].style.stroke = '#7a7a7a';
			for (let i = 0; i < shortsColor.length; i++) {shortsColor[i].style.fill = colorName[colorNumShorts];}
		} // Смена цвета волос
		else if (paletteFlag == "hair") {
			menuColors[colorNumHair].style.stroke = 'none';
			colorNumHair = colorNum; window.localStorage.setItem("colorNumHairKey1", colorNumHair);
			menuColors[colorNumHair].style.stroke = '#7a7a7a';
			for (let i = 0; i < hairColor.length; i++) {hairColor[i].style.fill = colorName[colorNumHair];}
		} // Исчезновение палитры и меню чара 
		// closeMenu(0); paletteColor.style.display = 'none';
	}
}




// let finishScrool = menuWinds[2].clientWidth - document.documentElement.clientWidth;
let scroolClickFlag = false, oneX, twoX, scrlX;

// INVENTORY MENU  ########################################################################################################################
menuWinds[1].addEventListener(clickDownEvent, inventoryStart);
menuWinds[1].addEventListener(clickMoveEvent, inventoryMove);
menuWinds[1].addEventListener(clickUpEvent, inventoryEnd);
// menuWinds[1].addEventListener('mouseout', inventoryEnd, true);

function inventoryStart(event) {
	moveFlag = false;
	// if (!isMobile) {
		scroolClickFlag = true; oneX = event.clientX; console.log(scroolClickFlag);
	// }
}
function inventoryMove(event) {
	if (!moveFlag) moveFlag = true;
	if (scroolClickFlag) {
		twoX = event.clientX;
		if (oneX < event.clientX) scrlX = -1.5 * Math.abs(twoX - oneX);
		else if (oneX > event.clientX) scrlX = 1.5 * Math.abs(twoX - oneX);
		oneX = twoX;
		window.scrollBy(scrlX, 0);
	}
}
function inventoryEnd() {
	// if (!isMobile) 
		scroolClickFlag = false;
}

// Выбор стимуляторов (Обработчик в init.js) ******************************************************************
function stimsInventFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-stim_1-dumb': case 'btn-stim_1-bike': 
				useStimulat(0); break;
			case 'btn-stim_2-dumb': case 'btn-stim_2-bike': 
				useStimulat(1); break;
			case 'btn-stim_3-dumb': case 'btn-stim_3-bike': 
				useStimulat(2); break;
			case 'btn-stim_4-dumb': case 'btn-stim_4-bike': 
				useStimulat(3); break;
			case 'btn-stim_5-dumb': case 'btn-stim_5-bike': 
				useStimulat(4); break;
			case 'btn-stim_6-dumb': case 'btn-stim_6-bike': 
				useStimulat(5); break;
			case 'btn-stim_7-dumb': case 'btn-stim_7-bike': 
				useStimulat(6); break;
		} 
	} 
}
// Drink potions
function useStimulat(num) {
    if (openWindow <= 1) {
    	if (inventData.stimInventNum[num] > 0) {
	        if (sound == 'on') drinkSound.play(); 
	        // Stop old used stim
	        if (timerData.useStimNum !== null) {
		        stimMain[timerData.useStimNum].style.display = 'none'; 
	            if (timerData.useStimNum == 0 || timerData.useStimNum == 2) timerData.timerNum[timerData.useStimNum] = 60;
	            else if (timerData.useStimNum == 1 || timerData.useStimNum == 3 || timerData.useStimNum == 4) timerData.timerNum[timerData.useStimNum]=70;
	            else if (timerData.useStimNum == 5) timerData.timerNum[timerData.useStimNum] = 80;
	            else if (timerData.useStimNum == 6) timerData.timerNum[timerData.useStimNum] = 90;
	        } // New stim number
	        timerData.useStimNum = num;
			window.localStorage.setItem("timerDataKey1", JSON.stringify(timerData));
	        // Появление иконки и таймера в mainMA
	        stimMain[num].style.display = 'block'; stimTimer.style.display = 'block'; 
	        stimTimer.innerHTML = timerData.timerNum[num]; //timerData.useFlag[num] = true;
	        // Уменьшение количеств стимуляторов в инвентаре
	        inventData.stimInventNum[num] -= 1; window.localStorage.setItem("inventDataKey1", JSON.stringify(inventData));
	        stimQuantInvent[0][num].innerHTML = inventData.stimInventNum[num]; stimQuantInvent[1][num].innerHTML = inventData.stimInventNum[num];
	        // Str and Stm coef
	        strStmCoef();
	    } // Сообщение - можно использовать только один стимулятор
	    // else if (timerData.useStimNum !== null) { 
	    //     slowShowMes(mesOnlyUse); 
	    //     timerOneUseMes = setTimeout(function() {slowHideMes(mesOnlyUse); }, 3000);
	    // } 
	    // Fail sound 
	    else if (sound == 'on') failSound.play();
    } // Сообщение - на этой локации нельзя использовать стимуляторы
    else if (openWindow >= 2) {
    	slowShowMes(mesCantUse); 
    	timerCantUseMes = setTimeout(function() {slowHideMes(mesCantUse);}, 3000);
    }
}





// SHOP MENU  ####################################################################################################################################
// Ev Lis shop btn in main wind **********************************************************************************************************
menuWinds[2].addEventListener(clickMoveEvent, moveShop);
menuWinds[2].addEventListener(clickDownEvent, startShop);
menuWinds[2].addEventListener(clickUpEvent, endShop);
// menuWinds[2].addEventListener('mouseout', endShop);

function startShop(event) {
	moveFlag = false; hideInfoItems(); 
	if (infoShopMA.style.display == 'block') infoShopMA.style.display = 'none';
	// if (!isMobile) {
		scroolClickFlag = true; oneX = event.clientX;
	// }
}
function moveShop(event) {
	if (!moveFlag) moveFlag = true; //isMobile && 
	if (scroolClickFlag) {
		twoX = event.clientX;
		if (oneX < event.clientX) scrlX = -1.5 * Math.abs(twoX - oneX);
		else if (oneX > event.clientX) scrlX = 1.5 * Math.abs(twoX - oneX);
		oneX = twoX;
		window.scrollBy(scrlX, 0);
	}
}
function endShop() {
	// if (!isMobile) 
		scroolClickFlag = false;
}

// Обработчики кнопок вещей в магазине ********************************************************************************************************
dumbsShop.addEventListener(clickUpEvent, shopDumbsFunc); 
bikesShop.addEventListener(clickUpEvent, shopBikesFunc);
stimsShop.addEventListener(clickUpEvent, shopStimsFunc); 
purchsShop.addEventListener(clickUpEvent, shopPurchsFunc);

function shopDumbsFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-dumbbell1-shop': numDumb = 0;  shopChoiceItem(infoDumb[0], numDumb, 'dumb'); break;
			case 'btn-dumbbell2-shop': numDumb = 1;  shopChoiceItem(infoDumb[1], numDumb, 'dumb'); break;
			case 'btn-dumbbell3-shop': numDumb = 2;  shopChoiceItem(infoDumb[2], numDumb, 'dumb'); break;
			case 'btn-dumbbell4-shop': numDumb = 3;  shopChoiceItem(infoDumb[3], numDumb, 'dumb'); break;
			case 'btn-dumbbell5-shop': numDumb = 4;  shopChoiceItem(infoDumb[4], numDumb, 'dumb'); break;
			case 'btn-dumbbell6-shop': numDumb = 5;  shopChoiceItem(infoDumb[5], numDumb, 'dumb'); break;
			case 'btn-dumbbell7-shop': numDumb = 6;  shopChoiceItem(infoDumb[6], numDumb, 'dumb'); break;
			case 'btn-dumbbell8-shop': numDumb = 7;  shopChoiceItem(infoDumb[7], numDumb, 'dumb'); break;
			case 'btn-dumbbell9-shop': numDumb = 8;  shopChoiceItem(infoDumb[8], numDumb, 'dumb'); break;
			case 'btn-dumbbell10-shop':numDumb = 9;  shopChoiceItem(infoDumb[9], numDumb, 'dumb'); break;
			case 'btn-dumbbell11-shop':numDumb = 10; shopChoiceItem(infoDumb[10], numDumb, 'dumb'); break;
			case 'btn-dumbbell12-shop':numDumb = 11; shopChoiceItem(infoDumb[11], numDumb, 'dumb'); break;
			case 'btn-dumbbell13-shop':numDumb = 12; shopChoiceItem(infoDumb[12], numDumb, 'dumb'); break;
			case 'btn-dumbbell14-shop':numDumb = 13; shopChoiceItem(infoDumb[13], numDumb, 'dumb'); break;
			case 'btn-dumbbell15-shop':numDumb = 14; shopChoiceItem(infoDumb[14], numDumb, 'dumb'); break;
			case 'btn-dumbbell16-shop':numDumb = 15; shopChoiceItem(infoDumb[15], numDumb, 'dumb'); break;
			case 'btn-dumbbell17-shop':numDumb = 16; shopChoiceItem(infoDumb[16], numDumb, 'dumb'); break;
			case 'btn-dumbbell18-shop':numDumb = 17; shopChoiceItem(infoDumb[17], numDumb, 'dumb'); break;
			case 'btn-dumbbell19-shop':numDumb = 18; shopChoiceItem(infoDumb[18], numDumb, 'dumb'); break;
			case 'btn-dumbbell20-shop':numDumb = 19; shopChoiceItem(infoDumb[19], numDumb, 'dumb'); break;
			case 'btn-dumbbell21-shop':numDumb = 20; shopChoiceItem(infoDumb[20], numDumb, 'dumb'); break;
			case 'btn-dumbbell22-shop':numDumb = 21; shopChoiceItem(infoDumb[21], numDumb, 'dumb'); break;
			case 'btn-dumbbell23-shop':numDumb = 22; shopChoiceItem(infoDumb[22], numDumb, 'dumb'); break;
			case 'btn-dumbbell24-shop':numDumb = 23; shopChoiceItem(infoDumb[23], numDumb, 'dumb'); break;
		} 
	}
}
function shopBikesFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-bike1-shop': numBike = 0; shopChoiceItem(infoBike[0], numBike, 'bike'); break;
			case 'btn-bike2-shop': numBike = 1; shopChoiceItem(infoBike[1], numBike, 'bike'); break;
			case 'btn-bike3-shop': numBike = 2; shopChoiceItem(infoBike[2], numBike, 'bike'); break;
			case 'btn-bike4-shop': numBike = 3; shopChoiceItem(infoBike[3], numBike, 'bike'); break;
			case 'btn-bike5-shop': numBike = 4; shopChoiceItem(infoBike[4], numBike, 'bike'); break;
			case 'btn-bike6-shop': numBike = 5; shopChoiceItem(infoBike[5], numBike, 'bike'); break;
			case 'btn-bike7-shop': numBike = 6; shopChoiceItem(infoBike[6], numBike, 'bike'); break;
			case 'btn-bike8-shop': numBike = 7; shopChoiceItem(infoBike[7], numBike, 'bike'); break;
		}
	}
}
function shopStimsFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-stm-shop':         numStim = 0; shopChoiceItem(infoStim[0], numStim, 'stim'); break;
			case 'btn-bigstm-shop':      numStim = 1; shopChoiceItem(infoStim[1], numStim, 'stim'); break;
			case 'btn-str-shop':         numStim = 2; shopChoiceItem(infoStim[2], numStim, 'stim'); break;
			case 'btn-bigstr-shop':      numStim = 3; shopChoiceItem(infoStim[3], numStim, 'stim'); break;
			case 'btn-str_x5F_stm1-shop':numStim = 4; shopChoiceItem(infoStim[4], numStim, 'stim'); break;
			case 'btn-str_x5F_stm2-shop':numStim = 5; shopChoiceItem(infoStim[5], numStim, 'stim'); break;
			case 'btn-str_x5F_stm3-shop':numStim = 6; shopChoiceItem(infoStim[6], numStim, 'stim'); break;
		}
	}
} 
function shopPurchsFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-money1-shop': numPurch = 0; shopChoiceItem(infoPurch[0], numPurch, 'purch'); break;
			case 'btn-money2-shop': numPurch = 1; shopChoiceItem(infoPurch[1], numPurch, 'purch'); break;
			case 'btn-money3-shop': numPurch = 2; shopChoiceItem(infoPurch[2], numPurch, 'purch'); break;
			case 'btn-sp1-shop':    numPurch = 3; shopChoiceItem(infoPurch[3], numPurch, 'purch'); break;
			case 'btn-sp2-shop':    numPurch = 4; shopChoiceItem(infoPurch[4], numPurch, 'purch'); break;
			case 'btn-sp3-shop':    numPurch = 5; shopChoiceItem(infoPurch[5], numPurch, 'purch'); break;
			case 'btn-money4-shop': numPurch = 6; shopChoiceItem(infoPurch[6], numPurch, 'purch'); break;
			case 'btn-money5-shop': numPurch = 7; shopChoiceItem(infoPurch[7], numPurch, 'purch'); break;	
			case 'btn-sp4-shop':    numPurch = 8; shopChoiceItem(infoPurch[8], numPurch, 'purch'); break;
			case 'btn-sp5-shop':    numPurch = 9; shopChoiceItem(infoPurch[9], numPurch, 'purch'); break;
		}
	}
} 
// Функция выбора вещи в магазине
function shopChoiceItem(infoItem, numItem, name) {
	if (sound == 'on') buttonSound.play();
	// Show info window 
	infoShopMA.style.display = 'block'; infoItem.style.display = 'block'; 
	itemName = name;
	if (!(itemName == 'dumb' && inventData.dumbInventFlag[numItem]) && !(itemName == 'bike' && inventData.bikeInventFlag[numItem]) && itemName !== 'purch') {
		btnBuyItem.style.display = 'block';
	} else if (itemName == 'purch') {
		if (numPurch < 6) {
			// Show btn Watch Ads
			infoBackgr.style.display = 'none'; btnBuyItem.style.display = 'none'; 
			infoPurchWind.style.display = 'block';
			// Init item money
			if (numPurch < 3) { 
				let lvlNum = Math.max(bodyData.bodyLvlNum, legsData.legsLvlNum);
				rewardShopMoney = Math.round(80 * Math.pow((1.27 - lvlNum * 0.0017), lvlNum - 1));
				if (numPurch == 0) infoItemReward[0].innerHTML = numFormat.format(rewardShopMoney); 
				else if (numPurch == 1) infoItemReward[1].innerHTML = numFormat.format(rewardShopMoney * 3); 
				else if (numPurch == 2) infoItemReward[2].innerHTML = numFormat.format(rewardShopMoney * 6);
			} // Init item sp
			else {
				rewardShopSp = Math.round(Math.max(charData.addSpBikeNum, charData.addSpDumbNum) * 0.8);
				if (numPurch == 3) infoItemReward[3].innerHTML = rewardShopSp; 
				else if (numPurch == 4) infoItemReward[4].innerHTML = rewardShopSp * 3; 
				else if (numPurch == 5) infoItemReward[5].innerHTML = rewardShopSp * 6;
			} // Show number ads
			if (langNum == 1) {
				if (watchAdsPurchNum[numPurch] == 1 || watchAdsPurchNum[numPurch] == 5) numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' раз';
				else numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' раза';
			} else if (langNum == 2) numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' vezes';
			else numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' times';
		} // Show purchases
		else {
			btnBuyItem.style.display = 'block'; pricePurchElem.style.display = 'block'; 
			pricePurchElem.innerHTML = pricePurchNum[numPurch-6];
		}
	}
}


// Обработчики кнопок покупок в окнах информации о предметах в магазине ************************************************************************
infoShopMA.addEventListener(clickDownEvent, infoItemsStart); 
infoShopMA.addEventListener(clickMoveEvent, infoItemsMove);
infoShopMA.addEventListener(clickUpEvent, infoItemsEnd);

function infoItemsStart() {
	moveFlag = false;
}
function infoItemsMove() {
	if (isMobile && !moveFlag) {
		moveFlag = true; hideInfoItems(); infoShopMA.style.display = 'none';
	}
}

function infoItemsEnd(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-buy-item':
				if (itemName == 'dumb') buyItemsFunc(priceDumbNum, numDumb, dumb_invent, inventData.dumbInventFlag);
				else if (itemName == 'bike') buyItemsFunc(priceBikeNum, numBike, bike_invent, inventData.bikeInventFlag);
				else if (itemName == 'stim') buyItemsFunc(priceStimNum, numStim, stim_invent);
				// else if (itemName == 'purch') {
				// 	if (infoPurch[6].style.display == 'block') purchaseMoney1();
				// 	else if (infoPurch[7].style.display == 'block') purchaseMoney2();
				// 	else if (infoPurch[8].style.display == 'block') purchaseSP1();
				// 	else if (infoPurch[9].style.display == 'block') purchaseSP2();
				// 	infoPurch[numPurch].style.display = 'none'; infoShopMA.style.display = 'none';
				// }
			break;
			// Btn Watch Ads
			case 'btn-watch-ads':
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
			// Нажатие по окну информации - закрытие окна.
			default: hideInfoItems(); infoShopMA.style.display = 'none'; 
		} 
	}
}

// Функция покупки предметов
function buyItemsFunc(priceItemNum, numItem, item_invent, itemInventFlag) { 
	if (charData.moneyNum >= priceItemNum[numItem]) {
		if (sound == 'on') moneySound.play(); 
		charData.moneyNum -= priceItemNum[numItem];
		window.localStorage.setItem("charDataKey1", JSON.stringify(charData)); 
		moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
		moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
		if (itemName == 'dumb') item_invent[numItem].style.display = 'block';
		else if (itemName == 'bike') item_invent[numItem].style.display = 'block';
		else if (itemName == 'stim') {
			//item_invent[0][numItem].style.display = 'block'; item_invent[1][numItem].style.display = 'block'; 
			inventData.stimInventNum[numItem] += 1; 
			stimQuantInvent[0][numItem].innerHTML = inventData.stimInventNum[numItem]; 
			stimQuantInvent[1][numItem].innerHTML = inventData.stimInventNum[numItem];
		} // Присваивание флага появления купленой вещи в инвертаре и исчезновение окна информации о предмете
		if (itemName !== 'stim') itemInventFlag[numItem] = true; 
		hideInfoItems(); infoShopMA.style.display = 'none';
		// LS
		window.localStorage.setItem("inventDataKey1", JSON.stringify(inventData));
	} // Появление сообщения о нехватке денег
	else {
		if (sound == 'on') failSound.play(); 
		hideInfoItems(); mesHavntMoney.style.display = 'block';
	}
}

// Функция исчезновения окон информации 
function hideInfoItems() { 
	if (itemName == 'dumb') infoDumb[numDumb].style.display = 'none';
	else if (itemName == 'bike') infoBike[numBike].style.display = 'none'; 
	else if (itemName == 'stim') infoStim[numStim].style.display = 'none';
	else if (itemName == 'purch') {
		infoPurch[numPurch].style.display = 'none';
		infoBackgr.style.display = 'block'; infoPurchWind.style.display = 'none';
		if (pricePurchElem.style.display == 'block') pricePurchElem.style.display = 'none';
	} else if (mesHavntMoney.style.display == 'block') mesHavntMoney.style.display = 'none';
	btnBuyItem.style.display = 'none'; itemName = null; 
}





// MENU OPTIONS ##############################################################################################################################
menuWinds[3].addEventListener(clickUpEvent, optionsFunc);
menuWinds[3].addEventListener(clickMoveEvent, clickFuncMove);
menuWinds[3].addEventListener(clickDownEvent, clickFuncStart);

function optionsFunc(event) {
	if (!moveFlag) {
		switch(event.target.id) {	
			// Включение-выключение музыки и звуков
			case 'sound-on-off':
				if (sound == 'on') {
					noSoundElem.style.display = 'block'; electroSound[trackFlag].pause(); sound = 'off';
				} else if (sound == 'off') {
					noSoundElem.style.display = 'none'; electroSound[trackFlag].play(); sound = 'on';
				} // LS
				window.localStorage.setItem("volumeDataKey1", sound);
			break;
			// Rate game
			// case 'btn-rate-game': 
			// 	rateGameFunc();
			// break;  
			// // Reset progress
			// case 'btn-reset-progress':
			// 	resetWindow.style.display = 'block';
			// break;  
			// Выход на стартовое окно
	        case 'btn-start-wind': 
	        	startWindow.style.display = 'block';
	        	if (pullupBtnCount > 0 || squatBtnCount > 0) cancelAnimationFrame(compBtnTimerIntvl); 
	        	// Hide open menu
				btns_menu[menuOpenNum].style.opacity = 0; menuWinds[menuOpenNum].style.display = 'none'; 
				// Set null menu number
				menuOpenNum = null;
	        break;
			// Select language
			case 'btn-change-lang':
				langWindOpt.style.display = 'block';
			break;  
			// Credits
	        case 'btn-credits': creditWindow.style.display = "block"; break; 
		} 
	}
}

// Обработчики кнопок в окне сброса выбора языка ************************************************************************************
langWindOpt.addEventListener(clickDownEvent, clickFuncStart);
langWindOpt.addEventListener(clickMoveEvent, clickFuncMove);
langWindOpt.addEventListener(clickUpEvent, changeLangFunc);

function changeLangFunc(event) {
	if (!moveFlag) {
		switch(event.target.id) {	
			case 'btn-lang-eng': selectLang(0); break; 
	        case 'btn-lang-rus': selectLang(1); break; 
	        case 'btn-lang-por': selectLang(2); break; 
		}
	}
}

// Функция смены фона игры (только в локациях dumb и bike) ***************************
backgrounds.addEventListener(clickUpEvent, changeBackgr);
function changeBackgr(event) {
	if (!moveFlag) {
		backgrMain[backgrFlag].style.display = 'none';
		backgrInvent[backgrFlag].style.display = 'none';
		backgrShop[backgrFlag].style.display = 'none';
		switch(event.target.id) {	
			case 'btn-backgr1':   
				backgrFlag = 0; 
				backgrMain[0].style.display = 'block'; backgrInvent[0].style.display = 'block'; backgrShop[0].style.display = 'block';
			break; 
	        case 'btn-backgr2':
	        	backgrFlag = 1; 
	        	backgrMain[1].style.display = 'block'; backgrInvent[1].style.display = 'block'; backgrShop[1].style.display = 'block'; 
	        break; 
	        case 'btn-backgr3':   
	        	backgrFlag = 2; 
	        	backgrMain[2].style.display = 'block'; backgrInvent[2].style.display = 'block'; backgrShop[2].style.display = 'block'; 
	        break; 
	        case 'btn-backgr4':   
	        	backgrFlag = 3; 
	        	backgrMain[3].style.display = 'block'; backgrInvent[3].style.display = 'block'; backgrShop[3].style.display = 'block'; 
	        break; 
		} window.localStorage.setItem("backgrKey1", backgrFlag);
		// Исчезновение окна опций
		closeMenu(3);
	}
}

// Обработчик кнопок смены музыкальных треков ***************************************************
soundTracks.addEventListener(clickUpEvent, changeTracks);
function changeTracks(event) {
	if (!moveFlag) {
		switch(event.target.id) {	
			case 'btn-track_x5F_1': selectTteck(0); break; 
	        case 'btn-track_x5F_2': selectTteck(1); break; 
	        case 'btn-track_x5F_3': selectTteck(2); break; 
		}
	}
}
function selectTteck(num) {
	if (sound == 'on') {
		electroSound[trackFlag].pause(); electroSound[trackFlag].currentTime = 0;
	} btnsTrack[trackFlag].style.opacity = '0.3';
	trackFlag = num; window.localStorage.setItem("trackKey1", trackFlag);
	btnsTrack[trackFlag].style.opacity = '0.6'; 
	if (sound == 'on') electroSound[trackFlag].play(); 
}



