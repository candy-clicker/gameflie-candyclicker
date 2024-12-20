"use strict";

// EVENT LISTENER CLICK GAME ###############################################################################################################
clickArea.addEventListener(clickDownEvent, clickStart); 
clickArea.addEventListener(clickMoveEvent, clickMove); 
clickArea.addEventListener(clickUpEvent, clickEnd); 

let clickFlag = false, rotateNum = 0, extraStopRotate = 1, stopTimer = false, mouthTimer = false, clickCount = 0;
		
function clickStart() { 
    if (!clickFlag && menuOpenNum < 0) {
    	clickFlag = true; 
    	// Change mouth
    	clickCount += 1;
    	if (!mouthTimer) changeMouthTimer();
	    // Work
	    if (actName == 'work') { 
	    	clearTimeout(stopTimer); stopTimer = false;
    		if (usageGenerFlag !== 'broken') {
    			if (extraStopRotate !== 1) extraStopRotate = 1;
		    	if (!workGeneratorIntrvl) workGenerator();
				if (!changeDataIntrvl) changeData();
			} else if (usageGenerFlag == 'broken') {
				shakeElem(hpBarGroup, hpBarIcon, '#DD7854'); flashElem(btnRepairUpgrade);
			}
		} // Repair or upgrade
		else if (moneyNum >= repairUpgrNum * 0.5 && moneyNum > 0) {
			if (actName == 'repair' && usageGenerFlag !== 'whole' || actName == 'upgrade') startRepairUpgrade();
		} // Mes havnt money 
		else if (moneyNum < repairUpgrNum * 0.5 || moneyNum == 0) shakeElem(moneyMainWindGroup, moneyQuant, '#F4EE14');
		//console.log('extraStopRotate ' + extraStopRotate);
    }
}
function changeMouthTimer() {
	mouthTimer = setTimeout(function() {
		if (clickCount >= 5 && mouthWork.style.display !== 'block') changeMouth('none', 'block', 2);
    	else if (clickCount < 5 && mouthStart.style.display !== 'block') changeMouth('block', 'none', 0);
    	mouthTimer = false; 
    	if (repairGeneratorIntrvl) {
	    	rotateK = 1 + clickCount * 0.2;
	    	if (rotateNumHalf) rotateK *= 0.5;
	    } clickCount = 0;
		if (workGeneratorIntrvl || repairGeneratorIntrvl) changeMouthTimer();
    }, 1000);
}
function clickMove() {
 	
}
function clickEnd() {
	if (menuOpenNum < 0) { 
	    clickFlag = false;
	    if (actName == 'work') { 
	    	stopTimer = setTimeout(function() {
		    	extraStopRotate = 0.045 / generatorResist; //(locNum + 5) * 2; // windK 
		    }, 1000);
		    if (usageGenerFlag !== 'broken') { 
			    // Отнимание стамины
			    decrStm(8);
			    // Rotate power
		    	if (rotateNumHalf) rotateNum += (charStr + strBoost) * 0.5; 
		    	else rotateNum += (charStr + strBoost);
				// Starting the generator and lighting the windows
		    	if (!workGeneratorIntrvl) workGenerator();
				if (!changeDataIntrvl) changeData();
			}
		} else if (actName !== 'work') { // && usageGenerFlag !== 'whole'
			clearTimeout(stopTimer); stopTimer = false;
			stopTimer = setTimeout(function() {
				posRepair = 3;
			}, 1000);
		}
	}
}
// Touchstart if repair or upgrade
function startRepairUpgrade() { //elemQuant repairQuant upgradeQuant
	if (!stopTimer) {
		stopTimer = setTimeout(function() {
			posRepair = 3;
		}, 1000);
	} decrStm(10); 
	if (rotateNumHalf) repairUpgrNum += (charInt * intBoost) * 2.5; 
	else repairUpgrNum += (charInt * intBoost) * 5;
	if (actName == 'repair') {
		if (generHpNum[generNum] + repairUpgrNum < generHpMaxNum[generNum]) repairQuant.innerHTML = numFormat.format(Math.round(generHpNum[generNum] + repairUpgrNum)) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum]));
		else repairQuant.innerHTML = numFormat.format(Math.round(generHpMaxNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum]));
	} else if (actName == 'upgrade') {
		if (generUpgradeNum[generNum] + repairUpgrNum < generHpMaxNum[generNum] * 4) upgradeQuant.innerHTML = numFormat.format(Math.round(generUpgradeNum[generNum] + repairUpgrNum)) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4));
		else upgradeQuant.innerHTML = numFormat.format(Math.round(generHpMaxNum[generNum] * 4)) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4));
	} // Mes first repair or upgrade
    if (!mesData.firstRepUpgrFlag) {
        mesData.firstRepUpgrFlag = true; window.localStorage.setItem("mesDataKey5", JSON.stringify(mesData)); 
        slowShowMes(mesFirstRepairUpgr); 
        mesFirstRepairUpgrTimer = setTimeout(function() {
        	slowHideMes(mesFirstRepairUpgr);
        }, 6000);
    } 
	if (!repairGeneratorIntrvl) repairUpgradeGenerator();
	if (!changeDataIntrvl) changeData();
}
// Decreased stamina function
function decrStm(num) {
	stmNum -= generatorResist * num;
    if (!rotateNumHalf && stmNum <= maxStmNum * 0.2) {
        rotateNumHalf = true; 
        stmIcon.style.fill = '#FF0000';
        // Сообщ о stm < 20%
        if (!mesData.mesStmFlag) {
            mesData.mesStmFlag = true; window.localStorage.setItem("mesDataKey5", JSON.stringify(mesData)); 
            slowShowMes(mesStmDrops); 
            mesStmDropsTimer = setTimeout(function() {
            	slowHideMes(mesStmDrops);
            }, 9000);
        } 
    } if (!recStamIntrvl) recoveryStamina();
    if (stmNum <= 0) stmNum = 0; 
}

// Char action ******************************************************************************************************************************
let workGeneratorIntrvl = false, moveDirFlag = 'down', autoBackFlag = false,
rotateHba = 0,
rotateRArm = 18.25, rotateRFirstArm = -36.5, rotateRPalm = 0,
rotateLArm = 18.25, rotateLFirstArm = -50, rotateLPalm = 0,
rotateLeg = 0, rotateFirstLeg = 0, rotateFoot = 0, transPedals = 0;
// Start pos arms
r_arm.style.WebkitTransform = 'rotate(' + rotateRArm + 'deg)'; f_r_arm.style.WebkitTransform = 'rotate(' + rotateRFirstArm + 'deg)';
l_arm.style.WebkitTransform = 'rotate(' + rotateLArm + 'deg)'; f_l_arm.style.WebkitTransform = 'rotate(' + rotateLFirstArm + 'deg)';

// Work with generator ***********************************************************************************
function workGenerator() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;
    r_pupil.style.WebkitTransform = 'translate(2px, 3px)'; l_pupil.style.WebkitTransform = 'translate(2px, 3px)';
    // energySound.play();
    function rafWorkGenerator() {
        workGeneratorIntrvl = requestAnimationFrame(rafWorkGenerator); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
            while (dt >= step) {
                dt -= step; k += 1;
            } 
            if (!autoBackFlag) {
	            // If holding click
	            if (clickFlag) {
	            	decrStm(k);
				    if (rotateNumHalf) rotateNum += ((charStr + strBoost) * 0.05 - generatorResist) * k;
				    else rotateNum += ((charStr + strBoost) * 0.1 - generatorResist) * k;
	            } // No holding click
	            else if (!clickFlag) rotateNum -= generatorResist * extraStopRotate * k;
	        } // Back to start pos
        	if (rotateNum <= 0) {
        		rotateNum = 1; autoBackFlag = true;
        		if (moveDirFlag !== 'up') moveDirFlag = 'up';
        	} 
            // Движение педали вниз
            if (moveDirFlag == 'down') { 
            	// Move arms
            	if (rotateRArm > 0) {
            		rotateHba += rotateNum * 0.125 * k; 
            		// rotateRArm -= rotateNum * 0.5 * k; rotateRFirstArm += rotateNum * 1 * k; rotateLFirstArm += rotateNum * 1 * k;
            	} // Move leg
            	rotateLeg += rotateNum * 1.3 * k; rotateFirstLeg -= rotateNum * 1.8 * k; rotateFoot += rotateNum * 0.5 * k; 
            	transPedals += rotateNum * 1.8 * k;
	            if (transPedals >= 65) {
	            	moveDirFlag = 'up';
	            	rotateHba = 4.56; // rotateRArm = 0; rotateRFirstArm = 0; rotateLFirstArm = -13.5;
            		rotateLeg = 46.94; rotateFirstLeg = -65; rotateFoot = 18.06; transPedals = 65;
            	} 
            } // Движение педали вверх
            else if (moveDirFlag == 'up') {
            	// Move arms
            	rotateHba -= rotateNum * 0.125 * k; 
            	// rotateRArm += rotateNum * 0.5 * k; rotateRFirstArm -= rotateNum * 1 * k; rotateLFirstArm -= rotateNum * 1 * k;
            	// Move leg
                rotateLeg -= rotateNum * 1.3 * k; rotateFirstLeg += rotateNum * 1.8 * k; rotateFoot -= rotateNum * 0.5 * k; 
            	transPedals -= rotateNum * 1.8 * k;
	            if (transPedals < 0) { 
	            	moveDirFlag = 'down';
	            	rotateHba = 0; // rotateRArm = 18.25; rotateRFirstArm = -36.5; rotateLFirstArm = -50;
            		rotateLeg = 0; rotateFirstLeg = 0; rotateFoot = 0; transPedals = 0;
            		if (autoBackFlag) {
            			// energySound.pause(); energySound.currentTime = 0;
            			autoBackFlag = false; rotateNum = 0;
            			cancelAnimationFrame(workGeneratorIntrvl); workGeneratorIntrvl = false;    
            			r_pupil.style.WebkitTransform = 'translate(0px, 0px)'; l_pupil.style.WebkitTransform = 'translate(0px, 0px)';
            		}
            	} 
            } // Set new transform rotate data
            hba.style.WebkitTransform = 'rotate(' + rotateHba + 'deg)';
            l_leg.style.WebkitTransform = 'rotate(' + rotateLeg + 'deg)'; l_f_leg.style.WebkitTransform = 'rotate(' + rotateFirstLeg + 'deg)'; 
			l_foot.style.WebkitTransform = 'rotate(' + rotateFoot + 'deg)'; pedal.style.WebkitTransform = 'translateY(' + transPedals + 'px)';
            k = 0;
            // console.log('clickFlag ' + clickFlag); console.log('rotateNum ' + rotateNum); 
			// console.log('rotateRArm ' + rotateRArm); console.log('rotateRFirstArm ' + rotateRFirstArm); 
            // console.log('rotateElem ' + rotateElem); console.log('rotateFirstElem ' + rotateFirstElem); console.log('rotatePalmFoot ' + rotatePalmFoot); 
            // console.log('transPedals ' + transPedals);
            // console.log('extraStopRotate ' + extraStopRotate); 
        }
    } rafWorkGenerator();
}

// Repair generator *****************************************************************************************
let repairGeneratorIntrvl = false, posRepair = 0, rotateK = 1;

function repairUpgradeGenerator() {
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;   
	r_pupil.style.WebkitTransform = 'translate(2px, 3px)'; l_pupil.style.WebkitTransform = 'translate(2px, 3px)';   
	rotateK = 1;   
    function rafWorkGenerator() {
        repairGeneratorIntrvl = requestAnimationFrame(rafWorkGenerator); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
            while (dt >= step) {
                dt -= step; k += 1;
            } 
            // Char elements move
            if (posRepair == 0) {
            	if (rotateHba < 35) rotateHba += 1 * rotateK * k;
            	if (rotateRArm > -70) rotateRArm -= 2.52 * rotateK * k;
            	if (rotateRFirstArm < 0) rotateRFirstArm += 1.22 * rotateK * k;
            	if (rotateRPalm < 30) rotateRPalm += 1 * rotateK * k;
            	if (rotateLArm > -35) rotateLArm -= 2 * rotateK * k;
            	if (rotateLFirstArm < -10) rotateLFirstArm += 1.34 * rotateK * k;
            	if (rotateLPalm > -20) rotateLPalm -= 0.66 * rotateK * k;
            	if (rotateHba >= 35) {
            		posRepair = 1; rotateHba = 35; 
					rotateRArm = -70; rotateRFirstArm = 0; rotateRPalm = 30;
					rotateLArm = -35; rotateLFirstArm = -10; rotateLPalm = -20;
            		//cancelAnimationFrame(repairGeneratorIntrvl); repairGeneratorIntrvl = false;
            	}
            } else if (posRepair == 1) {
            	rotateRArm -= 0.75 * rotateK * k; rotateRFirstArm -= 1.2 * rotateK * k; rotateRPalm -= 0.88 * rotateK * k;
            	rotateLArm += 0.65 * rotateK * k; rotateLFirstArm -= 1.7 * rotateK * k; rotateLPalm += 2 * rotateK * k;
            	if (rotateRArm <= -100) {
            		rotateRArm = -100; rotateRFirstArm = -48; rotateRPalm = -5.2;
					rotateLArm = -9; rotateLFirstArm = -78; rotateLPalm = 60;
            		posRepair = 2; //cancelAnimationFrame(repairGeneratorIntrvl); repairGeneratorIntrvl = false;
            	}
            } else if (posRepair == 2) {
            	if (soundData.soundFlag == 'on') rachetSound.play();
            	rotateRArm += 1 * rotateK * k; rotateRFirstArm += 1.58 * rotateK * k; rotateRPalm += 1.18 * rotateK * k;
            	rotateLArm -= 0.87 * rotateK * k; rotateLFirstArm += 2.25 * rotateK * k; rotateLPalm -= 2.65 * rotateK * k;
            	if (rotateRArm >= -70) {
            		if (soundData.soundFlag == 'on') hammerSound.play();
            		rotateRArm = -70; rotateRFirstArm = 0; rotateRPalm = 30;
					rotateLArm = -35; rotateLFirstArm = -10; rotateLPalm = -20;
            		posRepair = 1; //cancelAnimationFrame(repairGeneratorIntrvl); repairGeneratorIntrvl = false;
            	}
            } else if (posRepair == 3) {
            	if (rotateHba > 0) rotateHba -= 1.1 * rotateK * k;
            	if (rotateRArm < 18.25) rotateRArm += 4.56 * rotateK * k;
            	if (rotateRFirstArm > -36.5) rotateRFirstArm -= 1.84 * rotateK * k;
            	if (rotateRPalm > 0) rotateRPalm -= 1.5 * rotateK * k;
            	if (rotateLArm < 18.25) rotateLArm += 2.92 * rotateK * k;
            	if (rotateLFirstArm > -50) rotateLFirstArm -= 2 * rotateK * k;
            	else if (rotateLFirstArm < -50) rotateLFirstArm += 2 * rotateK * k;
            	if (rotateLPalm > 0) rotateLPalm -= 1 * rotateK * k;
            	else if (rotateLPalm < 0) rotateLPalm += 0.7 * rotateK * k;
            	if (rotateHba <= 0) {
            		cancelAnimationFrame(repairGeneratorIntrvl); repairGeneratorIntrvl = false;
            		r_pupil.style.WebkitTransform = 'translate(0px, 0px)'; l_pupil.style.WebkitTransform = 'translate(0px, 0px)';
            		posRepair = 0; rotateHba = 0; 
					rotateRArm = 18.25; rotateRFirstArm = -36.5; rotateRPalm = 0;
					rotateLArm = 18.25; rotateLFirstArm = -50; rotateLPalm = 0;
            		if (actName == 'repair' && usageGenerFlag == 'whole') choiceAct('work', upgradeBtnImg, repairMainWind, 'block', 'none'); 
            		else if (actName == 'upgrade' && generUpgradeNum[generNum] >= generHpMaxNum[generNum] * 4) {
            			showHpOrUpgrElem('block', 'none', '#E8CEAF', '#937D45', '#AA7337');
            			choiceAct('work', upgradeBtnImg, upgradeMainWind, 'block', 'none'); 
            			upgradeComplete(); 
            		}
            	}
            } hba.style.WebkitTransform = 'rotate(' + rotateHba + 'deg)';
			r_arm.style.WebkitTransform = 'rotate(' + rotateRArm + 'deg)'; f_r_arm.style.WebkitTransform = 'rotate(' + rotateRFirstArm + 'deg)'; 
			r_palm.style.WebkitTransform = 'rotate(' + rotateRPalm + 'deg)'; 
			l_arm.style.WebkitTransform = 'rotate(' + rotateLArm + 'deg)'; f_l_arm.style.WebkitTransform = 'rotate(' + rotateLFirstArm + 'deg)'; 
			l_palm.style.WebkitTransform = 'rotate(' + rotateLPalm + 'deg)'; 
            k = 0;
            // console.log('rotateK = ' + rotateK);
            // console.log('************');
            // console.log('rotateHba ' + rotateHba);
            // console.log('rotateRArm ' + rotateRArm);
            // console.log('rotateRFirstArm ' + rotateRFirstArm);
            // console.log('rotateRPalm ' + rotateRPalm);
            // console.log('rotateLArm ' + rotateLArm);
            // console.log('rotateLFirstArm ' + rotateLFirstArm);
            // console.log('rotateLPalm ' + rotateLPalm);
            // console.log('repairGeneratorIntrvl');
        }
    } rafWorkGenerator();
}




// SHOW LIGHT AND INFO STARS ######################################################################################################################
// Auto scrool ********************************************************************************************
let autoScroolIntrvl, cityX = 0, xK = 0;

function autoScrool() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;
    function rafAutoScrool() {
        autoScroolIntrvl = requestAnimationFrame(rafAutoScrool);
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) { 
            while (dt >= step) {
            	dt -= step; k += 1;
            } // Right
        	if (cityX >= (windowNum - startX) * numX) {
    			cityX -= xK * k;
        		if (cityX <= maxX) {
        			cityX = maxX; xK = 0; 
        			cancelAnimationFrame(autoScroolIntrvl); autoScroolIntrvl = false; 
        		}
        	} // Left 
        	else if (cityX < (windowNum - startX + 1) * numX) {
        		cityX += xK * k; 
        		// if (extraStopRotate == 1) cityX += xK * k; 
            	// else if (extraStopRotate > 1) cityX += xK * k * locNum; 
        		if (cityX >= 0) {
        			cityX = 0; xK = 0; 
        			cancelAnimationFrame(autoScroolIntrvl); autoScroolIntrvl = false;
        		}
        	} cityMA.style.transform = 'translateX(' + cityX + 'px)'; // cityMA.style.left = cityX +'px'; cityMA.scrollBy(xK, 0);
        	k = 0;
        	// console.log('autoScroolIntrvl');
        } 
    } rafAutoScrool();
}

// Energy display and lighting in windows **************************************************************************************************
let showInfoCount = 0, changeDataIntrvl = false, windowNum = 0, rewardMesTimer = false;

function changeData() { 
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0, hpDec = 0,hpNum = 0, mNum = 0, eNum = 0;    
    function rafChangeData() {
        changeDataIntrvl = requestAnimationFrame(rafChangeData); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) { 
        	dt -= step;
            while (dt >= step) {
                dt -= step; k += 1;
            } // Add to showInfoCount 
            showInfoCount += 1;
            // Show energy *******************************************************************************************************
            if (showInfoCount % 2 == 0) {	            
				energyNum = Math.floor(rotateNum * generatorEnergy); 
				
	            // Turning on the lights in the windows and scrolling through the city
	            if (energyNum > windowNum * windK && windowNum < windows[locNum].length && !autoBackFlag) { 
				// while (energyNum > windowNum * windK && windowNum < windows[locNum].length && !autoBackFlag) {
	            	windows[locNum][windowNum].style.fill = '#FFFECA'; 
					windowNum += 1;
					// Turning on the light in the last window
	            	if (windowNum == windows[locNum].length && !locAvailFlag[locNum + 1]) {
	            		if (soundData.soundFlag == 'on') lvlupSound.play();
	            		// mesData.complLoc[locNum] = true; window.localStorage.setItem("mesDataKey5", JSON.stringify(mesData)); 
	            		// Show mes about complete location
	            		if (mesReward.style.display == 'block') {
	            			rewardPics[rewardNum].style.display = 'none'; rewardGroupMes.style.display = 'none';
	            		} else slowShowMes(mesReward); 
						comlpGroupMes.style.display = 'block';
						// Get reward
						initRewardMes();
	    				if (rewardNum == 9) {
				            moneyNum += moneyRewNum; window.localStorage.setItem("moneyNumKey5", moneyNum); 
				            moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum));
				        } else {
							stimNum[rewardNum] += 1; window.localStorage.setItem("stimNumKey5", JSON.stringify(stimNum));
							quantStim[rewardNum].innerHTML = stimNum[rewardNum];
				        } // Close mes
						rewardMesTimer = setTimeout(function() {
							rewardMesTimer = false; slowHideMes(mesReward); 
							rewardPics[rewardNum].style.display = 'none'; comlpGroupMes.style.display = 'none';
						}, 4000);
						// Open new area
						if (locNum < 11) {
							locAvailFlag[locNum + 1] = true; window.localStorage.setItem("locAvailFlagKey5", JSON.stringify(locAvailFlag)); 
							btnMapLoc[locNum + 1].style.fill = '#00FF36'; btnMapLoc[locNum + 1].style.opacity = '0'; 
							intrstCount = 3;
						}
	            	}
	            } else if (energyNum < windowNum * windK) {
	            	windowNum -= 1; 
					windows[locNum][windowNum].style.fill = '#4F4748'; //colorWind;
	            } 
				if (energyNum > (windowNum) * windK) {
					energyNum = Math.floor(windowNum * windK);
					// rotateNum = energyNum / generatorEnergy;
				} energyQuant.innerHTML = numFormat.format(energyNum);
	        } // Scrool city **************************************************************************************************************
            if (showInfoCount % 6 == 0) {
            	// Start autoScrool() 
	            if (autoScroolIntrvl) {
	            	xK = Math.abs(cityX - (windowNum - startX) * numX) * 0.025; 
	            	// if (extraStopRotate == 1) xK = Math.abs(cityX - (windowNum - startX) * numX) * 0.025; 
	            	// else if (extraStopRotate > 1) xK = Math.abs(cityX - (windowNum - startX) * numX) * 0.025 * locNum; 
	            } else if (!autoScroolIntrvl && windowNum > startX && windowNum < startReturnX) autoScrool();
	            // Stop changeData()
	            if (!workGeneratorIntrvl && repairUpgrNum <= 0 && windowNum <= 0) { //console.log('STOP changeData()');
	        		cancelAnimationFrame(changeDataIntrvl); changeDataIntrvl = false;
	        		showInfoCount = 0; return;
	        	} 
            } // Change game data *******************************************************************************************************
            if (showInfoCount >= 60 && menuOpenNum < 0) { // showInfoCount >= 50
                showInfoCount = 0;
                // Work or repair **********************************************************************************
                if (actName !== 'upgrade') {
	                // Definition repairUpgrNum
		        	if (generHpNum[generNum] + repairUpgrNum > generHpMaxNum[generNum]) repairUpgrNum = generHpMaxNum[generNum] - generHpNum[generNum];
		        	// Add money *************************************************
	                mNum = windowNum * windK - repairUpgrNum * 0.5; 
	                moneyNum += mNum;  if (moneyNum < 0) moneyNum = 0;
	                window.localStorage.setItem("moneyNumKey5", moneyNum);
	                moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum)); // Money in main window
		            // Add exp ***************************************************
	                eNum = windowNum * windK + repairUpgrNum * 0.5;
	                expNum += eNum; window.localStorage.setItem("expNumKey5", expNum); 
		            progressExp.style.width = expNum * 25.7 / maxExpNum + '%'; //progressExp.value = expNum;
		            // Увеличение уровня
		            if (expNum >= maxExpNum && lvlNum <= 80) upLvl(); 
		            // Decr and add HP ********************************************
		            if (actName == 'work' && energyNum > generMaxEnergy) hpDec = (energyNum - generMaxEnergy); 
	            	else hpDec = 0;
		            hpNum = repairUpgrNum - hpDec; generHpNum[generNum] += hpNum; 
            		// Поломка генератора
	            	if (generHpNum[generNum] <= 0) {
	            		generHpNum[generNum] = 0; usageGenerFlag = 'broken'; 
	            		// Stop char move 
	            		if (workGeneratorIntrvl) {
							rotateNum = 1; autoBackFlag = true;
							if (moveDirFlag !== 'up') moveDirFlag = 'up';
						} 
	            	} // Починка генератора
		        	else if (generHpNum[generNum] >= generHpMaxNum[generNum] && usageGenerFlag !== 'whole') {
		        		generHpNum[generNum] = generHpMaxNum[generNum]; 
		        		usageGenerFlag = 'whole'; 
	        			if (actName == 'work') {
	        				upgradeBtnImg.style.display = 'block'; repairBtnImg.style.display = 'none';
	        			} else if (!repairGeneratorIntrvl) choiceAct('work', upgradeBtnImg, repairMainWind, 'block', 'none'); 
	        			else if (repairGeneratorIntrvl) posRepair = 3;     			
		        	} else if (usageGenerFlag == 'whole' && generHpNum[generNum] < generHpMaxNum[generNum]) {
	            		usageGenerFlag = 'used'; 
	            		repairBtnImg.style.display = 'block'; upgradeBtnImg.style.display = 'none'; 
	            	} else if (usageGenerFlag == 'broken' && generHpNum[generNum] > 0) usageGenerFlag = 'used'; 
	            	progressHp.style.width = generHpNum[generNum] * 12 / generHpMaxNum[generNum] + '%'; //progressHp.value = generHpNum[generNum]; 
			        window.localStorage.setItem("generHpNumKey5", JSON.stringify(generHpNum));
		            // Zeroing repairUpgrNum 
		            if (repairUpgrNum > 0) {
        				repairUpgrNum = 0; 
        				repairQuant.innerHTML = numFormat.format(Math.round(generHpNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum])); //repairUpgrNum;
		            }
	            } // Upgrade ************************************************************************************************
	            else if (actName == 'upgrade') {
	            	// Definition repairUpgrNum
		        	if (generUpgradeNum[generNum] + repairUpgrNum > generHpMaxNum[generNum] * 4) {
		        		repairUpgrNum = generHpMaxNum[generNum] * 4 - generUpgradeNum[generNum];
		        	} // Add money ***********************************************
	                moneyNum -= repairUpgrNum * 0.5; if (moneyNum < 0) moneyNum = 0;
	                window.localStorage.setItem("moneyNumKey5", moneyNum);
	                moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum)); // Money in main window
		            // Add exp ***************************************************************
	                expNum += repairUpgrNum * 0.5; window.localStorage.setItem("expNumKey5", expNum); 
		            progressExp.style.width = expNum * 25.7 / maxExpNum + '%'; //progressExp.value = expNum;
		            // Увеличение уровня
		            if (expNum >= maxExpNum && lvlNum < 60) upLvl();
		            // Add upgrade exp ******************************************
					generUpgradeNum[generNum] += repairUpgrNum; //progressUpgrade.value = generUpgradeNum[generNum]; 
					progressUpgrade.style.width = generUpgradeNum[generNum] * 12 / (generHpMaxNum[generNum] * 4) + '%';
					// Upgrade complete
					if (generUpgradeNum[generNum] >= generHpMaxNum[generNum] * 4 || moneyNum < repairUpgrNum * 0.5 || moneyNum == 0) {
						// Stop char move 
	            		if (!repairGeneratorIntrvl) {
	            			showHpOrUpgrElem('block', 'none', '#E8CEAF', '#937D45', '#AA7337');
	            			choiceAct('work', upgradeBtnImg, upgradeMainWind, 'block', 'none'); 
	            			if (generUpgradeNum[generNum] >= generHpMaxNum[generNum] * 4) upgradeComplete(); 
	            		} else posRepair = 3;
					} window.localStorage.setItem("generUpgradeNumKey5", JSON.stringify(generUpgradeNum));
		            // Zeroing repairUpgrNum 
		            if (repairUpgrNum > 0) {
        				repairUpgrNum = 0; 
        				upgradeQuant.innerHTML = numFormat.format(Math.round(generUpgradeNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4)); //repairUpgrNum;
        			}
	            }
            } k = 0;
            // console.log('changeDataIntrvl '); 
        }
    } rafChangeData();
}

// Generator upgrade
function upgradeComplete() {
	generUpgradeNum[generNum] = 0; window.localStorage.setItem("generUpgradeNumKey5", JSON.stringify(generUpgradeNum));
	// progressUpgrade.value = generUpgradeNum[generNum]; 
	progressUpgrade.style.width = generUpgradeNum[generNum] * 12 / (generHpMaxNum[generNum] * 4) + '%';
	// Gener upgrade lvl
	generUpgrLvl[generNum] += 1; window.localStorage.setItem("generUpgrLvlKey5", JSON.stringify(generUpgrLvl)); 
	// Generator energy
	generatorEnergy = Math.pow(2, (generNum + 2)) * Math.pow(1.5, (generUpgrLvl[generNum] - 1));
	generMaxEnergy = generatorEnergy * 2.5;
	// Generator resist
	generatorResist = 0.003 + 0.001 * generNum + 0.0005 * (generUpgrLvl[generNum] - 1);
	// Int num for repair and upgrade 
	generIntRepair = (generNum + generUpgrLvl[generNum]);
	generIntUpgrade = Math.round(generIntRepair * 1.5);
	// Generator HP
	generHpMaxNum[generNum] *= 1.5; window.localStorage.setItem("generHpMaxNumKey5", JSON.stringify(generHpMaxNum));
	generHpNum[generNum] = generHpMaxNum[generNum]; window.localStorage.setItem("generHpNumKey5", JSON.stringify(generHpNum));
	// progressHp.max = generHpMaxNum[generNum]; progressHp.value = generHpNum[generNum];
	progressHp.style.width = generHpNum[generNum] * 12 / generHpMaxNum[generNum] + '%';
	// Generator upgrade
	// progressUpgrade.max = generHpMaxNum[generNum] * 4; progressUpgrade.value = generUpgradeNum[generNum]; 
	progressUpgrade.style.width = generUpgradeNum[generNum] * 12 / (generHpMaxNum[generNum] * 4) + '%';
	// Zeroing repairUpgrNum 
	repairUpgrNum = 0; // repairQuant.innerHTML = Math.round(generHpNum[generNum]) + ' / ' + Math.round(generHpMaxNum[generNum]); //repairUpgrNum;
	upgradeQuant.innerHTML = numFormat.format(generUpgradeNum[generNum]) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4));
	// Show mes about upgrade generator
	slowShowMes(mesGenerImproved); setTimeout(function() {slowHideMes(mesGenerImproved);}, 2500);
	console.log('*********** ');
	console.log('generNum ' + generNum);
	console.log('generatorEnergy ' + generatorEnergy); console.log('generMaxEnergy ' + generMaxEnergy);
	console.log('generatorResist ' + generatorResist);
	console.log('generIntRepair ' + generIntRepair); console.log('generIntUpgrade ' + generIntUpgrade);
	console.log('generHpNum[generNum] ' + generHpNum[generNum]); console.log('generHpMaxNum[generNum] ' + generHpMaxNum[generNum]);
	console.log('generUpgradeNum[generNum] ' + generUpgradeNum[generNum]); console.log('progressUpgrade.max ' + generHpMaxNum[generNum] * 1);
}

// Level up
function upLvl() { 
	if (soundData.soundFlag == 'on') lvlupSound.play();
	spNum += addSpNum; window.localStorage.setItem("spNumKey5", spNum); 
	spMenu.innerHTML = spNum;
	// Увеличение Lvl ****************************************************************
	lvlNum += 1; window.localStorage.setItem("lvlNumKey5", lvlNum); 
	lvlQuant.innerHTML = lvlNum; 
	// Exp ***************************************************************************
	// Value exp
	expNum -= maxExpNum; window.localStorage.setItem("expNumKey5", expNum); 
	progressExp.style.width = expNum * 25.7 / maxExpNum + '%'; //progressExp.value = expNum; 
	// Max exp
	maxExpNum *= coefExp; window.localStorage.setItem("maxExpNumKey5", maxExpNum); 
	coefExp -= (0.04 - lvlNum * 0.0008); window.localStorage.setItem("coefExpKey5", coefExp); //(0.02 - i * 0.0003); (0.025 - i * 0.0004)
	// progressExp.max = maxExpNum;
	// Add strange ********************************************************************
	charStr += 0.002; window.localStorage.setItem("charStrKey5", charStr);
	// Add stamina ********************************************************************
	if (rotateNumHalf) rotateNumHalf = false;
	maxStmNum += 0.05; window.localStorage.setItem("maxStmNumKey5", maxStmNum); // (0.1 + 0.01 * lvlNum)
	recStm += 0.00005; window.localStorage.setItem("recStmKey5", recStm); // (0.0001 + 0.00001 * lvlNum)
	progressStm.style.width = stmNum * 25.7 / maxStmNum + '%'; //progressStm.max = maxStmNum; 
	if (!recStamIntrvl) recoveryStamina();
	// Status points ******************************************************************
	if (lvlNum % 3 == 0) addSpNum += 1; window.localStorage.setItem("addSpNumKey5", addSpNum);
	// Increase stim price
	stimPrice = stimPriceConst.map(function(num) {return Math.round(num * Math.pow((1.36 - lvlNum * 0.0016), lvlNum - 1));});
	// stimPrice = stimPrice.map(function(num) {return Math.round(num * (1.22 - lvlNum * 0.0007));});
	// window.localStorage.setItem("stimPriceKey5", JSON.stringify(stimPrice)); 
	// Show mes ***********************************************************************
	if (!mesClickFlag) {
		if (langNum == 1) lvlUpSpNum.innerHTML = '+ ' + addSpNum + ' СО';
		else if (langNum == 2) lvlUpSpNum.innerHTML = '+ ' + addSpNum + ' PS';
		else lvlUpSpNum.innerHTML = '+ ' + addSpNum + ' SP';
		slowShowMes(mesLvlUp);
		setTimeout(function() {slowHideMes(mesLvlUp);}, 2000);
	} // Unlock skin *****************************************************************
	if (lvlNum == 6) {
		skinsHaveElem[1].style.display = 'block'; skinsAvailFlag[1] = true;
	} else if (lvlNum == 11) { 
		skinsHaveElem[2].style.display = 'block'; skinsAvailFlag[2] = true; 
	} else if (lvlNum == 15) { 
		skinsHaveElem[3].style.display = 'block'; skinsAvailFlag[3] = true; 
	} else if (lvlNum == 18) { 
		skinsHaveElem[4].style.display = 'block'; skinsAvailFlag[4] = true; 
	} else if (lvlNum == 20) { 
		skinsHaveElem[5].style.display = 'block'; skinsAvailFlag[5] = true; 
	} else if (lvlNum == 21) { 
		skinsHaveElem[6].style.display = 'block'; skinsAvailFlag[6] = true; 
	} window.localStorage.setItem("skinsAvailFlagKey5", JSON.stringify(skinsAvailFlag)); 
}






