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

// Common data ******************************************************************************************************************************
let moveFlag = false,
rewardFailFlag = false, 
intrstCount = 0, intrstFailFlag = false,
showAdFlag = false, // Show or no ads
adNameFlag;
const charMA = document.getElementById('char-ma'), charArea = document.getElementById('char-area'), clickArea = document.getElementById('click-area'),
numFormat = new Intl.NumberFormat(),

// Main window data ***********************************************************************************************************************
backgr = document.getElementById('backgr'), // Background char area
// Char elements 
char = document.getElementById('char'), 
r_arm = document.getElementById('r_arm'), f_r_arm = document.getElementById('f_r_arm'), r_palm = document.getElementById('r_palm'),
l_arm = document.getElementById('l_arm'), f_l_arm = document.getElementById('f_l_arm'), l_palm = document.getElementById('l_palm'),
r_leg = document.getElementById('r_leg'), r_f_leg = document.getElementById('r_f_leg'), r_foot = document.getElementById('r_foot'),
l_leg = document.getElementById('l_leg'), l_f_leg = document.getElementById('l_f_leg'), l_foot = document.getElementById('l_foot'),
hba = document.getElementById('hba'), head = document.getElementById('face'), ass = document.getElementById('ass'),
r_low_eyelid = document.getElementById('r-low-eyelid'), r_up_eyelid = document.getElementById('r-up-eyelid'),
l_low_eyelid = document.getElementById('l-low-eyelid'), l_up_eyelid = document.getElementById('l-up-eyelid'),
r_pupil = document.getElementById('r-pupil'), l_pupil = document.getElementById('l-pupil'),
mouthStart = document.getElementById('mouth-start'), mouthWork = document.getElementById('mouth-work'),
pedal = document.getElementById('pedal'),
r_tool = document.getElementById('r-tool'), l_tool = document.getElementById('l-tool');
// Change mouth
function changeMouth(display1, display2, y) {
	mouthStart.style.display = display1; mouthWork.style.display = display2;
	r_up_eyelid.style.WebkitTransform = 'translateY(' + y + 'px)'; l_up_eyelid.style.WebkitTransform = 'translateY(' + y + 'px)';
	r_low_eyelid.style.WebkitTransform = 'translateY(' + -y * 0.5 + 'px)'; l_low_eyelid.style.WebkitTransform = 'translateY(' + y * 0.5 + 'px)';
}
// Tr.-or. char
hba.style.WebkitTransformOrigin = '154px 676.74px';//char.style.WebkitTransformOrigin = '154px 696.74px';char.style.transform = 'rotate3d(0, 1, 0 , 45deg)';
r_leg.style.WebkitTransformOrigin = '135.43px 690.68px'; r_f_leg.style.WebkitTransformOrigin = '139.8px 788.19px'; 
r_foot.style.WebkitTransformOrigin = '131.87px 883.66px';
l_leg.style.WebkitTransformOrigin = '166.2px 690.68px'; l_f_leg.style.WebkitTransformOrigin = '258.48px 702.33px'; 
l_foot.style.WebkitTransformOrigin = '244.76px 796.03px';
r_arm.style.WebkitTransformOrigin = '104.37px 570.57px'; f_r_arm.style.WebkitTransformOrigin = '98.28px 649.95px'; 
r_palm.style.WebkitTransformOrigin = '106.84px 717.78px'; 
l_arm.style.WebkitTransformOrigin = '183.6px 570.57px'; f_l_arm.style.WebkitTransformOrigin = '187.91px 649.5px'; 
l_palm.style.WebkitTransformOrigin = '197.1px 716.79px'; 
// Char clothes 
const head_Char = [document.getElementById('hat-1'),document.getElementById('hat-2'),document.getElementById('hat-3'),document.getElementById('hat-4'),document.getElementById('hat-5'),document.getElementById('hat-6'),document.getElementById('hat-7')],
body_Char = [document.getElementById('body-1'),document.getElementById('body-2'),document.getElementById('body-3'),document.getElementById('body-4'),document.getElementById('body-5'),document.getElementById('body-6'),document.getElementById('body-7')],
f_r_arm_Char = [null,null,document.getElementById('f_r_arm-3'),null,null,null,document.getElementById('f_r_arm-7')],
s_r_arm_Char = [document.getElementById('s_r_arm-1'),document.getElementById('s_r_arm-2'),document.getElementById('s_r_arm-3'),document.getElementById('s_r_arm-4'),document.getElementById('s_r_arm-5'),document.getElementById('s_r_arm-6'),document.getElementById('s_r_arm-7')],
f_l_arm_Char = [null,null,document.getElementById('f_l_arm-3'),null,null,null,document.getElementById('f_l_arm-7')],
s_l_arm_Char = [document.getElementById('s_l_arm-1'),document.getElementById('s_l_arm-2'),document.getElementById('s_l_arm-3'),document.getElementById('s_l_arm-4'),document.getElementById('s_l_arm-5'),document.getElementById('s_l_arm-6'),document.getElementById('s_l_arm-7')],
f_r_leg_Char = [document.getElementById('r_f_leg-1'),null,document.getElementById('r_f_leg-3'),document.getElementById('r_f_leg-4'),null,document.getElementById('r_f_leg-6'),document.getElementById('r_f_leg-7')],
s_r_leg_Char = [document.getElementById('r_s_leg-1'),document.getElementById('r_s_leg-2'),document.getElementById('r_s_leg-3'),document.getElementById('r_s_leg-4'),document.getElementById('r_s_leg-5'),document.getElementById('r_s_leg-6'),document.getElementById('r_s_leg-7')],
r_foot_Char = [document.getElementById('r_foot-1'),document.getElementById('r_foot-2'),document.getElementById('r_foot-3'),document.getElementById('r_foot-4'),document.getElementById('r_foot-5'),document.getElementById('r_foot-6'),document.getElementById('r_foot-7')],
f_l_leg_Char = [document.getElementById('l_f_leg-1'),null,document.getElementById('l_f_leg-3'),document.getElementById('l_f_leg-4'),null,document.getElementById('l_f_leg-6'),document.getElementById('l_f_leg-7')],
s_l_leg_Char = [document.getElementById('l_s_leg-1'),document.getElementById('l_s_leg-2'),document.getElementById('l_s_leg-3'),document.getElementById('l_s_leg-4'),document.getElementById('l_s_leg-5'),document.getElementById('l_s_leg-6'),document.getElementById('l_s_leg-7')],
l_foot_Char = [document.getElementById('l_foot-1'),document.getElementById('l_foot-2'),document.getElementById('l_foot-3'),document.getElementById('l_foot-4'),document.getElementById('l_foot-5'),document.getElementById('l_foot-6'),document.getElementById('l_foot-7')],
ass_Char = [document.getElementById('ass-1'),document.getElementById('ass-2'),document.getElementById('ass-3'),document.getElementById('ass-4'),document.getElementById('ass-5'),document.getElementById('ass-6'),document.getElementById('ass-7')];


// Exp ******************************************************************
let expNum;
if (window.localStorage.getItem("expNumKey5") !== null) expNum = +window.localStorage.getItem("expNumKey5");
else expNum = 0;
// Max exp
let maxExpNum;
if (window.localStorage.getItem("maxExpNumKey5") !== null) maxExpNum = +window.localStorage.getItem("maxExpNumKey5");
else maxExpNum = 40;
// Show exp progress
const progressExp = document.getElementById('progress-exp');
progressExp.style.width = expNum * 25.7 / maxExpNum + '%'; // progressExp.value = expNum; progressExp.max = maxExpNum;

// Stm *******************************************************************
let maxStmNum;
if (window.localStorage.getItem("maxStmNumKey5") !== null) maxStmNum = +window.localStorage.getItem("maxStmNumKey5");
else maxStmNum = 1;
let stmNum = maxStmNum;
// Show stm progress
const stmIcon = document.getElementById('stm-icon'),
progressStm = document.getElementById('progress-stm'), progrStmRed = document.getElementById('progress-stm-red');
// progressStm.value = stmNum; progressStm.max = maxStmNum;
progressStm.style.width = stmNum * 25.7 / maxStmNum + '%';
// Coef decrease power
// const stmCoef = document.getElementById('stm-coef');
// let powerDecrNum = 1; stmCoef.innerHTML = 'Power x ' + powerDecrNum;
let rotateNumHalf = false, recStamIntrvl = false;
// Recovery stm
function recoveryStamina() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0, m = 0;
    function rafRecoveryStamina() {
        recStamIntrvl = requestAnimationFrame(rafRecoveryStamina); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
	        while (dt >= step) {
	        	dt -= step;	k += 1;
		    } // Востановление выносливости
		    stmNum += recStm * stmBoost * k; 
		    // Увеличение силы после востановления > 20%
	        if (stmNum > maxStmNum * 0.2) {
	            if (rotateNumHalf) rotateNumHalf = false;
	            if (stmIcon.style.fill !== '#14EFE9') stmIcon.style.fill = '#14EFE9';
	        } // Остановка востановления стамины
	        if (stmNum >= maxStmNum) {
	            stmNum = maxStmNum; 
	            cancelAnimationFrame(recStamIntrvl); recStamIntrvl = false;
	        } // Значение стамины в статус баре
	        progressStm.style.width = stmNum * 25.7 / maxStmNum + '%'; // progressStm.value = stmNum;
	        k = 0;
	        //console.log('stmNum ' + stmNum);
	    }
    } rafRecoveryStamina();
}

// Energy ***************************************************************
const energyMainWind = document.getElementById('energy-main-wind-group'), energyQuant = document.getElementById('energy-quant');
let energyNum = 0;

// Money ****************************************************************
let moneyNum;
if (window.localStorage.getItem("moneyNumKey5") !== null) moneyNum = +window.localStorage.getItem("moneyNumKey5");
else moneyNum = 0;
const moneyMainWindGroup = document.getElementById('money-main-wind-group'),
moneyQuant = document.getElementById('money-quant'); moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum));

// Lvl *******************************************************************
let lvlNum; 
if (window.localStorage.getItem("lvlNumKey5") !== null) lvlNum = +window.localStorage.getItem("lvlNumKey5");
else lvlNum = 1;
const lvlQuant = document.getElementById('lvl-main-wind'); lvlQuant.innerHTML = lvlNum;
// Coef exp
let coefExp;
if (window.localStorage.getItem("coefExpKey5") !== null) coefExp = +window.localStorage.getItem("coefExpKey5");
else coefExp = 2;


// Gemerators in main window *******************************************************************************************************************
const generMainWind = [document.getElementById('generator_1'),document.getElementById('generator_2'),document.getElementById('generator_3'),document.getElementById('generator_4'),document.getElementById('generator_5'),document.getElementById('generator_6'),document.getElementById('generator_7'),document.getElementById('generator_8'),document.getElementById('generator_9'),document.getElementById('generator_10'),document.getElementById('generator_11'),document.getElementById('generator_12'),document.getElementById('generator_13'),document.getElementById('generator_14')];
// const generNumMainWind = document.getElementById('gener-num-main-wind'); // Delete after test <-- ("\(*_*)/") 
// Generator number
let generNum;
if (window.localStorage.getItem("generNumKey5") !== null) generNum = +window.localStorage.getItem("generNumKey5");
else generNum = 0;
// Show generator
generMainWind[generNum].style.display = 'block';
// Flags of available generators ********************************************************
let generAvailFlag;
if (window.localStorage.getItem("generAvailFlagKey5") !== null) generAvailFlag = JSON.parse(window.localStorage.getItem("generAvailFlagKey5")); 
else generAvailFlag = [true,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
// Generator Upgrade *******************************************************************
let generUpgrLvl;
if (window.localStorage.getItem("generUpgrLvlKey5") !== null) generUpgrLvl = JSON.parse(window.localStorage.getItem("generUpgrLvlKey5")); 
else generUpgrLvl = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
// Generator resist *******************************************************************
let generatorResist = 0.003 + 0.001 * generNum + 0.0005 * (generUpgrLvl[generNum] - 1),
// Generator energy ******************************************************************
generatorEnergy = Math.pow(2, (generNum + 2)) * Math.pow(1.5, (generUpgrLvl[generNum] - 1)); 
let generMaxEnergy = generatorEnergy * 2.5; 
// Generator HP num ********************************************************************
let generHpNum;
if (window.localStorage.getItem("generHpNumKey5") !== null) generHpNum = JSON.parse(window.localStorage.getItem("generHpNumKey5")); 
else generHpNum = [500,1000,2000,4000,8000,16000,32000,64000,128000,256000,512000,1024000,2048000,4096000];
// generHpNum = [100,200,400,800,1600,3200,6400,12800,25600,51200,102400,204800,409600,819200];
let generHpMaxNum;
if (window.localStorage.getItem("generHpMaxNumKey5") !== null) generHpMaxNum = JSON.parse(window.localStorage.getItem("generHpMaxNumKey5")); 
else generHpMaxNum = [500,1000,2000,4000,8000,16000,32000,64000,128000,256000,512000,1024000,2048000,4096000];
// HP progress bar
const hpBarGroup = document.getElementById('hp-bar-group'), hpBarIcon = document.getElementById('hp-bar-icon'),
progressHp = document.getElementById('progress-hp'), hpIconInfoStar = document.getElementById('hp-icon-info-star');
// progressHp.max = generHpMaxNum[generNum]; progressHp.value = generHpNum[generNum];
progressHp.style.width = generHpNum[generNum] * 12 / generHpMaxNum[generNum] + '%';
// Generator upgrade num ***************************************************************
let generUpgradeNum;
if (window.localStorage.getItem("generUpgradeNumKey5") !== null) generUpgradeNum = JSON.parse(window.localStorage.getItem("generUpgradeNumKey5")); 
else generUpgradeNum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// Upgrade progress bar
const upgradeBarGroup = document.getElementById('upgrade-bar-group'), upgradeBarIcon = document.getElementById('upgrade-bar-icon'),
progressUpgrade = document.getElementById('progress-upgrade'), upgrIconInfoStar = document.getElementById('upgr-icon-info-star');
// progressUpgrade.max = generHpMaxNum[generNum] * 4; progressUpgrade.value = generUpgradeNum[generNum]; 
progressUpgrade.style.width = generUpgradeNum[generNum] * 12 / (generHpMaxNum[generNum] * 4) + '%';
// Int num for repair and upgrade ******************************************************
let generIntRepair = (generNum + generUpgrLvl[generNum]),
generIntUpgrade = Math.round(generIntRepair * 1.5);
console.log('*********** '); 
console.log('generNum ' + generNum); console.log('generUpgrLvl[generNum] ' + generUpgrLvl[generNum]);
console.log('generatorEnergy ' + generatorEnergy); console.log('generMaxEnergy ' + generMaxEnergy);
console.log('generatorResist ' + generatorResist);
console.log('generIntRepair ' + generIntRepair); console.log('generIntUpgrade ' + generIntUpgrade);
console.log('generHpNum[generNum] ' + generHpNum[generNum]); console.log('generHpMaxNum[generNum] ' + generHpMaxNum[generNum]);
console.log('generUpgradeNum[generNum] ' + generUpgradeNum[generNum]); console.log('progressUpgrade.max ' + progressUpgrade.max);

// Repair ***************************************************************
let repairUpgrNum = 0; 
const repairMainWind = document.getElementById('repair-main-wind-group'), repairQuant = document.getElementById('repair-quant');
repairQuant.innerHTML = numFormat.format(Math.round(generHpNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum])); //repairUpgrNum;
// Upgrade ***************************************************************
const upgradeMainWind = document.getElementById('upgrade-main-wind-group'), upgradeQuant = document.getElementById('upgrade-quant');
upgradeQuant.innerHTML = numFormat.format(Math.round(generUpgradeNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4)); //repairUpgrNum;





// BTN REPAIR AND UPGRADE ####################################################################################################################
const btnRepairUpgrade = document.getElementById('btn-repair-upgrade'),
repairBtnImg = document.getElementById('repair-elem'), upgradeBtnImg = document.getElementById('upgrade-elem'), 
repairUpgradeBtnExitImg = document.getElementById('exit-repair-upgrade-elem');
// Generator usage flag - whole, used, broken *************************************
let usageGenerFlag, actName = 'work';
if (generHpNum[generNum] >= generHpMaxNum[generNum]) {
	repairBtnImg.style.display = 'none'; upgradeBtnImg.style.display = 'block'; 
	usageGenerFlag = 'whole'; 
} else {
	repairBtnImg.style.display = 'block'; upgradeBtnImg.style.display = 'none'; 
	if (generHpNum[generNum] <= 0) usageGenerFlag = 'broken';
	else usageGenerFlag = 'used';
} 

// Event listener btn repair and upgrade ************************************************************************************
btnRepairUpgrade.addEventListener(clickDownEvent, clickFuncStart03);
btnRepairUpgrade.addEventListener(clickMoveEvent, clickFuncMove03);
btnRepairUpgrade.addEventListener(clickUpEvent, btnRepairFunc);

function btnRepairFunc(event) {
	if (!moveFlag && !clickFlag) {
		// Choice repair
		if (repairBtnImg.style.display == 'block') {
			if (intLvlNum >= generIntRepair) choiceAct('repair', repairBtnImg, repairMainWind, 'none', 'block');
			// Mes havnt int
			else if (!mesClickFlag) {
				if (soundData.soundFlag == 'on') failSound.play(); 
				if (langNum == 1) {
					mesHavntIntAct.innerHTML = 'Ремонт'; mesHavntIntNum.innerHTML = generIntRepair + ' Инт';
				} else if (langNum == 2) {
					mesHavntIntAct.innerHTML = 'O reparo'; mesHavntIntNum.innerHTML = generIntRepair + ' Int';
				} else {
					mesHavntIntAct.innerHTML = 'Repair'; mesHavntIntNum.innerHTML = generIntRepair + ' Int';
				} slowShowMes(mesHavntInt); setTimeout(function() {slowHideMes(mesHavntInt);}, 2000);
			}
		} // Choice upgrade
		else if (upgradeBtnImg.style.display == 'block') {
			// Mes upgrade in main wind
			if (intLvlNum >= generIntUpgrade) {
				generInfoDataNum[0][0] = Math.round(generMaxEnergy); generInfoDataNum[0][1] = Math.round(generHpMaxNum[generNum]);
				generInfoDataNum[1][0] = Math.round(generMaxEnergy * 1.5); generInfoDataNum[1][1] = Math.round(generHpMaxNum[generNum] * 1.5);
				generInfoData[0][0].innerHTML = numFormat.format(generInfoDataNum[0][0]); 
				generInfoData[0][1].innerHTML = numFormat.format(generInfoDataNum[0][1]);
				generInfoData[1][0].innerHTML = numFormat.format(generInfoDataNum[1][0]); 
				generInfoData[1][1].innerHTML = numFormat.format(generInfoDataNum[1][1]);
				centerPos(generInfoDataNum[0][0], generInfoGroup[0][0]); centerPos(generInfoDataNum[0][1], generInfoGroup[0][1]);
				centerPos(generInfoDataNum[1][0], generInfoGroup[1][0]); centerPos(generInfoDataNum[1][1], generInfoGroup[1][1]);
				// Show mes
				slowShowMes(infoUpgrMainWind);
			} // Mes havnt int 
			else if (!mesClickFlag) {
				if (soundData.soundFlag == 'on') failSound.play(); 
				if (langNum == 1) {
					mesHavntIntAct.innerHTML = 'Aпгрейд'; mesHavntIntNum.innerHTML = generIntRepair + ' Инт';
				} else if (langNum == 2) {
					mesHavntIntAct.innerHTML = 'Upgrade'; mesHavntIntNum.innerHTML = generIntRepair + ' Int';
				} else {
					mesHavntIntAct.innerHTML = 'Upgrade'; mesHavntIntNum.innerHTML = generIntUpgrade + ' Int';
				} slowShowMes(mesHavntInt); setTimeout(function() {slowHideMes(mesHavntInt);}, 2000);
			}
		} // Choice work
		else if (repairUpgradeBtnExitImg.style.display == 'block') {
			if (actName == 'repair' && usageGenerFlag !== 'whole') choiceAct('work', repairBtnImg, repairMainWind, 'block', 'none');
			else if (actName == 'upgrade' && generUpgradeNum[generNum] < generHpMaxNum[generNum] * 4) {
				showHpOrUpgrElem('block', 'none'); //, '#E8CEAF', '#937D45', '#AA7337'
				choiceAct('work', upgradeBtnImg, upgradeMainWind, 'block', 'none');
			}
		} event.target.style.opacity = '0';
	}
}
function showHpOrUpgrElem(display1, display2) { // , color1, color2, color3
	hpBarGroup.style.display = display1; upgradeBarGroup.style.display = display2; 
	// hpIconInfoStar.style.display = display1; upgrIconInfoStar.style.display = display2; 
	// hpBackgrInfoStar.style.fill = color1; hpBackgrInfoStar.style.stroke = color2; quantHpShowElem.style.fill = color3;
}
function choiceAct(action, elemBtnImg, elemMainWind, display1, display2) {
	if (soundData.soundFlag == 'on') buttonSound.play();
	// Stop char move
	if (actName == 'work' && workGeneratorIntrvl) { 
		cancelAnimationFrame(workGeneratorIntrvl); workGeneratorIntrvl = false;
		moveDirFlag = 'down'; autoBackFlag = false; rotateNum = 0; 
	} else if (actName !== 'work' && repairGeneratorIntrvl) {
		cancelAnimationFrame(repairGeneratorIntrvl); repairGeneratorIntrvl = false;
		posRepair = 0; //repairUpgrNum = 0; repairQuant.innerHTML = repairUpgrNum;
	} charStartPos(); 
	// Change data
	actName = action; 
	elemBtnImg.style.display = display1; repairUpgradeBtnExitImg.style.display = display2; 
	energyMainWind.style.display = display1; elemMainWind.style.display = display2; 
	r_tool.style.display = display2; l_tool.style.display = display2;
	if (actName !== 'work') {
		char.append(hba);
		if (actName == 'repair') repairQuant.innerHTML = numFormat.format(Math.round(generHpNum[generNum] + repairUpgrNum)) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum]));
		else if (actName == 'upgrade') upgradeQuant.innerHTML = numFormat.format(Math.round(generUpgradeNum[generNum] + repairUpgrNum)) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4));
	} else if (actName == 'work') {
		char.append(l_leg); char.append(ass);
	} //console.log('choiceAct()');
}
function charStartPos() {
	// Start char pos 
	rotateRArm = 18.25; rotateRFirstArm = -36.5; rotateRPalm = 0; rotateLArm = 18.25; rotateLFirstArm = -50; rotateLPalm = 0;
	rotateHba = 0; rotateLeg = 0; rotateFirstLeg = 0; rotateFoot = 0; transPedals = 0;
	hba.style.WebkitTransform = 'rotate(' + rotateHba + 'deg)';
	l_leg.style.WebkitTransform = 'rotate(' + rotateLeg + 'deg)'; l_f_leg.style.WebkitTransform = 'rotate(' + rotateFirstLeg + 'deg)'; 
	l_foot.style.WebkitTransform = 'rotate(' + rotateFoot + 'deg)'; pedal.style.WebkitTransform = 'translateY(' + transPedals + 'px)'; 
	r_arm.style.WebkitTransform = 'rotate(' + rotateRArm + 'deg)'; f_r_arm.style.WebkitTransform = 'rotate(' + rotateRFirstArm + 'deg)'; 
	r_palm.style.WebkitTransform = 'rotate(' + rotateRPalm + 'deg)'; 
	l_arm.style.WebkitTransform = 'rotate(' + rotateLArm + 'deg)'; f_l_arm.style.WebkitTransform = 'rotate(' + rotateLFirstArm + 'deg)'; 
	l_palm.style.WebkitTransform = 'rotate(' + rotateLPalm + 'deg)'; 
}


// Upgrade info window in main window ***********************************************************************************************************
const infoUpgrMainWind = document.getElementById('info-upgrade-main-wind'), btnInfoUpgrade = document.getElementById('btn-info-upgrade'),
generInfoGroup = [
	[document.getElementById('energy-upgr-info-1'), document.getElementById('hp-upgr-info-1')],
	[document.getElementById('energy-upgr-info-2'), document.getElementById('hp-upgr-info-2')]
],
generInfoData = [
	[document.getElementById('gener-energy-info-1'), document.getElementById('gener-hp-info-1')],
	[document.getElementById('gener-energy-info-2'), document.getElementById('gener-hp-info-2')]
];
let generInfoDataNum = [[0, 0], [0, 0]];

// Event listener upgrade btn ***********************************************************************
infoUpgrMainWind.addEventListener(clickDownEvent, btnInfoUprgStart);
infoUpgrMainWind.addEventListener(clickMoveEvent, btnInfoUprgMove);
infoUpgrMainWind.addEventListener(clickUpEvent, btnInfoUprgEnd);

function btnInfoUprgStart(event) {
	moveFlag = false;
	if (event.target.id == 'btn-info-upgrade') event.target.style.opacity = '0.3';
}
function btnInfoUprgMove(event) {
	if (isMobileFlag && !moveFlag) moveFlag = true;
	if (event.target.id == 'btn-info-upgrade' && event.target.style.opacity !== '0') event.target.style.opacity = '0';
}
function btnInfoUprgEnd(event) {
	// Upgrade btn
	if (event.target.id == 'btn-info-upgrade') {
		repairUpgrNum = 0; upgradeQuant.innerHTML = numFormat.format(Math.round(generUpgradeNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4)); //repairUpgrNum;
		showHpOrUpgrElem('none', 'block'); // , '#CADBE0', '#638989', '#6A8DA5'
		choiceAct('upgrade', upgradeBtnImg, upgradeMainWind, 'none', 'block');
		// Hide mes
		slowHideMes(infoUpgrMainWind);
		event.target.style.opacity = '0';
	} // Exit area
	else if (event.target.id == 'exit-info-upgr-main-wind') slowHideMes(infoUpgrMainWind);
}





// BOOSTS IN MAIN WINDOW #########################################################################################################################
let downTimerStimIntrvl = false;
const stimTimerGroup = document.getElementById('stim-timer-group'), stimTimer = document.getElementById('stim-timer'),
stimTimerImg = [document.getElementById('stim-1-timer-img'),document.getElementById('stim-2-timer-img'),document.getElementById('stim-3-timer-img'),document.getElementById('stim-4-timer-img'),document.getElementById('stim-5-timer-img'),document.getElementById('stim-6-timer-img'),document.getElementById('stim-7-timer-img'),document.getElementById('stim-8-timer-img'),document.getElementById('stim-9-timer-img')];
// Timer stim
let stimTimerNum;
if (window.localStorage.getItem("stimTimerNumKey5") !== null) stimTimerNum = JSON.parse(window.localStorage.getItem("stimTimerNumKey5")); 
else stimTimerNum = [60,60,60,70,70,70,70,80,90];
// Use stimulator num 
let useStimNum;
if (window.localStorage.getItem("useStimNumKey5") !== null) useStimNum = +window.localStorage.getItem("useStimNumKey5");
else useStimNum = -1;
if (useStimNum > -1) {
	// Появление иконки и таймера в mainMA
    stimTimerGroup.style.display = 'block'; stimTimerImg[useStimNum].style.display = 'block';
    stimTimer.innerHTML = stimTimerNum[useStimNum]; 
    downTimerStim();
} // Boost data
let strBoost = 0, stmBoost = 1, intBoost = 1;
function setBoost() {
	switch (useStimNum) {		
		case 0: strBoost = 0.008; break;
		case 1: stmBoost = 1.2; break;
		case 2: intBoost = 1.25; break;
		case 3: strBoost = 0.016; break;
		case 4: stmBoost = 1.4; break;
		case 5: intBoost = 1.5; break;
		case 6: strBoost = 0.016; stmBoost = 1.4; intBoost = 1.5; break;
		case 7: strBoost = 0.024; stmBoost = 1.6; intBoost = 1.75; break;
		case 8: strBoost = 0.032; stmBoost = 1.8; intBoost = 2; break;
	}
} setBoost();

// Stim timer function
function downTimerStim() {
    let last = performance.now(), now, step = 1000, dt = 0;        
    function rafDownTimerStim() {
        downTimerStimIntrvl = requestAnimationFrame(rafDownTimerStim); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
            dt -= step; 
            // Уменьшение таймера стимуляторов
            stimTimerNum[useStimNum] -= 1; stimTimer.innerHTML = stimTimerNum[useStimNum];
            // Исчезновение иконки и таймера стимулятора
            if (stimTimerNum[useStimNum] <= 0) { 
                cancelAnimationFrame(downTimerStimIntrvl); downTimerStimIntrvl = false;
                stimTimerImg[useStimNum].style.display = 'none'; stimTimerGroup.style.display = 'none';
                useStimNum = -1; window.localStorage.setItem("useStimNumKey5", useStimNum);
                stimTimerNum = [60,60,60,70,70,70,70,80,90];
                // Начальные значения коэф стимуляторов
                strBoost = 0; stmBoost = 1; intBoost = 1;
            } window.localStorage.setItem("stimTimerNumKey5", JSON.stringify(stimTimerNum));
        }
    } rafDownTimerStim();
}





// BIRDS ###################################################################################################################################
const birdsGroup = document.getElementById('birds'),
bird = [document.getElementById('bird1'),document.getElementById('bird2'),document.getElementById('bird3')],
birdWing = [
	[document.getElementById('r_wing_bird1'), document.getElementById('l_wing_bird1')],
	[document.getElementById('r_wing_bird2'), document.getElementById('l_wing_bird2')],
	[document.getElementById('r_wing_bird3'), document.getElementById('l_wing_bird3')]
];
// Смещение птиц влево
birdsGroup.style.transform = 'translateX(-115px)';
// Tr.-or. wings
birdWing[0][0].style.transformOrigin = '28.32px 261.85px'; birdWing[0][1].style.transformOrigin = '59.08px 261.85px';
birdWing[1][0].style.transformOrigin = '27.72px 258px'; birdWing[1][1].style.transformOrigin = '59.21px 258px';
birdWing[2][0].style.transformOrigin = '27px 232.75px'; birdWing[2][1].style.transformOrigin = '60.5px 232.75px';
// Данные по птицам и награде 
let showBirdCount, showBirdIntvl = false, moveBirdIntrvl = false, 
birdNum, birdX = 0, birdY = 0;

if (window.localStorage.getItem("showBirdKey5") !== null) showBirdCount = +window.localStorage.getItem("showBirdKey5");
else showBirdCount = 0;

function showBird() {
    let showBirdNum, trajectoryNum;
    let last = performance.now(), step = 1000, dt = 0;         
    function rafBirdAnimFunc() {
        showBirdIntvl = requestAnimationFrame(rafBirdAnimFunc); 
        let now = performance.now(); dt += (now - last); last = now;
        if (dt > step) {
            dt -= step; showBirdCount += 1;
            if (showBirdCount >= 100) {
                showBirdCount = 0;
                cancelAnimationFrame(showBirdIntvl); showBirdIntvl = false;
                // Рандомный выбор появляющейся птицы
                birdNum = Math.floor(Math.random() * 3);
                // Рандомный выбор траектории полета
                trajectoryNum = Math.floor(Math.random() * 2); 
                // Start fly bird
                birdAnimFunc(trajectoryNum); 
            } window.localStorage.setItem("showBirdKey5", showBirdCount); 
            // console.log('showBirdIntvl');
        }
    } rafBirdAnimFunc();
} 

function birdAnimFunc() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0, kY = 0, kX = 1.1, topDir = 'down', wingRot = 0, wingDir = 'up', count = 0, x = 0;
    function rafBirdAnimFunc() {
        moveBirdIntrvl = requestAnimationFrame(rafBirdAnimFunc); 
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) { 
            while (dt >= step) {
                dt -= step; k += 1;
            } // Move Y
            if (topDir == 'up') {
                birdY -= kY * k; 
                if (birdY > 75 + x) kY += 0.03 * k;
                else {
                    kY -= 0.03;
                    if (birdY <= (0 + x)) {
                        birdY = (0 + x); topDir = 'down'; kY = 0;
                    }
                }
            } else if (topDir == 'down') {
                birdY += kY * k; 
                if (count == 2) kX -= 0.0075;
                else if (count == 3) {
                	if (kX < 1.1) {
                		kX += 0.0075;
                		if (kX > 2) kX = 1.1;
                	}
                }
                if (birdY < (75 + x)) kY += 0.03 * k;
                else {
                    kY -= 0.03;
                    if (birdY >= (150 + x)) {
                        birdY = 150 + x; kY = 0; count += 1;
                        if (count !== 3) topDir = 'up'; 
                        else if (count == 3) x = 150;
                    }
                }
            } // Move X
            if (count < 3) birdX += kX * k; 
            else birdX -= kX * k;
            // Отмена движения птицы
            if (birdX <= 0 && count > 3) {
                cancelAnimationFrame(moveBirdIntrvl); moveBirdIntrvl = false;
                birdX = 0; birdY = 0; 
                // Запуск счетчика появления птицы
                if (menuOpenNum < 0 && startWindow.style.display !== 'block') showBird(); 
            } // Смещение по x и y птицы
            bird[birdNum].style.transform = 'translate(' + birdX + 'px, ' + birdY + 'px)'; 
            // Wings move
            if (wingDir == 'up') { 
            	wingRot += 8 * k; 
            	if (wingRot >= 90) wingDir = 'down';
            } else if (wingDir == 'down') {
            	wingRot -= 8 * k; 
            	if (wingRot <= -20) wingDir = 'up';
            } birdWing[birdNum][0].style.transform = 'rotate(' + wingRot + 'deg)'; 
            birdWing[birdNum][1].style.transform = 'rotate(' + -wingRot + 'deg)';
            k = 0;
            //console.log('moveBirdIntrvl');
            // console.log('topDir ' + topDir);
        }
    } rafBirdAnimFunc();
}


// Обработчик нажатия на птицу *********************************************************************************************************    
birdsGroup.addEventListener(clickUpEvent, openRewardWind, false);

function openRewardWind() {
	// Show mes
	pauseEngine(); 
	if (rewardMesTimer) {
		clearTimeout(rewardMesTimer); rewardMesTimer = false; 
		rewardPics[rewardNum].style.display = 'none'; comlpGroupMes.style.display = 'none';
	} else slowShowMes(mesReward); 
    rewardGroupMes.style.display = 'block';
    // Исчезновение птиц
    cancelAnimationFrame(moveBirdIntrvl); moveBirdIntrvl = false;
    birdX = 0; birdY = 0; bird[birdNum].style.transform = 'translate(' + birdX + 'px, ' + birdY + 'px)'; 
    // Определение награды
    initRewardMes();
} 

// Event listeners in reward window *******************************************************
const btnsMesReward = document.getElementById('btns-mes-reward'),
watchTextBird = document.getElementById('watch-text-bird'), waitAdsBird = document.getElementById('wait-ads-bird');

btnsMesReward.addEventListener(clickDownEvent, clickFuncStart03, false); 
btnsMesReward.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnsMesReward.addEventListener(clickUpEvent, mesRewardBtnsFunc, false);

function mesRewardBtnsFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-notwatch':  
				slowHideMes(mesReward); rewardPics[rewardNum].style.display = 'none'; rewardGroupMes.style.display = 'none';
				continueEngine();
			break;
			case 'btn-watch': 
				// Показ видеорекламы
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
		if (event.target.style.opacity == '0.3') event.target.style.opacity = '0';
	}
}





// MESSANGES DATA #############################################################################################################################
// Tutorial mes *****************************************************************************************************
const mesTutorialMA = document.getElementById('mes-start'), 
btnsTutorialGroup = document.getElementById('btns-tutorial-group'), btnsTutorial = document.getElementById('btns-tutorial');
btnsTutorialGroup.style.WebkitTransform = 'translate(637.25px, 43.35px)'; // Start position 
const imgCloseTutorial = document.getElementById('img_exit_tutorial'), imgForwardTutorial = document.getElementById('img_forward_tutorial'),
mesTutorial = [document.getElementById('start_mes_1'),document.getElementById('start_mes_2'),document.getElementById('start_mes_3'),
    document.getElementById('start_mes_4'),document.getElementById('start_mes_5'),document.getElementById('start_mes_6'),
    document.getElementById('start_mes_7'),document.getElementById('start_mes_8'),document.getElementById('start_mes_9'),
    document.getElementById('start_mes_10')],
windCloseTutorial = document.getElementById('start_mes_close'), numTutorialElem = document.getElementById('num-start_mes');
windCloseTutorial.style.WebkitTransform = 'translateX(637.25px)';
let numTutorial = 0, // Номер показываемого сообщения
finishTutorialFlag; // Show tutorial flag
if (window.localStorage.getItem("finishTutorialKey5") !== null) finishTutorialFlag = +window.localStorage.getItem("finishTutorialKey5");  
else finishTutorialFlag = 0;
function upDownBtnsTutorial() {
	switch (numTutorial) {
		case 0: btnsTutorialGroup.style.WebkitTransform = 'translate(637.25px, 43.35px)'; break;
		case 1: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 0px)'; break;
		case 2: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 162.2px'; break;
		case 3: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 31.6px)'; break;
		case 4: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, -54.2px)'; break;
		case 5: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 43px)'; break;
		case 6: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 86.6px)'; break;
		case 7: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 8.8px)'; break;
		case 8: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 156.5px)'; break;
		case 9: btnsTutorialGroup.style.WebkitTransform = 'translate(0px, 199.6px)'; break;
	}
}
function closeTutorialFunc() {
	btnsTutorialGroup.style.display = 'none';
	mesTutorial[numTutorial].style.display = 'none'; 
	mesTutorialMA.style.display = 'none'; 
}
// Обработчики сообщений 
mesTutorialMA.addEventListener(clickDownEvent, clickFuncStart, false); mesTutorialMA.addEventListener(clickMoveEvent, clickFuncMove, false);
mesTutorialMA.addEventListener(clickUpEvent, mesTutorialFunc, false);

function mesTutorialFunc(event) {
    if (!moveFlag && !mesClickFlag) {
        switch (event.target.id) {
            // Пропуск обучения
            case 'btn-skip_tutorial': 
                btnsTutorialGroup.style.display = 'none'; mesTutorial[numTutorial].style.display = 'none'; 
                windCloseTutorial.style.display = 'block';
            break;
            // Окно подтверждения закрытия обучения
            case 'btn-start_mes_close': 
                finishTutorialFlag = 1; window.localStorage.setItem("finishTutorialKey5", finishTutorialFlag);
                slowHideMes(mesTutorialMA);
            break;
            case 'start_mes_not_close': 
                windCloseTutorial.style.display = 'none';
                mesTutorial[numTutorial].style.display = 'block'; btnsTutorialGroup.style.display = 'block';
            break;
            // Кнопки меню в окнах обучения
            case 'tutorial-btn-loc':
                mesTutorialMA.style.display = 'none';  
                openMenu(0);
            break;
            case 'tutorial-btn-char':
                mesTutorialMA.style.display = 'none';  
                openMenu(1);
            break;
            case 'tutorial-btn-shop':
                mesTutorialMA.style.display = 'none';  
                openMenu(2);
            break;
			case 'tutorial-btn-optoins':
                mesTutorialMA.style.display = 'none';  
                openMenu(3);
            break;
            // Переход между сообщений обучения
            case 'btn-forward_tutorial': 
                if (numTutorial < 9) {
					if (numTutorial == 0) windCloseTutorial.style.WebkitTransform = 'translateX(0px)';
                    mesTutorial[numTutorial].style.display = 'none';
                    numTutorial += 1; numTutorialElem.innerHTML = numTutorial + 1;
                    mesTutorial[numTutorial].style.display = 'block'; 					
                    if (numTutorial == 9) {
                        imgForwardTutorial.style.display = 'none'; 
                        imgCloseTutorial.style.display = 'block'; 
                    } upDownBtnsTutorial();
                } else {
                    btnsTutorialGroup.style.display = 'none'; mesTutorial[numTutorial].style.display = 'none'; 
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
					if (numTutorial == 0) windCloseTutorial.style.WebkitTransform = 'translateX(637.25px)';
                    numTutorialElem.innerHTML = numTutorial + 1;
                    mesTutorial[numTutorial].style.display = 'block';
                    upDownBtnsTutorial();
                } 
            break;
        }
    }
}
// Mes Reward for watch video and complete location*****************************************************
const mesReward = document.getElementById('mes-reward'), 
rewardGroupMes = document.getElementById('reward-group'), comlpGroupMes = document.getElementById('comlp-group'),
rewardMoney = document.getElementById('reward-money-num'),
rewardPics = [document.getElementById('stim-1-reward'), document.getElementById('stim-2-reward'), document.getElementById('stim-3-reward'), document.getElementById('stim-4-reward'), document.getElementById('stim-5-reward'), document.getElementById('stim-6-reward'), document.getElementById('stim-7-reward'), document.getElementById('stim-8-reward'), document.getElementById('stim-9-reward'), document.getElementById('reward-money')];
let rewardNum = null, moneyRewNum;
// Init reward
function initRewardMes() {
	let randomNum = Math.ceil(Math.random() * 100), str_stm_int = Math.floor(Math.random() * 3);
    if (randomNum <= Math.ceil(0 + lvlNum * 0.35)) rewardNum = 8;      // 0-1;  15-6;  30-11; 50-18; 
    else if (randomNum <= Math.ceil(4 + lvlNum * 0.35)) rewardNum = 7; // 0-5;  15-10; 30-15; 50-22;
    else if (randomNum <= Math.ceil(10 + lvlNum * 0.3)) rewardNum = 6; // 0-11; 15-15; 30-19; 50-25;
    else if (randomNum <= Math.ceil(20 + lvlNum * 0.2)) { // 0-21; 15-23; 30-26; 50-30; 
    	if (str_stm_int == 0) rewardNum = 3; 
    	else if (str_stm_int == 1) rewardNum = 4; 
    	else if (str_stm_int == 2) rewardNum = 5;
    } else if (randomNum <= 30) {
    	if (str_stm_int == 0) rewardNum = 0; 
    	else if (str_stm_int == 1) rewardNum = 1; 
    	else if (str_stm_int == 2) rewardNum = 2;
    } else {
        rewardNum = 9; 
        // Определение денежной награды
        moneyRewNum = Math.round(150 * Math.pow((1.4 - lvlNum * 0.002), lvlNum - 1)); 
    	rewardMoney.innerHTML = numFormat.format(moneyRewNum);
        // Cмещение денежной награды
        if (rewardMoney >= 100000) rewardPics[0].style.transform = 'translateX(-45px)';
        else if (rewardMoney >= 10000) rewardPics[0].style.transform = 'translateX(-30px)';
        else if (rewardMoney >= 1000) rewardPics[0].style.transform = 'translateX(-15px)';
        else rewardPics[0].style.transform = 'translateX(0x)';
    } // Show reward img
    rewardPics[rewardNum].style.display = 'block'; 
}
// Rate game ******************************************************************************************
const mesRate = document.getElementById('mes-rate'), btnsMesRate = document.getElementById('btns-mes-rate');
let countShowMesRate; 
if (window.localStorage.getItem("countShowMesRateKey5") !== null) countShowMesRate = +window.localStorage.getItem("countShowMesRateKey5"); 
else countShowMesRate = 0;
btnsMesRate.addEventListener(clickDownEvent, clickFuncStart03, false); 
btnsMesRate.addEventListener(clickMoveEvent, clickFuncMove03, false);
btnsMesRate.addEventListener(clickUpEvent, mesRateBtnsFunc, false);
function mesRateBtnsFunc(event) {
	if (!moveFlag) {
		switch (event.target.id) {
			case 'btn-rate-later':
				slowHideMes(mesRate); continueEngine();
				countShowMesRate = 0; window.localStorage.setItem("countShowMesRateKey5", countShowMesRate); 
			break;
			case 'btn-rate-yes':
				mesData.mesRateFlag = true; window.localStorage.setItem("mesDataKey5", JSON.stringify(mesData)); 
				slowHideMes(mesRate); continueEngine();
				// Go to Google Play
				window.location.replace("https://play.google.com/store/apps/details?id=com.barsukstudio.energyclicker");
			break;
		} // Отмена подсветки
		if (event.target.style.opacity == '0.3') event.target.style.opacity = '0';	
	}
}
// Stm drops ******************************************************************************************
const mesStmDrops = document.getElementById('mes-stm-drops'), closeMesStmDrops = document.getElementById('close-mes-stm-drops');
let mesStmDropsTimer;
closeMesStmDrops.addEventListener(clickDownEvent, clickFuncStart, false); 
closeMesStmDrops.addEventListener(clickMoveEvent, clickFuncMove, false);
closeMesStmDrops.addEventListener(clickUpEvent, closeMesStmDropsEnd, false);
function closeMesStmDropsEnd(event) {
	if (!moveFlag && !mesClickFlag) {
		clearTimeout(mesStmDropsTimer); 
		slowHideMes(mesStmDrops);
	}
}
// First repair or upgrade ****************************************************************************
const mesFirstRepairUpgr = document.getElementById('mes-first-repair-upgr'), closeMesFirstRepUpg = document.getElementById('close-mes-first-rep-upg');
let mesFirstRepairUpgrTimer;
closeMesFirstRepUpg.addEventListener(clickDownEvent, clickFuncStart, false); 
closeMesFirstRepUpg.addEventListener(clickMoveEvent, clickFuncMove, false);
closeMesFirstRepUpg.addEventListener(clickUpEvent, closeMesFirstRepUpgEnd, false);
function closeMesFirstRepUpgEnd(event) {
	if (!moveFlag && !mesClickFlag) {
		clearTimeout(mesFirstRepairUpgrTimer); 
		slowHideMes(mesFirstRepairUpgr);
	}
}
// Lvl up
const mesLvlUp = document.getElementById('mes_lvl_up'), lvlUpSpNum = document.getElementById('lvlup_sp_num'),
// Generator improved
mesGenerImproved = document.getElementById('mes-gener-improved'),
// Complete loc
// mesComplLoc = document.getElementById('mes-compl-loc'),
// Havnt int for repair or upgrade
mesHavntInt = document.getElementById('mes-havnt-int'), 
mesHavntIntAct = document.getElementById('mes-havnt_int-act'), mesHavntIntNum = document.getElementById('mes-havnt_int-num');

// Флаг невозможности клика по click-area при показе сообщений
let mesClickFlag = false,
// Mes object data
mesData;
if (window.localStorage.getItem("mesDataKey5") !== null) mesData = JSON.parse(window.localStorage.getItem("mesDataKey5")); 
else mesData = {
	mesStmFlag: false,
	firstRepUpgrFlag: false,
	mesLvlupFlag: false,
	mesRateFlag: false,
	complLoc: [false,false,false,false,false,false,false]
}





// COMMON FUNCTIONS ###############################################################################################################################
// Touch and swipe functions ***********************************************************************************
function clickFuncStart() {
    moveFlag = false;
}
function clickFuncMove() {
    if (isMobileFlag && !moveFlag) moveFlag = true;
}
// Touch and swipe functions 0.3 and 0 opacity btn **************************************************************
function clickFuncStart03(event) {
    moveFlag = false; 
    event.target.style.opacity = '0.3';
}
function clickFuncMove03(event) {
    if (isMobileFlag && !moveFlag) moveFlag = true;
    if (event.target.style.opacity !== '0') event.target.style.opacity = '0';
}
// Touch and swipe functions 0.6 and 0 opacity btn **************************************************************
function clickFuncStart06(event) {
    moveFlag = false; 
    event.target.style.opacity = '0.6';
}
function clickFuncMove06(event) {
    if (isMobileFlag && !moveFlag) moveFlag = true;
    if (event.target.style.opacity !== '0.3') event.target.style.opacity = '0.3';
}


// Функция плавного появления и исчезновения сообщений *********************************************************
let showMesIntrvl, hideMesIntrvl;
function slowShowMes(mes) {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, opacNum = 0, k = 0; 
    // Остановка интервала появления птицы и интервалов зелий
    if (menuOpenNum == -1) {
        // Stop showBird()
		if (showBirdIntvl) {
			cancelAnimationFrame(showBirdIntvl); showBirdIntvl = false;
		} // Stop downTimerStim()
        if (useStimNum > -1 && downTimerStimIntrvl) {
            cancelAnimationFrame(downTimerStimIntrvl); downTimerStimIntrvl = false;
        } 
    } // Открытие сообщения
    mes.style.opacity = opacNum + ''; 
    mes.style.display = 'block'; 
    mesClickFlag = true;     
    function rafSlowShowMes() {
        showMesIntrvl = requestAnimationFrame(rafSlowShowMes); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step;	k += 1;
	        } opacNum += 0.04 * k; 
	        if (opacNum >= 1) {
	            opacNum = 1; 
	            cancelAnimationFrame(showMesIntrvl);
	            if (mes == mesStmDrops || mes == mesStmDrops) {
	            	setTimeout(function() {
		            	mesClickFlag = false;
		            }, 500);
	            } else mesClickFlag = false;
	        } mes.style.opacity = opacNum;
	        k = 0;
	    }
    } rafSlowShowMes(); 
}
function slowHideMes(mes) {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, opacNum = 1, k = 0;    
    mesClickFlag = true;       
    function rafSlowShowMes() {
        hideMesIntrvl = requestAnimationFrame(rafSlowShowMes); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step;	k += 1;	
	        } opacNum -= 0.04 * k; 
	        if (opacNum <= 0) {
	        	cancelAnimationFrame(hideMesIntrvl); 
	            //if (mes == mesLvlup) exitMes.style.opacity = '0.5';
	            mes.style.display = 'none';
	            opacNum = 1; mesClickFlag = false;
	            // Запуск интервала появления птицы и интервалов зелий
	            if (menuOpenNum == -1) {
					if (moveBirdIntrvl == false && showBirdIntvl == false) showBird();         
	                if (useStimNum > -1 && !downTimerStimIntrvl) downTimerStim(); 
	            }
	        } mes.style.opacity = opacNum;
	        k = 0;
	    }
    } rafSlowShowMes();
}


// Pause engine ***********************************************************************************************
function pauseEngine() {
	// Stop char move
	if (actName == 'work' && workGeneratorIntrvl) {
		cancelAnimationFrame(workGeneratorIntrvl); workGeneratorIntrvl = false;
	} else if (actName !== 'work' && repairGeneratorIntrvl) {
		cancelAnimationFrame(repairGeneratorIntrvl); repairGeneratorIntrvl = false;
	} // Stop changeDataIntrvl, autoScroolIntrvl
	if (changeDataIntrvl) {
		cancelAnimationFrame(changeDataIntrvl); changeDataIntrvl = false;
	} if (autoScroolIntrvl) {
		cancelAnimationFrame(autoScroolIntrvl); autoScroolIntrvl = false;
	} // Stop showBird()
	if (showBirdIntvl) {
		cancelAnimationFrame(showBirdIntvl); showBirdIntvl = false;
	} // Stop downTimerStim()
	if (useStimNum > -1 && downTimerStimIntrvl) {
		cancelAnimationFrame(downTimerStimIntrvl); downTimerStimIntrvl = false;
	}
} 
// Continue engine ***********************************************************************************************
function continueEngine() {
	// Continue char move
	if (actName == 'work' && rotateNum > 0) workGenerator();
	else if (actName !== 'work') { // && repairUpgrNum > 0
		posRepair = 3; repairUpgradeGenerator();
	} // Continue changeDataIntrvl, autoScroolIntrvl
	if (!changeDataIntrvl) changeData();
	if (!autoScroolIntrvl && cityX !== 0) autoScrool();
	// Start showBird()
	if (!moveBirdIntrvl && !showBirdIntvl) showBird(); 
	// Start downTimerStim()
	if (useStimNum > -1 && !downTimerStimIntrvl) downTimerStim();
} 
// Stop engine when change loc *************************************************************************************
function stopEngine() {
	// Stop char move
	if (actName == 'work' && rotateNum > 0) { 
		moveDirFlag = 'down'; autoBackFlag = false; rotateNum = 0; 
	} else if (actName !== 'work' && repairUpgrNum > 0) { 
		posRepair = 0; repairUpgrNum = 0; 
		if (actName == 'repair') repairQuant.innerHTML = numFormat.format(Math.round(generHpNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum]));
		else if (actName == 'upgrade') upgradeQuant.innerHTML = numFormat.format(Math.round(generUpgradeNum[generNum])) + ' / ' + numFormat.format(Math.round(generHpMaxNum[generNum] * 4));
	} // Setting start pos 
	charStartPos();
	if (showInfoCount > 0) {
		showInfoCount = 0;
	} cityX = 0; cityMA.style.transform = 'translateX(' + cityX + 'px)'; // cityMA.style.left = cityX +'px';
	// Turning off the lights in all the lit windows
	for (let i = 0; i < windowNum; i++) {
		windows[locNum][i].style.fill = '#4F4748';
	} windowNum = 0;
}


// Потрясывание денег или статус поинтов **********************************************************************
let shakeElemIntrvl = false;
function shakeElem(group, elem, color) {
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0,
	posFlag = 1, moveX = 0, count = 0;
	if (soundData.soundFlag == 'on') failSound.play(); 
	elem.style.fill = '#FF0000';
	if (shakeElemIntrvl) cancelAnimationFrame(shakeElemIntrvl);
    function rafShakeElem() {
        shakeElemIntrvl = requestAnimationFrame(rafShakeElem); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step; k += 1;
	        } // Смещение элемента вправо 
	        if (posFlag == 1) {
				moveX += 2 * k;
				if (moveX >= 6) {
					moveX = 6; posFlag = 2;
				} 
			} // Смещение элемента влево 
			else if (posFlag == 2) {
				moveX -= 2 * k;
				if (moveX <= -6) {
					moveX = -6; posFlag = 1; count += 1;
				} // Stop shaking
				if (count >= 4) {
					cancelAnimationFrame(shakeElemIntrvl); shakeElemIntrvl = false;
					moveX = 0; elem.style.fill = color;
				}
			} group.style.transform = 'translateX(' + moveX + 'px)';
			k = 0;
		}
	} rafShakeElem();
} 
// Мигание копок ***********************************************************************************************
let flashElemIntrvl = false;
function flashElem(elem) {
	let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0,
	posFlag = 1, opacNum = 0, count = 0;
	//if (soundData.soundFlag == 'on') failSound.play(); 
	elem.style.opacity = opacNum + '';
	if (flashElemIntrvl) cancelAnimationFrame(flashElemIntrvl);
    function rafFlashElem() {
        flashElemIntrvl = requestAnimationFrame(rafFlashElem); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) {
        	while (dt >= step) {
	        	dt -= step; k += 1;
	        } 
	        if (posFlag == 1) {
				opacNum += 0.025 * k;
				if (opacNum >= 0.3) {
					opacNum = 0.3; posFlag = 2;
				} 
			} else if (posFlag == 2) {
				opacNum -= 0.025 * k;
				if (opacNum <= 0) {
					opacNum = 0; posFlag = 1; count += 1;
					// Stop shaking
					if (count >= 2) {
						cancelAnimationFrame(flashElemIntrvl); flashElemIntrvl = false; opacNum = 0;
					}
				} 
			} elem.style.opacity = opacNum + ''; 
			k = 0;
		}
	} rafFlashElem();
}


// Отцентровка значений ***********************************************************************************************
function centerPos(n, group) { 
	if (n >= 100000000) group.style.transform = 'translateX(-90px)';
	else if (n >= 10000000) group.style.transform = 'translateX(-87.5px)';
	else if (n >= 1000000) group.style.transform = 'translateX(-75px)';
	else if (n >= 100000) group.style.transform = 'translateX(-62.5px)';
	else if (n >= 10000) group.style.transform = 'translateX(-50px)';
	else if (n >= 1000) group.style.transform = 'translateX(-37.5px)';
	else if (n >= 100) group.style.transform = 'translateX(-25px)';
	else if (n >= 10) group.style.transform = 'translateX(-12.5px)';
	else group.style.transform = 'translateX(0px)';
	//console.log('generEnergyInfoGroup.style.transform ' + generEnergyInfoGroup.style.transform);
}

