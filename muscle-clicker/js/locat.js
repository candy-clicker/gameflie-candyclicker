"use strict";

// Main data **********************************************************************************************************************************
let rotateElems, rotateElemsEnd, backElems, upLvl, stopEng,
// Получение экспы и денег единожды до полного опуска рук 
exp2Flag = false, exp3Flag = false,
// Поворот рук 
rotateFirstElem = 0, rotateElem = 0, rotateFoot = 0,
clickBackFlag = false, // Флаг опуска рук после достижения конечной точки подьема
startBackFlag = false, // Флаг возможности запуска функции backElems()
// Опуск рук
backRotateNumber = null, backInterval = null,

// Comp loc data *****************************************************************************************************************************
// restPower, // Сила от отдыха на локациях соревнований
upDownNum, // Проценты опуска и подьема МО чара
compCount, // Счетчик количества подтягиваний
stmMinus, // Начальная трата выносливости
compMoneyNum, // Деньги за соревнование
compNameWord; // Название соревнования
const compNameMain = document.getElementById('comp-name-main'), // Название соревнования в главном окне 
mainElemComp = document.getElementById('main-elements-comp'), compTimer = document.getElementById('comp-timer'), // Таймер
compQuant = document.getElementById('comp-quant'),  
pullupRecord = document.getElementById('pullup-record'), squatRecord = document.getElementById('squat-record');
// pullupRecordNum
let pullupRecordNum;
if (window.localStorage.getItem("pullupRecordKey1") !== null) pullupRecordNum = +window.localStorage.getItem("pullupRecordKey1"); 
else pullupRecordNum = 0; 
pullupRecord.innerHTML = pullupRecordNum;
// squatRecordNum
let squatRecordNum;
if (window.localStorage.getItem("squatRecordKey1") !== null) squatRecordNum = +window.localStorage.getItem("squatRecordKey1"); 
else squatRecordNum = 0; 
squatRecord.innerHTML = squatRecordNum;
// compTimerNum
let compTimerNum; // Счетчик таймера соревнований
if (window.localStorage.getItem("compTimerNumKey1") !== null) compTimerNum = +window.localStorage.getItem("compTimerNumKey1"); 
else compTimerNum = 0; 



// DUMB LOCATION ##############################################################################################################################
// Левые гантели ***********************************************************************************************************************
const left_dumbbells = [document.getElementById('left-dumb1'),document.getElementById('left-dumb2'),
    document.getElementById('left-dumb3'),document.getElementById('left-dumb4'),document.getElementById('left-dumb5'),
    document.getElementById('left-dumb6'),document.getElementById('left-dumb7'),document.getElementById('left-dumb8'),
    document.getElementById('left-dumb9'),document.getElementById('left-dumb10'),document.getElementById('left-dumb11'),
    document.getElementById('left-dumb12'),document.getElementById('left-dumb13'),document.getElementById('left-dumb14'),
    document.getElementById('left-dumb15'),document.getElementById('left-dumb16'),document.getElementById('left-dumb17'),
    document.getElementById('left-dumb18'),document.getElementById('left-dumb19'),document.getElementById('left-dumb20'),
    document.getElementById('left-dumb21'),document.getElementById('left-dumb22'),document.getElementById('left-dumb23'),
    document.getElementById('left-dumb24')],
// Левые пальцы и группа гантелей
left_fingers = document.getElementById('left-fingers'), all_left_dumbbells = document.getElementById('left-dumbbells'),
// Правые гантели 
right_dumbbells = [document.getElementById('right-dumb1'),document.getElementById('right-dumb2'),
    document.getElementById('right-dumb3'),document.getElementById('right-dumb4'),document.getElementById('right-dumb5'),
    document.getElementById('right-dumb6'),document.getElementById('right-dumb7'),document.getElementById('right-dumb8'),
    document.getElementById('right-dumb9'),document.getElementById('right-dumb10'),document.getElementById('right-dumb11'),
    document.getElementById('right-dumb12'),document.getElementById('right-dumb13'),document.getElementById('right-dumb14'),
    document.getElementById('right-dumb15'),document.getElementById('right-dumb16'),document.getElementById('right-dumb17'),
    document.getElementById('right-dumb18'),document.getElementById('right-dumb19'),document.getElementById('right-dumb20'),
    document.getElementById('right-dumb21'),document.getElementById('right-dumb22'),document.getElementById('right-dumb23'),
    document.getElementById('right-dumb24')],
// Правые пальцы и группа гантелей
right_fingers = document.getElementById('right-fingers'), all_right_dumbbells = document.getElementById('right-dumbbells');

// Появление гантелей у чара 
left_dumbbells[bodyData.dumbFlag].style.display = 'block'; 
right_dumbbells[bodyData.dumbFlag].style.display = 'block';

// Меню инвентаря ***************************************************************
dumbsInvent.addEventListener(clickUpEvent, dumbsInventFunc);

function dumbsInventFunc(event) {
    if (!moveFlag && openWindow <= 1) {
        switch (event.target.id) {
            case 'btn-dumb1-invent': dumbChoiceCase(0,         1,  1,  10,     1); break;//         1   1,   1   10   10   1      1    1 
            case 'btn-dumb2-invent': dumbChoiceCase(1,       2.5,  2,  18,  1.29); break;//       2.3  1.5   2   20   20   2   1.43  1.5 
            case 'btn-dumb3-invent': dumbChoiceCase(2,       6.2,  4,  32,  1.71); break;//       5.2  2.5   4   38   40   4   2.03  2.1 
            case 'btn-dumb4-invent': dumbChoiceCase(3,      15.3,  7,  54,  2.45); break;//      13.1   4,   7   63   70   7   2.86  2.8 
            case 'btn-dumb5-invent': dumbChoiceCase(4,      37.7, 11,  82,  3.32); break;//      31.2   6,  11   99  110  11   4.01  3.6 
            case 'btn-dumb6-invent': dumbChoiceCase(5,      91.9, 16, 116,  4.49); break;//        74  8.5  16  144  160  16   5.57  4.5 
            case 'btn-dumb7-invent': dumbChoiceCase(6,       222, 22, 156,  6.06); break;//       175 11.5  22  198  220  22   7.69  5.5 
            case 'btn-dumb8-invent': dumbChoiceCase(7,       537, 29, 202,  8.15); break;//       416  15,  29  261  290  29  10.53  6.6 
            case 'btn-dumb9-invent': dumbChoiceCase(8,      1287, 37, 254, 10.93); break;//       982  19,  37  333  370  37  14.33  7.8 
            case 'btn-dumb10-invent':dumbChoiceCase(9,      3062, 46, 312, 14.57); break;//      2308 23.5  46  414  460  46  19.34  9.1 
            case 'btn-dumb11-invent':dumbChoiceCase(10,     7242, 56, 376, 19.34); break;//      5403 28.5  56  504  560  56  25.92 10.5
            case 'btn-dumb12-invent':dumbChoiceCase(11,    17018, 67, 446, 25.50); break;//     12587 33.5  67  603  660  68  34.47   12 
            case 'btn-dumb13-invent':dumbChoiceCase(12,    39738, 79, 522, 33.83); break;//     29549 38.5  79  702  760  82  45.50 13.6 
            case 'btn-dumb14-invent':dumbChoiceCase(13,    92191, 92, 604, 44.44); break;//     68745 43.5  92  810  860  98  59.60 15.3 
            case 'btn-dumb15-invent':dumbChoiceCase(14,   212501,106, 692, 57.84); break;//    212501 48.5 106  927  960 116  77.48 17.1 
            case 'btn-dumb16-invent':dumbChoiceCase(15,   486627,121, 786, 74.61); break;//    354919 53.5 121 1053 1060 136  99.95   19 
            case 'btn-dumb17-invent':dumbChoiceCase(16,  1107076,137, 886, 95.42); break;//    825648 58.5 137 1188 1160 158 127.94   21 
            case 'btn-dumb18-invent':dumbChoiceCase(17,  2501993,154, 992,121.01); break;//   1863346 63.5 154 1332 1260 182 162.48 23.1 
            case 'btn-dumb19-invent':dumbChoiceCase(18,  5616974,172,1104,152.20); break;//   4175851 69.5 172 1485 1380 208 204.73 25.3 
            case 'btn-dumb20-invent':dumbChoiceCase(19, 12525852,191,1222,189.87); break;//   9293619 75.5 191 1647 1500 236 255.91 27.6 
            case 'btn-dumb21-invent':dumbChoiceCase(20, 27744762,211,1346,234.94); break;//  20541502 81.5 211 1818 1620 267 317.33   30 
            case 'btn-dumb22-invent':dumbChoiceCase(21, 61038476,232,1476,288.31); break;//  45091487 87.5 232 1998 1740 301 390.31 32.5 
            case 'btn-dumb23-invent':dumbChoiceCase(22,133369072,254,1612,350.98); break;//  98304044 93.5 254 2187 1860 338 476.18 35.1 
            case 'btn-dumb24-invent':dumbChoiceCase(23,289410886,277,1754,423.74); break;// 212841381 99.5 277 2385 1980 378 576.18 37.8 
        } 
    } 
}
// Функция выбора гантели в инвентаре
function dumbChoiceCase(dumbNum, dumbExp, dumbMoney, dumbWeight, stmMinus) {
    if (sound == 'on') buttonSound.play(); 
    // Hide old and show new dumbbells
    left_dumbbells[bodyData.dumbFlag].style.display = 'none'; right_dumbbells[bodyData.dumbFlag].style.display = 'none';
    bodyData.dumbFlag = dumbNum;
    left_dumbbells[bodyData.dumbFlag].style.display = 'block'; right_dumbbells[bodyData.dumbFlag].style.display = 'block';
    bodyData.dumbExp = dumbExp; bodyData.dumbMoney = dumbMoney; bodyData.dumbWeight = dumbWeight; bodyData.stmMinus = stmMinus;
    // Закрытие инвентаря
    closeMenu(1); 
}

// Обработчики клика  ********************************************************************************************************************
// Функции клика
function rotateElems_0() { 
    if (!clickFlag && !clickBackFlag) {
        clickFlag = true; changeMouth('block', 2.5);
        // Сила рук 
        rotateNumber = bodyData.armPower + strBodyK - bodyData.dumbWeight;  
        if (rotateNumber < 10) rotateNumber = 10;
        // Уменьшение силы при стамине меньше 20%
        if (charData.stmProgressNum <= charData.stmMaxProgressNum * 0.2) { 
            rotateNumHalf = true; rotateNumber *= 0.5;
            if (!mesData.mesStaminaFlag && messenges.style.display !== 'block' && menuOpenNum == null) {
                slowShowMes(mesStamina); mesData.mesStaminaFlag = true; 
                window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
            }
        } // position arms 3    
        if (rotateElem > 70) { 
            rotateFirstElem -= rotateNumber * 0.81; rotateElem += rotateNumber * 0.81;
            if (rotateElem >= 150) { // Полный подьем
                clickBackFlag = true;
                rotateFirstElem = 10; rotateElem = 150;
                // Exp and Money
                bodyData.bodyExpNum += bodyData.dumbExp * 2; charData.moneyNum += bodyData.dumbMoney * 2; 
                expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%'; //expProgress.value = bodyData.bodyExpNum;
                moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                // LS
                window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
            } 
        } // position arms 2 
        else if (rotateFirstElem >= 90) { 
            rotateElem += rotateNumber * 0.9;
            // Переход на позицию 3
            if (rotateElem > 70) { 
                rotateFirstElem = 90 - (rotateElem - 70) * 0.9; 
                rotateElem = (rotateElem - 70) * 0.9 + 70;
                if (!exp3Flag) { // Exp and Money
                    exp3Flag = true;
                    bodyData.bodyExpNum += bodyData.dumbExp; charData.moneyNum += bodyData.dumbMoney; 
                    expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';//expProgress.value = bodyData.bodyExpNum;
                    moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
                    //LS
                    window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                    window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
                } // Полный подьем
                if (rotateElem >= 150) { 
                    clickBackFlag = true;
                    rotateFirstElem = 10;        
                    rotateElem = 150;
                    // Exp and Money
                    bodyData.bodyExpNum += bodyData.dumbExp * 2; charData.moneyNum += bodyData.dumbMoney * 2; 
                    expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';//expProgress.value = bodyData.bodyExpNum;
                    moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                    // LS
                    window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                    window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
                }
            }
        } // position arms 1
        else if (rotateFirstElem <= 90) { 
            rotateFirstElem += rotateNumber;
            // Переход на позицию 2
            if (rotateFirstElem > 90) { 
                rotateElem = (rotateFirstElem - 90) * 0.9;
                rotateFirstElem = 90;
                if (!exp2Flag) { // Exp and Money
                    exp2Flag = true;
                    bodyData.bodyExpNum += bodyData.dumbExp; charData.moneyNum += bodyData.dumbMoney;
                    expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';//expProgress.value = bodyData.bodyExpNum; 
                    moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                    // LS
                    window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                    window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
                } // Переход на позицию 3
                if (rotateElem > 70) { 
                    rotateFirstElem = 90 - (rotateElem - 70) * 0.9;       
                    rotateElem = (rotateElem - 70) * 0.9 + 70;
                    if (!exp3Flag) { // Exp and Money
                        exp3Flag = true;
                        bodyData.bodyExpNum += bodyData.dumbExp; charData.moneyNum += bodyData.dumbMoney;
                        expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';//expProgress.value = bodyData.bodyExpNum; 
                        moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                        // LS
                        window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                        window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
                    } // Полный подьем
                    if (rotateElem >= 150) { 
                        clickBackFlag = true;
                        rotateFirstElem = 10; rotateElem = 150;
                        // Exp and Money
                        bodyData.bodyExpNum += bodyData.dumbExp * 2; charData.moneyNum += bodyData.dumbMoney * 2; 
                        expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';//expProgress.value = bodyData.bodyExpNum; 
                        moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                        // LS
                        window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                        window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
                    }
                }   
            }
        } // Set new transform elements rotate 
        right_arm.style.transform = 'rotate(' + (-rotateElem) + 'deg)';
        left_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
        first_right_arm.style.transform = 'rotate(' + (-rotateFirstElem) + 'deg)';
        first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
        // Отнимание стамины
        charData.stmProgressNum -= bodyData.stmMinus;
        if (charData.stmProgressNum < charData.stmMaxProgressNum && !startRecStamFlag) {startRecStamFlag = true; recoveryStamina();} 
        if (charData.stmProgressNum <= 0) charData.stmProgressNum = 0;
        // staminaProgress.value = charData.stmProgressNum;
        // Увеличение уровня 
        if (bodyData.bodyExpNum >= bodyData.bodyMaxExpNum && bodyData.bodyLvlNum <= 60) {
            // Show mes Level Up
            if (!mesData.mesLvlupFlag && messenges.style.display !== 'block' && menuOpenNum == null) {
                slowShowMes(mesLvlup); mesData.mesLvlupFlag = true; 
                window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
            } else {
                slowShowMes(mesLvlup2);
                timerLvlUp2Mes = setTimeout(function() {slowHideMes(mesLvlup2); }, 2000);
            } // Увеличение уровня
            upLvl(); 
        } // Достижение 80 денег
        if (!mesData.mesFirstbuyFlag && charData.moneyNum >= 80 && messenges.style.display !== 'block' && menuOpenNum == null) {
            slowShowMes(mesFirstbuy); mesData.mesFirstbuyFlag = true; 
            window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
        } // Запуск функции возврата элементов рук
        if (!startBackFlag) {startBackFlag = true; backElems();} 
    } 
}
function stopEng_0() {
    clickFlag = false;  clickBackFlag = false; rotateNumber = 0; 
    changeMouth('none', 0);
    // Stop backElems()
    if (startBackFlag) {
        startBackFlag = false; cancelAnimationFrame(backInterval);
    } // Set new transform elements rotate 
    rotateElem = 0; rotateFirstElem = 0;
    right_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
    left_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
    first_right_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
}

// Отпуск касания
function rotateElemsEnd_0() {
    clickFlag = false;
}
    
// Функция опускания рук
function backElems_0() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;         
    function rafBackElems() {
        backInterval = requestAnimationFrame(rafBackElems); 
        now = performance.now(); dt += (now - last); last = now; 
        if (dt >= step) { 
            while (dt >= step) {
                dt -= step; k += 1;        
            } if (!clickBackFlag) backRotateNumber = 2 * k;
            else if (clickBackFlag) backRotateNumber = 8 * k;
            // position arms 3
            if (rotateElem > 70) {
                rotateElem -= backRotateNumber; rotateFirstElem += backRotateNumber;
                // Переход на позицию 2
                if (rotateElem <= 70) rotateFirstElem = 90;
            } // position arms 2
            else if (rotateElem > 0) {
                rotateElem -= backRotateNumber;
                // Переход на позицию 1
                if (rotateElem <= 0) rotateElem = 0;
            } // position arms 1
            else if (rotateFirstElem <= 90) {
                rotateFirstElem -= backRotateNumber;
                // Полный опуск рук
                if (rotateFirstElem <= 0) { 
                    rotateFirstElem = 0;
                    clickBackFlag = false; startBackFlag = false; exp2Flag = false; exp3Flag = false;
                    cancelAnimationFrame(backInterval); changeMouth('none', 0); 
                } 
            } // Set new transform elements rotate 
            right_arm.style.transform = 'rotate(' + (-rotateElem) + 'deg)';
            left_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
            first_right_arm.style.transform = 'rotate(' + (-rotateFirstElem) + 'deg)';
            first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
            k = 0;
        }
    } rafBackElems(); 
}


// Функция увеличения уровня 
function upLvl_0() {
    if (sound == 'on') lvlupSound.play();
    let numX;
    // Исчезновение элементов ******************************************************************
    bodyShowHideElem('none');
    // Увеличение Lvl **************************************************************************
    bodyData.bodyLvlNum += 1; 
    lvlMain.innerHTML = bodyData.bodyLvlNum; bodyLvl.innerHTML = bodyData.bodyLvlNum;
    // Появление элементов *********************************************************************
    // Номер рук
    if (bodyData.bodyLvlNum <= 30) numArms = bodyData.bodyLvlNum - 1;
    else numArms = 29;
    // Номер тел
    if (bodyData.bodyLvlNum < 3) numBody = 0;
    else if (bodyData.bodyLvlNum <= 30) numBody = bodyData.bodyLvlNum - 2;
    else numBody = 28;
    bodyShowHideElem('block');
    // Смещение точек transform-origin **********************************************************
    if (bodyData.bodyLvlNum <= 30) {
        if (bodyData.bodyLvlNum < 6) numX = 0;
        else if (bodyData.bodyLvlNum < 8) numX = 1.5;
        else if (bodyData.bodyLvlNum < 13) numX = 2;
        else numX = 3;
        bodyData.transX += numX; 
        // Точки transform-origin рук
        left_arm.style.transformOrigin = 318.6 - bodyData.transX + 'px 631.3px';
        first_left_arm.style.transformOrigin = 307.7 - bodyData.transX + 'px 716.1px';
        right_arm.style.transformOrigin = 401.5 + bodyData.transX + 'px 631.3px';
        first_right_arm.style.transformOrigin = 412.5 + bodyData.transX + 'px 716.1px';
        // Смещение пальцев и гантелей
        left_fingers.style.transform = 'translate(' + -bodyData.transX + 'px)';
        right_fingers.style.transform = 'translate(' + bodyData.transX + 'px)';
        all_left_dumbbells.style.transform = 'translate(' + -bodyData.transX + 'px)';
        all_right_dumbbells.style.transform = 'translate(' + bodyData.transX + 'px)';
    } // Exp *************************************************************************************
    bodyData.bodyExpNum = bodyData.bodyExpNum - bodyData.bodyMaxExpNum;
    expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';//expProgress.value = bodyData.bodyExpNum; 
    // Max exp
    bodyData.bodyMaxExpNum *= bodyData.minusCoefExp; 
    // bodyData.minusCoefExp -= (0.035 - bodyData.bodyLvlNum * 0.0009);
    bodyData.minusCoefExp -= (0.03 - bodyData.bodyLvlNum * 0.001);
    // expProgress.max = bodyData.bodyMaxExpNum;
    // Status points ****************************************************************************
    if (bodyData.bodyLvlNum % 3 == 0) charData.addSpDumbNum += 1;
    charData.spNum += charData.addSpDumbNum; statusPoints.innerHTML = charData.spNum;
    // Arm power ********************************************************************************
    bodyData.armPower += (4 + (bodyData.bodyLvlNum - 2) * 0.4);
    // Str coef
    if (timerData.useStimNum !== null) {
        if (timerData.useStimNum == 2) strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 2.5; 
        else if (timerData.useStimNum == 3) strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 5; 
        else if (timerData.useStimNum == 4) strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 5; 
        else if (timerData.useStimNum == 5) strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 7.5; 
        else if (timerData.useStimNum == 6) strBodyK = (4 + (bodyData.bodyLvlNum - 2) * 0.4) * 10; 
    } // Stamina ********************************************************************************
    cancelAnimationFrame(intervalRecStam); startRecStamFlag = false; rotateNumHalf = false; 
    charData.stmMaxProgressNum += 1 * (1 + bodyData.bodyLvlNum * bodyData.bodyLvlNum * 0.01); //2; 
    charData.recStmNum += 0.00125 * (1 + bodyData.bodyLvlNum * bodyData.bodyLvlNum * 0.01); //0.0025;
    charData.stmProgressNum = charData.stmMaxProgressNum; //staminaProgress.max = charData.stmMaxProgressNum; 
    staminaProgress.style.width = charData.stmProgressNum * 67 / charData.stmMaxProgressNum + '%';//staminaProgress.value = charData.stmProgressNum; 
    // Увеличение стоимости stim and video reward ***********************************************
    if (bodyData.bodyLvlNum > legsData.legsLvlNum) {
        // Add stim price
        // priceStimNum = priceStimNum.map(function(num) {return Math.round(num * (1.18 - bodyData.bodyLvlNum * 0.0016));});
        priceStimNum = priceStimConst.map(function(num) {
            return Math.round(num * Math.pow((1.23 - bodyData.bodyLvlNum * 0.0013), bodyData.bodyLvlNum - 1));
        });
        for (let i = 0; i < priceStimElem.length; i++) priceStimElem[i].innerHTML = priceStimNum[i];
    } // LS
    window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
    window.localStorage.setItem("bodyDataKey1", JSON.stringify(bodyData));
}





// BIKE LOCATION ##############################################################################################################################
// Велотренажеры *************************************************************************************************************************
const front_bike = [document.getElementById('front-bike1'),document.getElementById('front-bike2'),document.getElementById('front-bike3'),
    document.getElementById('front-bike4'),document.getElementById('front-bike5'),document.getElementById('front-bike6'),
    document.getElementById('front-bike7'),document.getElementById('front-bike8')],
back_bike = [document.getElementById('back-bike1'),document.getElementById('back-bike2'),document.getElementById('back-bike3'),
    document.getElementById('back-bike4'),document.getElementById('back-bike5'),document.getElementById('back-bike6'),
    document.getElementById('back-bike7'),document.getElementById('back-bike8')],
// Педали
left_pedals = document.getElementById('left-pedals'), 
left_pedal = [document.getElementById('left-pedal1'),document.getElementById('left-pedal2'),document.getElementById('left-pedal3'),
    document.getElementById('left-pedal4'),document.getElementById('left-pedal5'),document.getElementById('left-pedal6'),
    document.getElementById('left-pedal7'),document.getElementById('left-pedal8')], 
right_pedals = document.getElementById('right-pedals'), 
right_pedal = [document.getElementById('right-pedal1'),document.getElementById('right-pedal2'),document.getElementById('right-pedal3'),
    document.getElementById('right-pedal4'),document.getElementById('right-pedal5'),document.getElementById('right-pedal6'),
    document.getElementById('right-pedal7'),document.getElementById('right-pedal8')], 
// Скорости велосипедов
bike_speeds = document.getElementById('bike-speeds'), number_speed = document.getElementById('number-speed'),
down_speed = document.getElementById('down-speed'), up_speed = document.getElementById('up-speed');

let transPedals = 0, 
downRotateFlag = false, // Флаг единственного уменьшения вращения
minusStamFlag = false, // Флаг разрешения уменьшения стамины
autoInterval = null, // Интервал автоматического кручения педалей
downInterval = null, // Интервал остановки педалей
plusMinusFlag = 'plus'; // Флаг плюс минус градусов вращения

// Появление велотренажеров под чаром
front_bike[legsData.bikeFlag].style.display = 'block'; back_bike[legsData.bikeFlag].style.display = 'block'; 
left_pedal[legsData.bikeFlag].style.display = 'block'; right_pedal[legsData.bikeFlag].style.display = 'block';
// Выбраная скорость велотренажера
number_speed.innerHTML = legsData.speedNumber;

// Меню инвентаря  ***************************************************************************************************************
bikesInvent.addEventListener(clickUpEvent, bikesInventFunc);

function bikesInventFunc(event) {
    if (!moveFlag && openWindow <= 1) {
        switch (event.target.id) {
            case 'btn-bike1-invent': bikeChoiceCase(0); break;
            case 'btn-bike2-invent': bikeChoiceCase(1); break;
            case 'btn-bike3-invent': bikeChoiceCase(2); break;
            case 'btn-bike4-invent': bikeChoiceCase(3); break;
            case 'btn-bike5-invent': bikeChoiceCase(4); break;
            case 'btn-bike6-invent': bikeChoiceCase(5); break;
            case 'btn-bike7-invent': bikeChoiceCase(6); break;
            case 'btn-bike8-invent': bikeChoiceCase(7); break;
        }
    }
}
// Функция выбора велотренажера в инвентаре
function bikeChoiceCase(bikeFlag) { 
    if (sound == 'on') buttonSound.play(); 
    front_bike[legsData.bikeFlag].style.display = 'none'; back_bike[legsData.bikeFlag].style.display = 'none';
    left_pedal[legsData.bikeFlag].style.display = 'none'; right_pedal[legsData.bikeFlag].style.display = 'none';
    legsData.bikeFlag = bikeFlag;
    front_bike[legsData.bikeFlag].style.display = 'block'; back_bike[legsData.bikeFlag].style.display = 'block';
    left_pedal[legsData.bikeFlag].style.display = 'block'; right_pedal[legsData.bikeFlag].style.display = 'block';
    // Установка первой скорости на велотренажере
    legsData.speedNumber = 1; number_speed.innerHTML = legsData.speedNumber;
    if (legsData.bikeFlag == 0) {
        legsData.bikeExp = 1; legsData.bikeMoney = 1; legsData.bikeSpeed = 1; legsData.stmMinus = 1;
    } else if (legsData.bikeFlag == 1) {
        legsData.bikeExp = 15.3; legsData.bikeMoney = 7; legsData.bikeSpeed = 3.2; legsData.stmMinus = 2.29;
    } else if (legsData.bikeFlag == 2) {
        legsData.bikeExp = 222; legsData.bikeMoney = 22; legsData.bikeSpeed = 8.3; legsData.stmMinus = 5.55;
    } else if (legsData.bikeFlag == 3) {
        legsData.bikeExp = 3062; legsData.bikeMoney = 46; legsData.bikeSpeed = 16.1; legsData.stmMinus = 13.25;
    } else if (legsData.bikeFlag == 4) {
        legsData.bikeExp = 39738; legsData.bikeMoney = 79; legsData.bikeSpeed = 26.6; legsData.stmMinus = 31.23;
    } else if (legsData.bikeFlag == 5) {
        legsData.bikeExp = 486627; legsData.bikeMoney = 121; legsData.bikeSpeed = 39.8; legsData.stmMinus = 69.48;
    } else if (legsData.bikeFlag == 6) {
        legsData.bikeExp = 5616974; legsData.bikeMoney = 172; legsData.bikeSpeed = 55.7; legsData.stmMinus = 146.67;
    } else if (legsData.bikeFlag == 7) {
        legsData.bikeExp = 61038476; legsData.bikeMoney = 232; legsData.bikeSpeed = 74.3; legsData.stmMinus = 282.93;
    } // Закрытие инвентаря
    closeMenu(1); 
}

// Переключение скоростей велотренажеров *************************************************************************************************
bike_speeds.addEventListener(clickDownEvent, changeSpeeds);

function changeSpeeds(event) {
    switch (event.target.id) {
        case 'btn-up-speed':
            if (legsData.bikeFlag == 0 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 1 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 2 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 3 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 4 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 5 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 6 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            else if (legsData.bikeFlag == 7 && legsData.speedNumber < 3) legsData.speedNumber += 1;
            clickFlag = false; if (!downRotateFlag) {downRotateFlag = true; downRotate();} // Остановка вращения педалей
        break;
        case 'btn-down-speed': 
            if (legsData.speedNumber > 1) legsData.speedNumber -= 1; 
            clickFlag = false; if (!downRotateFlag) {downRotateFlag = true; downRotate();} // Остановка вращения педалей
        break;
    }
    if (legsData.bikeFlag == 0) {
        if (legsData.speedNumber == 1)      speedChoiceCase(        1,  1,   1,     1); //      1   1,    1      1 
        else if (legsData.speedNumber == 2) speedChoiceCase(      2.5,  2, 1.4,  1.29); //    1.5  1.5  1.5   1.43
        else if (legsData.speedNumber == 3) speedChoiceCase(      6.2,  4, 2.1,  1.71); //    2.5  2.5  2.1   2.03
    } else if (legsData.bikeFlag == 1) {
        if (legsData.speedNumber == 1)      speedChoiceCase(     15.3,  7, 3.2,  2.29); //      4   4,  2.8   2.86
        else if (legsData.speedNumber == 2) speedChoiceCase(     37.7, 11, 4.6,  3.07); //      6  6,   3.6   4.01
        else if (legsData.speedNumber == 3) speedChoiceCase(     91.9, 16, 6.3,  4.13); //    8.5  8.5  4.5   5.57
    } else if (legsData.bikeFlag == 2) {
        if (legsData.speedNumber == 1)      speedChoiceCase(      222, 22, 8.3,  5.55); //   11.5 11.5  5.5   7.69
        else if (legsData.speedNumber == 2) speedChoiceCase(      537, 29,10.6,  7.44); //     15  15,  6.6  10.53
        else if (legsData.speedNumber == 3) speedChoiceCase(     1287, 37,13.2,  9.96); //     19  19,  7.8  14.33
    } else if (legsData.bikeFlag == 3) {
        if (legsData.speedNumber == 1)      speedChoiceCase(     3062, 46,16.1, 13.25); //   23.5 23.5  9.1  19.34
        else if (legsData.speedNumber == 2) speedChoiceCase(     7242, 56,19.3, 17.55); //   28.5 28.5 10.5  25.92
        else if (legsData.speedNumber == 3) speedChoiceCase(    17018, 67,22.8, 23.46); //   33.5 33.5   12  34.47
    } else if (legsData.bikeFlag == 4) {
        if (legsData.speedNumber == 1)      speedChoiceCase(    39738, 79,26.6, 31.23); //  38.75 38.5 13.6  45.50
        else if (legsData.speedNumber == 2) speedChoiceCase(    92191, 92,30.7, 41.35); //  44.25 43.5 15.3  59.60
        else if (legsData.speedNumber == 3) speedChoiceCase(   212501,106,35.1, 53.32); //     51 48.5 17.1  77.48
    } else if (legsData.bikeFlag == 5) {
        if (legsData.speedNumber == 1)      speedChoiceCase(   486627,121,39.8, 69.48); //  57.25 53.5   19  99.95
        else if (legsData.speedNumber == 2) speedChoiceCase(  1107076,137,44.8, 89.91); //  63.75 58.5   21 127.94
        else if (legsData.speedNumber == 3) speedChoiceCase(  2501993,154,50.1,115.46); //   70.5 63.5 23.1 162.48
    } else if (legsData.bikeFlag == 6) {
        if (legsData.speedNumber == 1)      speedChoiceCase(  5616974,172,55.7,146.67); //  77.75 69.5 25.3 204.73
        else if (legsData.speedNumber == 2) speedChoiceCase( 12525852,191,61.6,184.37); //   85.5 75.5 27.6 255.91
        else if (legsData.speedNumber == 3) speedChoiceCase( 27744762,211,67.8,229.49); //  93.75 81.5   30 317.33
    } else if (legsData.bikeFlag == 7) {
        if (legsData.speedNumber == 1)      speedChoiceCase( 61038476,232,74.3,282.93); //  102.5 87.5 32.5 390.31
        else if (legsData.speedNumber == 2) speedChoiceCase(133369072,254,81.1,345.58); // 111.75 93.5 35.1 476.18
        else if (legsData.speedNumber == 3) speedChoiceCase(289410886,277,88.2,418.26); //  121.5 99.5 37.8 576.18
    } // LS
    window.localStorage.setItem("legsDataKey1", JSON.stringify(legsData));
}
// Функция выбора скорости на велотренажере
function speedChoiceCase(bikeExp, bikeMoney, bikeSpeed, staminaMinus) {
    legsData.bikeExp = bikeExp; legsData.bikeMoney = bikeMoney; legsData.bikeSpeed = bikeSpeed; legsData.stmMinus = staminaMinus;
    number_speed.innerHTML = legsData.speedNumber;
    if (rotateNumber < 0) {rotateNumber *= -1; plusMinusFlag = 'plus';}
    rotateElem = 0; rotateFirstElem = 0; transPedals = 0;
    left_legs.style.transform = 'rotate(' + rotateElem + 'deg)'; 
    first_left_legs.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    left_pedals.style.transform = 'translateY(' + transPedals + 'px)';
    right_legs.style.transform = 'rotate(' + rotateElem + 'deg)'; 
    first_right_legs.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    right_pedals.style.transform = 'translateY(' + transPedals + 'px)';
}

// Обработчики клика  *********************************************************************************************************************
// Функции клика
function rotateElems_1() { 
    if (!clickFlag) { 
        clickFlag = true; downRotateFlag = false; 
        changeMouth('block', 2.5); cancelAnimationFrame(autoInterval); cancelAnimationFrame(downInterval); 
        // Сила ног
        rotateNumber = legsData.legPower + strLegsK - legsData.bikeSpeed;
        if (plusMinusFlag == 'plus') {
            if (rotateNumber > 6) rotateNumber = 6;
            else if (rotateNumber <= 0) rotateNumber = 0;
        } else if (plusMinusFlag == 'minus') {
            rotateNumber *= -1;
            if (rotateNumber < -6) rotateNumber = -6;
            else if (rotateNumber >= 0) rotateNumber = 0;
        } // Стамина меньше 20%
        if (charData.stmProgressNum <= charData.stmMaxProgressNum * 0.2) {
            rotateNumHalf = true; rotateNumber *= 0.5;
        } autoRotate();
    } 
}

// Функция автоматического кручения педалей
function autoRotate() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;
    function rafAutoRotate() {
        autoInterval = requestAnimationFrame(rafAutoRotate);
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) {
            while (dt >= step) {
                dt -= step; k += 1;
            } // Стамина меньше 20%
            if (charData.stmProgressNum <= (charData.stmMaxProgressNum * 0.2) && !rotateNumHalf) {
                rotateNumHalf = true; rotateNumber *= 0.5;
                if (!mesData.mesStaminaFlag && messenges.style.display !== 'block' && menuOpenNum == null) {
                    slowShowMes(mesStamina); mesData.mesStaminaFlag = true;
                    window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
                }
            } // Вращение педалей 
            rotateElem += rotateNumber * k; rotateFirstElem += rotateNumber * 1.3 * k; transPedals += rotateNumber * 1.8 * k;
            // Верхняя точка
            if (rotateElem >= 53 && rotateNumber >= 0) { 
                rotateElem = 53; rotateFirstElem = 68.9; transPedals = 95.4;
                rotateNumber *= -1; 
                // Exp and money                
                legsData.legsExpNum += legsData.bikeExp; 
                expProgress.style.width = legsData.legsExpNum * 67 / legsData.legsMaxExpNum + '%';//expProgress.value = legsData.legsExpNum; 
                charData.moneyNum += legsData.bikeMoney; 
                moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                // LS
                window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                window.localStorage.setItem("legsDataKey1", JSON.stringify(legsData));
            } // Нижняя точка 
            else if (rotateElem < 0 && rotateNumber < 0) {
                rotateElem = 0; rotateFirstElem = 0; transPedals = 0;
                rotateNumber *= -1; 
                // Exp and money                
                legsData.legsExpNum += legsData.bikeExp; 
                expProgress.style.width = legsData.legsExpNum * 67 / legsData.legsMaxExpNum + '%';//expProgress.value = legsData.legsExpNum; 
                charData.moneyNum += legsData.bikeMoney; 
                moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));
                // LS
                window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
                window.localStorage.setItem("legsDataKey1", JSON.stringify(legsData));
            } // Set new transform rotate data
            left_legs.style.transform = 'rotate(' + rotateElem + 'deg)'; 
            first_left_legs.style.transform = 'rotate(' + -rotateFirstElem + 'deg)';
            left_pedals.style.transform = 'translateY(' + -transPedals + 'px)';
            right_legs.style.transform = 'rotate(' + rotateElem + 'deg)'; 
            first_right_legs.style.transform = 'rotate(' + -rotateFirstElem + 'deg)';
            right_pedals.style.transform = 'translateY(' + transPedals + 'px)';
            // Отнимание стамины
            if (!minusStamFlag) {
                minusStamFlag = true;
                setTimeout(function() {
                    minusStamFlag = false; charData.stmProgressNum -= legsData.stmMinus;
                    // Запуск функции востановления стамины
                    if (charData.stmProgressNum < charData.stmMaxProgressNum && !startRecStamFlag) {
                        startRecStamFlag = true; recoveryStamina();
                    } if (charData.stmProgressNum <= 0) charData.stmProgressNum = 0;
                    // staminaProgress.value = charData.stmProgressNum;
                }, 200);
            } // Увеличение уровня 
            if (legsData.legsExpNum >= legsData.legsMaxExpNum && legsData.legsLvlNum <= 60) {
                // Show mes Level Up
                if (!mesData.mesLvlupFlag && messenges.style.display !== 'block' && menuOpenNum == null) {
                    slowShowMes(mesLvlup); mesData.mesLvlupFlag = true;
                    window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
                } else {
                    slowShowMes(mesLvlup2);
                    timerLvlUp2Mes = setTimeout(function() {slowHideMes(mesLvlup2); }, 2000);
                } // Увеличение уровня
                upLvl();
            } // Плюс минус
            if (rotateNumber < 0) plusMinusFlag = 'minus';
            else if (rotateNumber >= 0) plusMinusFlag = 'plus';
            // Достижение 80 денег
            if (charData.moneyNum >= 80 && !mesData.mesFirstbuyFlag && messenges.style.display !== 'block' && menuOpenNum == null) {
                slowShowMes(mesFirstbuy); mesData.mesFirstbuyFlag = true;
                window.localStorage.setItem("mesDataKey1", JSON.stringify(mesData));
            } k = 0;
        }
    } rafAutoRotate(); 
}
function stopEng_1() {
    clickFlag = false;  clickBackFlag = false; rotateNumber = 0; 
    cancelAnimationFrame(autoInterval); changeMouth('none', 0);
    // Stop downRotate()
    if (downRotateFlag) {
        downRotateFlag = false; cancelAnimationFrame(downInterval);
    } // Set new transform elements rotate 
    rotateElem = 0; rotateFirstElem = 0; transPedals = 0;
    left_legs.style.transform = 'rotate(' + rotateElem + 'deg)'; first_left_legs.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    left_pedals.style.transform = 'translateY(' + transPedals + 'px)'; right_legs.style.transform = 'rotate(' + rotateElem + 'deg)'; 
    first_right_legs.style.transform = 'rotate(' + rotateFirstElem + 'deg)'; right_pedals.style.transform = 'translateY(' + transPedals + 'px)';
}

// Когда отпустили палец
function rotateElemsEnd_1() {
    clickFlag = false; 
    if (!downRotateFlag) {
        downRotateFlag = true; downRotate();
    }
}

// Остановка вращения
function downRotate() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;         
    function rafDownRotate() {
        downInterval = requestAnimationFrame(rafDownRotate); 
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) {
            while (dt >= step) {
                dt -= step; k += 1;
            } if (plusMinusFlag == 'minus') {
                rotateNumber += 0.2 * k;
                if (rotateNumber >= 0) {
                    cancelAnimationFrame(autoInterval); cancelAnimationFrame(downInterval); changeMouth('none', 0); downRotateFlag = false; 
                }
            } else if (plusMinusFlag == 'plus') {
                rotateNumber -= 0.2 * k;
                if (rotateNumber <= 0) {
                    cancelAnimationFrame(autoInterval); cancelAnimationFrame(downInterval); changeMouth('none', 0); downRotateFlag = false; 
                }
            } k = 0; 
        } 
    } rafDownRotate();
}

// Функция увеличения уровня 
function upLvl_1() {
    if (sound == 'on') lvlupSound.play();
    // Исчезновение элементов ****************************************************************
    legsShowHideElem('none');
    // Увеличение Lvl ************************************************************************
    legsData.legsLvlNum += 1; 
    lvlMain.innerHTML = legsData.legsLvlNum; legsLvl.innerHTML = legsData.legsLvlNum;
    // Появление элементов *******************************************************************
    // Номер ног
    if (legsData.legsLvlNum <= 30) numLegs = legsData.legsLvlNum - 1;
    else numLegs = 29;
    // Номер труселей
    if (legsData.legsLvlNum < 3) numUnderpunts = 0;
    else if (legsData.legsLvlNum < 8) numUnderpunts = legsData.legsLvlNum - 2;
    else if (legsData.legsLvlNum < 10) numUnderpunts = legsData.legsLvlNum - 3;
    else if (legsData.legsLvlNum < 27) numUnderpunts = legsData.legsLvlNum - 4;
    else numUnderpunts = 22;
    legsShowHideElem('block');
    // Exp ***********************************************************************************
    legsData.legsExpNum = legsData.legsExpNum - legsData.legsMaxExpNum;
    expProgress.style.width = legsData.legsExpNum * 67 / legsData.legsMaxExpNum + '%';//expProgress.value = legsData.legsExpNum;
    // Max exp
    legsData.legsMaxExpNum *= legsData.minusCoefExp; 
    // legsData.minusCoefExp -= (0.035 - legsData.legsLvlNum * 0.0009);
    legsData.minusCoefExp -= (0.03 - legsData.legsLvlNum * 0.001);
    // expProgress.max = legsData.legsMaxExpNum;
    // Status points **************************************************************************
    if (legsData.legsLvlNum % 3 == 0) charData.addSpBikeNum += 1;
    charData.spNum += charData.addSpBikeNum; statusPoints.innerHTML = charData.spNum;
    // Legs power *****************************************************************************
    legsData.legPower += (0.2 + (legsData.legsLvlNum - 2) * 0.02);
    // Str and Stm coef
    if (timerData.useStimNum !== null) {
        if (timerData.useStimNum == 2) strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 2.5;
        else if (timerData.useStimNum == 3) strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 5;
        else if (timerData.useStimNum == 4) strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 5; 
        else if (timerData.useStimNum == 5) strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 7.5; 
        else if (timerData.useStimNum == 6) strLegsK = (0.2 + (legsData.legsLvlNum - 2) * 0.02) * 10; 
    } rotateNumber = legsData.legPower + strLegsK - legsData.bikeSpeed;
    // Dir legs move
    if (plusMinusFlag == 'plus') {
        if (rotateNumber > 6) rotateNumber = 6;
        else if (rotateNumber <= 0) rotateNumber = 0;
    } else if (plusMinusFlag == 'minus') {
        rotateNumber *= -1;
        if (rotateNumber < -6) rotateNumber = -6;
        else if (rotateNumber >= 0) rotateNumber = 0;
    } // Stamina ********************************************************************************
    cancelAnimationFrame(intervalRecStam); startRecStamFlag = false; rotateNumHalf = false; 
    charData.stmMaxProgressNum += 1 * (1 + legsData.legsLvlNum * legsData.legsLvlNum * 0.01); //2; 
    charData.recStmNum += 0.00125 * (1 + legsData.legsLvlNum * legsData.legsLvlNum * 0.01); //0.0025;
    charData.stmProgressNum = charData.stmMaxProgressNum; //staminaProgress.max = charData.stmMaxProgressNum; 
    staminaProgress.style.width = charData.stmProgressNum * 67 / charData.stmMaxProgressNum + '%';//staminaProgress.value = charData.stmProgressNum; 
    // Increase stim ***************************************************************************
    if (legsData.legsLvlNum > bodyData.bodyLvlNum) {
        // priceStimNum = priceStimNum.map(function(num) {return Math.round(num * (1.18 - legsData.legsLvlNum * 0.0016));});
        priceStimNum = priceStimConst.map(function(num) {
            return Math.round(num * Math.pow((1.23 - legsData.legsLvlNum * 0.0013), legsData.legsLvlNum - 1));
        });
        for (let i = 0; i < priceStimElem.length; i++) priceStimElem[i].innerHTML = priceStimNum[i];
    } // LS
    window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
    window.localStorage.setItem("legsDataKey1", JSON.stringify(legsData));
}





// PULLUP LOCATION ###########################################################################################################################
// Дополнительные свойства обьекта game ************************************************************************************************
const crossbar = document.getElementById('crossbar'); // Tурник
// Функции клика
function rotateElems_2() { 
    if (!clickFlag && !clickBackFlag) {
        clickFlag = true; changeMouth('block', 2.5); 
        // Arms power
        rotateNumber = bodyData.armPower - bodyData.armPower * 2 / 3 - compCount * bodyData.bodyLvlNum * 0.18 - ((charData.stmMaxProgressNum + 1) / (charData.stmProgressNum + 1) - 1) * 0.4; //bodyData.bodyLvlNum * bodyData.bodyLvlNum
        console.log('rotateNumber ' + rotateNumber);
        if (rotateNumber < 10) rotateNumber = 10;
        // Rotate arms elements 
        rotateElem += rotateNumber; rotateFirstElem += rotateNumber;
        // Up char montage area
        upDownNum -= rotateNumber * 0.105; if (upDownNum <= -9.6) upDownNum = -9.6;
        char.style.transform = 'translateY(' + upDownNum + '%)';
        // Достижение верхней точки подьема
        if (rotateFirstElem >= 90) { 
            clickBackFlag = true; 
            rotateElem = 90; rotateFirstElem = 90;
            upDownNum = -9.6; char.style.transform = 'translateY(' + upDownNum + '%)';
            // Счетчики подтягиваний и рекорд
            compCount += 1; compQuant.innerHTML = compCount; 
            if (compCount > pullupRecordNum) {
                pullupRecordNum = compCount; pullupRecord.innerHTML = compCount;
                window.localStorage.setItem("pullupRecordKey1", pullupRecordNum);
            } // compMoneyNum = Math.round(compMoneyNum * (1.18 - compCount * 0.001)); // (1.2 - compCount * 0.0019)
        } // Set new tranform rotate data
        right_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
        left_arm.style.transform = 'rotate(' + (-rotateElem) + 'deg)'; 
        first_right_arm.style.transform = 'rotate(' + (-rotateFirstElem) + 'deg)';
        first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
        // Отнимание стамины
        charData.stmProgressNum -= ((1 + compCount) * bodyData.bodyLvlNum * 0.1);//(1 + Math.pow(compCount, 2) * 0.1);
        if (charData.stmProgressNum < charData.stmMaxProgressNum && !startRecStamFlag) {
            startRecStamFlag = true; 
            recoveryStamina();
        } if (charData.stmProgressNum <= 0) charData.stmProgressNum = 0;
        // staminaProgress.value = charData.stmProgressNum;
        // Уменьшение силы от отдыха
        // restPower -= bodyData.bodyLvlNum * 0.5; 
        // if (restPower <= 0) restPower = 0;
        // Запуск функции возврата элементов рук
        if (!startBackFlag) {
            startBackFlag = true; 
            backElems();
        } 
    } 
}
function stopEng_2() {
    clickFlag = false;  clickBackFlag = false; rotateNumber = 0; 
    changeMouth('none', 0);
    // Stop backElems()
    if (startBackFlag) {
        startBackFlag = false; cancelAnimationFrame(backInterval);
    } // Set new transform elements rotate 
    rotateElem = 0; rotateFirstElem = 0;
    right_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
    left_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
    first_right_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
}

// Отпуск касания
function rotateElemsEnd_2() {
    clickFlag = false;
}
    
// Функция опускания рук
function backElems_2() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;         
    function rafBackElems() {
        backInterval = requestAnimationFrame(rafBackElems); 
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) {
            while (dt >= step) {
                dt -= step; k += 1;
            } if (!clickBackFlag) backRotateNumber = 2 * k;
            else if (clickBackFlag) backRotateNumber = 3 * k;
            // Back rotate arm elements
            rotateElem -= backRotateNumber; rotateFirstElem -= backRotateNumber;
            // Down char montage area
            upDownNum += backRotateNumber * 0.105; 
            char.style.transform = 'translateY(' + upDownNum + '%)';
            if (rotateFirstElem <= 0) {
                rotateElem = 0; rotateFirstElem = 0;
                upDownNum = 0; char.style.transform = 'translateY(' + upDownNum + '%)';
                clickBackFlag = false; startBackFlag = false;
                cancelAnimationFrame(backInterval); changeMouth('none', 0); 
            } // Set new transform elements rotate 
            right_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
            left_arm.style.transform = 'rotate(' + (-rotateElem) + 'deg)';
            first_right_arm.style.transform = 'rotate(' + (-rotateFirstElem) + 'deg)';
            first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
            k = 0;
        }
    } rafBackElems(); 
}





// SQUATS LOCATION ###########################################################################################################################
// Дополнительные свойства обьекта game ******************************************************************************************************
const left_foot = [document.getElementById('left-foot1'),document.getElementById('left-foot2'),document.getElementById('left-foot3'),document.getElementById('left-foot4'),document.getElementById('left-foot5'),document.getElementById('left-foot6'),document.getElementById('left-foot7'),document.getElementById('left-foot8'),document.getElementById('left-foot9'),document.getElementById('left-foot10'),document.getElementById('left-foot11'),document.getElementById('left-foot12'),document.getElementById('left-foot13'),document.getElementById('left-foot14'),document.getElementById('left-foot15'),document.getElementById('left-foot16'),document.getElementById('left-foot17'),document.getElementById('left-foot18'),document.getElementById('left-foot19'),document.getElementById('left-foot20'),document.getElementById('left-foot21'),document.getElementById('left-foot22'),document.getElementById('left-foot23'),document.getElementById('left-foot24'),document.getElementById('left-foot25'),document.getElementById('left-foot26'),document.getElementById('left-foot27'),document.getElementById('left-foot28'),document.getElementById('left-foot29'),document.getElementById('left-foot30')],
right_foot = [document.getElementById('right-foot1'),document.getElementById('right-foot2'),document.getElementById('right-foot3'),document.getElementById('right-foot4'),document.getElementById('right-foot5'),document.getElementById('right-foot6'),document.getElementById('right-foot7'),document.getElementById('right-foot8'),document.getElementById('right-foot9'),document.getElementById('right-foot10'),document.getElementById('right-foot11'),document.getElementById('right-foot12'),document.getElementById('right-foot13'),document.getElementById('right-foot14'),document.getElementById('right-foot15'),document.getElementById('right-foot16'),document.getElementById('right-foot17'),document.getElementById('right-foot18'),document.getElementById('right-foot19'),document.getElementById('right-foot20'),document.getElementById('right-foot21'),document.getElementById('right-foot22'),document.getElementById('right-foot23'),document.getElementById('right-foot24'),document.getElementById('right-foot25'),document.getElementById('right-foot26'),document.getElementById('right-foot27'),document.getElementById('right-foot28'),document.getElementById('right-foot29'),document.getElementById('right-foot30')]; 
// Номер стоп
let footNum;
// Точки transform-origin
left_foot.forEach(function(item) {item.style.transformOrigin = '224.8px 984.21px';});
right_foot.forEach(function(item) {item.style.transformOrigin = '496.37px 984.23px';});

// Обработчики клика  **********************************************************************************************************************
// Функции клика
function rotateElems_3() { 
    if (!clickFlag && !clickBackFlag) {
        clickFlag = true; changeMouth('block', 2.5);
        // Legs power
        rotateNumber = legsData.legPower * 21 - legsData.legPower * 42 / 3 - compCount * legsData.legsLvlNum * 0.19 - ((charData.stmMaxProgressNum + 1) / (charData.stmProgressNum + 1) - 1) * 0.4;
        if (rotateNumber < 10) rotateNumber = 10;
        // Rotate legs elements 
        rotateElem += rotateNumber * 0.8; rotateFirstElem += rotateNumber; rotateFoot += rotateNumber * 0.2;
        // Up char montage area
        upDownNum -= rotateNumber * 0.105; if (upDownNum <= -10.6) upDownNum = -10.6;
        char.style.transform = 'translateY(' + upDownNum + '%)';
        // Достижение верхней точки подьема
        if (rotateFirstElem >= 100) { 
            clickBackFlag = true; 
            rotateElem = 80; rotateFirstElem = 100; rotateFoot = 20;          
            upDownNum = -10.6; char.style.transform = 'translateY(' + upDownNum + '%)';
            // Счетчики подтягиваний и рекорд
            compCount += 1; compQuant.innerHTML = compCount; 
            if (compCount > squatRecordNum) {
                squatRecordNum = compCount; squatRecord.innerHTML = compCount;
                window.localStorage.setItem("squatRecordKey1", squatRecordNum);
            } // compMoneyNum = Math.round(compMoneyNum * (1.18 - compCount * 0.001));
        } // Set new transform elements rotate 
        left_legs.style.transform = 'rotate(' + -rotateElem + 'deg)'; 
        right_legs.style.transform = 'rotate(' + rotateElem + 'deg)';
        first_left_legs.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
        first_right_legs.style.transform = 'rotate(' + -rotateFirstElem + 'deg)';
        left_foot[footNum].style.transform = 'rotate(' + -rotateFoot + 'deg)';
        right_foot[footNum].style.transform = 'rotate(' + rotateFoot + 'deg)';
        // Отнимание стамины
        charData.stmProgressNum -= ((1 + compCount) * legsData.legsLvlNum * 0.1);
        if (charData.stmProgressNum < charData.stmMaxProgressNum && !startRecStamFlag) {startRecStamFlag = true; recoveryStamina();} 
        if (charData.stmProgressNum <= 0) charData.stmProgressNum = 0;
        // staminaProgress.value = charData.stmProgressNum;
        // Уменьшение силы от отдыха
        // restPower -= legsData.legsLvlNum * 0.5; if (restPower <= 0) restPower = 0;
        // Запуск функции возврата элементов рук
        if (!startBackFlag) {
            startBackFlag = true; backElems();
        } 
    } 
}
function stopEng_3() {
    clickFlag = false;  clickBackFlag = false; rotateNumber = 0; 
    changeMouth('none', 0);
    // Stop backElems()
    if (startBackFlag) {
        startBackFlag = false; cancelAnimationFrame(backInterval);
    } // Set new transform elements rotate 
    rotateElem = 0; rotateFirstElem = 0; rotateFoot = 0;
    right_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
    left_arm.style.transform = 'rotate(' + rotateElem + 'deg)';
    first_right_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    first_left_arm.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
    left_foot[footNum].style.transform = 'rotate(' + rotateFoot + 'deg)';
    right_foot[footNum].style.transform = 'rotate(' + rotateFoot + 'deg)';
}

// Отпуск касания
function rotateElemsEnd_3() {
    clickFlag = false;
}
    
// Функция опускания рук
function backElems_3() {
    let last = performance.now(), now, step = 1000 / 60, dt = 0, k = 0;         
    function rafBackElems() {
        backInterval = requestAnimationFrame(rafBackElems); 
        now = performance.now(); dt += (now - last); last = now;
        if (dt >= step) {
            while (dt >= step) {
                dt -= step; k += 1;
            } if (!clickBackFlag) backRotateNumber = 2 * k;
            else if (clickBackFlag) backRotateNumber = 3 * k;
            // Back rotate arm elements
            rotateElem -= backRotateNumber * 0.8; rotateFirstElem -= backRotateNumber; rotateFoot -= backRotateNumber * 0.2;
            // Down char montage area
            upDownNum += backRotateNumber * 0.105; 
            char.style.transform = 'translateY(' + upDownNum + '%)';
            if (rotateFirstElem <= 0) {
                rotateElem = 0; rotateFirstElem = 0; rotateFoot = 0;
                // Char montage area
                upDownNum = 0; char.style.transform = 'translateY(' + upDownNum + '%)';
                clickBackFlag = false; startBackFlag = false;
                cancelAnimationFrame(backInterval); changeMouth('none', 0); 
            } // Set new transform elements rotate 
            right_legs.style.transform = 'rotate(' + rotateElem + 'deg)';
            left_legs.style.transform = 'rotate(' + (-rotateElem) + 'deg)';
            first_right_legs.style.transform = 'rotate(' + (-rotateFirstElem) + 'deg)';
            first_left_legs.style.transform = 'rotate(' + rotateFirstElem + 'deg)';
            left_foot[footNum].style.transform = 'rotate(' + -rotateFoot + 'deg)';
            right_foot[footNum].style.transform = 'rotate(' + rotateFoot + 'deg)';
            k = 0;
        }
    } rafBackElems(); 
}




