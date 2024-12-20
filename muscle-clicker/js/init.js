"use strict";

// Show location, char and other elements and data in main window ********************************************************************************
function showLocation() {
    // Main data ************************************************************
    // Char 
    char = document.getElementById('man_' + openWindow);
    // leftRightNum = 0; upDownNum = 0;
    // char.style.transform = 'translate(' + leftRightNum + '%, ' + upDownNum + '%)';
    // Hairstyles and Beards
    beard = [document.getElementById('beard1_' + openWindow),document.getElementById('beard2_' + openWindow),document.getElementById('beard3_' + openWindow),document.getElementById('beard4_' + openWindow),document.getElementById('beard5_' + openWindow),document.getElementById('beard6_' + openWindow),document.getElementById('beard7_' + openWindow),document.getElementById('beard8_' + openWindow)];
    hair = [document.getElementById('hair1_' + openWindow),document.getElementById('hair2_' + openWindow),document.getElementById('hair3_' + openWindow),document.getElementById('hair4_' + openWindow),document.getElementById('hair5_' + openWindow),document.getElementById('hair6_' + openWindow),document.getElementById('hair7_' + openWindow),document.getElementById('hair8_' + openWindow)];
    // Левые голени 
    first_left_leg = [document.getElementById('first-left-leg1_' + openWindow),document.getElementById('first-left-leg2_' + openWindow),document.getElementById('first-left-leg3_' + openWindow),document.getElementById('first-left-leg4_' + openWindow),document.getElementById('first-left-leg5_' + openWindow),document.getElementById('first-left-leg6_' + openWindow),document.getElementById('first-left-leg7_' + openWindow),document.getElementById('first-left-leg8_' + openWindow),document.getElementById('first-left-leg9_' + openWindow),document.getElementById('first-left-leg10_' + openWindow),document.getElementById('first-left-leg11_' + openWindow),document.getElementById('first-left-leg12_' + openWindow),document.getElementById('first-left-leg13_' + openWindow),document.getElementById('first-left-leg14_' + openWindow),document.getElementById('first-left-leg15_' + openWindow),document.getElementById('first-left-leg16_' + openWindow),document.getElementById('first-left-leg17_' + openWindow),document.getElementById('first-left-leg18_' + openWindow),document.getElementById('first-left-leg19_' + openWindow),document.getElementById('first-left-leg20_' + openWindow),document.getElementById('first-left-leg21_' + openWindow),document.getElementById('first-left-leg22_' + openWindow),document.getElementById('first-left-leg23_' + openWindow),document.getElementById('first-left-leg24_' + openWindow),document.getElementById('first-left-leg25_' + openWindow),document.getElementById('first-left-leg26_' + openWindow),document.getElementById('first-left-leg27_' + openWindow),document.getElementById('first-left-leg28_' + openWindow),document.getElementById('first-left-leg29_' + openWindow),document.getElementById('first-left-leg30_' + openWindow)];
    // Левые ляхи 
    second_left_leg = [document.getElementById('second-left-leg1_' + openWindow),document.getElementById('second-left-leg2_' + openWindow),document.getElementById('second-left-leg3_' + openWindow),document.getElementById('second-left-leg4_' + openWindow),document.getElementById('second-left-leg5_' + openWindow),document.getElementById('second-left-leg6_' + openWindow),document.getElementById('second-left-leg7_' + openWindow),document.getElementById('second-left-leg8_' + openWindow),document.getElementById('second-left-leg9_' + openWindow),document.getElementById('second-left-leg10_' + openWindow),document.getElementById('second-left-leg11_' + openWindow),document.getElementById('second-left-leg12_' + openWindow),document.getElementById('second-left-leg13_' + openWindow),document.getElementById('second-left-leg14_' + openWindow),document.getElementById('second-left-leg15_' + openWindow),document.getElementById('second-left-leg16_' + openWindow),document.getElementById('second-left-leg17_' + openWindow),document.getElementById('second-left-leg18_' + openWindow),document.getElementById('second-left-leg19_' + openWindow),document.getElementById('second-left-leg20_' + openWindow),document.getElementById('second-left-leg21_' + openWindow),document.getElementById('second-left-leg22_' + openWindow),document.getElementById('second-left-leg23_' + openWindow),document.getElementById('second-left-leg24_' + openWindow),document.getElementById('second-left-leg25_' + openWindow),document.getElementById('second-left-leg26_' + openWindow),document.getElementById('second-left-leg27_' + openWindow),document.getElementById('second-left-leg28_' + openWindow),document.getElementById('second-left-leg29_' + openWindow),document.getElementById('second-left-leg30_' + openWindow)];
    // Все левые ноги, голени 
    first_left_legs = document.getElementById('first-left-legs_' + openWindow); left_legs = document.getElementById('left-legs_' + openWindow);
    // Правые голени 
    first_right_leg = [document.getElementById('first-right-leg1_' + openWindow),document.getElementById('first-right-leg2_' + openWindow),document.getElementById('first-right-leg3_' + openWindow),document.getElementById('first-right-leg4_' + openWindow),document.getElementById('first-right-leg5_' + openWindow),document.getElementById('first-right-leg6_' + openWindow),document.getElementById('first-right-leg7_' + openWindow),document.getElementById('first-right-leg8_' + openWindow),document.getElementById('first-right-leg9_' + openWindow),document.getElementById('first-right-leg10_' + openWindow),document.getElementById('first-right-leg11_' + openWindow),document.getElementById('first-right-leg12_' + openWindow),document.getElementById('first-right-leg13_' + openWindow),document.getElementById('first-right-leg14_' + openWindow),document.getElementById('first-right-leg15_' + openWindow),document.getElementById('first-right-leg16_' + openWindow),document.getElementById('first-right-leg17_' + openWindow),document.getElementById('first-right-leg18_' + openWindow),document.getElementById('first-right-leg19_' + openWindow),document.getElementById('first-right-leg20_' + openWindow),document.getElementById('first-right-leg21_' + openWindow),document.getElementById('first-right-leg22_' + openWindow),document.getElementById('first-right-leg23_' + openWindow),document.getElementById('first-right-leg24_' + openWindow),document.getElementById('first-right-leg25_' + openWindow),document.getElementById('first-right-leg26_' + openWindow),document.getElementById('first-right-leg27_' + openWindow),document.getElementById('first-right-leg28_' + openWindow),document.getElementById('first-right-leg29_' + openWindow),document.getElementById('first-right-leg30_' + openWindow)];
    // Правые ляхи 
    second_right_leg = [document.getElementById('second-right-leg1_' + openWindow),document.getElementById('second-right-leg2_' + openWindow),document.getElementById('second-right-leg3_' + openWindow),document.getElementById('second-right-leg4_' + openWindow),document.getElementById('second-right-leg5_' + openWindow),document.getElementById('second-right-leg6_' + openWindow),document.getElementById('second-right-leg7_' + openWindow),document.getElementById('second-right-leg8_' + openWindow),document.getElementById('second-right-leg9_' + openWindow),document.getElementById('second-right-leg10_' + openWindow),document.getElementById('second-right-leg11_' + openWindow),document.getElementById('second-right-leg12_' + openWindow),document.getElementById('second-right-leg13_' + openWindow),document.getElementById('second-right-leg14_' + openWindow),document.getElementById('second-right-leg15_' + openWindow),document.getElementById('second-right-leg16_' + openWindow),document.getElementById('second-right-leg17_' + openWindow),document.getElementById('second-right-leg18_' + openWindow),document.getElementById('second-right-leg19_' + openWindow),document.getElementById('second-right-leg20_' + openWindow),document.getElementById('second-right-leg21_' + openWindow),document.getElementById('second-right-leg22_' + openWindow),document.getElementById('second-right-leg23_' + openWindow),document.getElementById('second-right-leg24_' + openWindow),document.getElementById('second-right-leg25_' + openWindow),document.getElementById('second-right-leg26_' + openWindow),document.getElementById('second-right-leg27_' + openWindow),document.getElementById('second-right-leg28_' + openWindow),document.getElementById('second-right-leg29_' + openWindow),document.getElementById('second-right-leg30_' + openWindow)];
    // Все левые ноги, голени
    first_right_legs = document.getElementById('first-right-legs_' + openWindow); right_legs = document.getElementById('right-legs_' + openWindow);
    // Тела  
    bodys = [document.getElementById('body1_' + openWindow),document.getElementById('body3_' + openWindow),document.getElementById('body4_' + openWindow),document.getElementById('body5_' + openWindow),document.getElementById('body6_' + openWindow),document.getElementById('body7_' + openWindow),document.getElementById('body8_' + openWindow),document.getElementById('body9_' + openWindow),document.getElementById('body10_' + openWindow),document.getElementById('body11_' + openWindow),document.getElementById('body12_' + openWindow),document.getElementById('body13_' + openWindow),document.getElementById('body14_' + openWindow),document.getElementById('body15_' + openWindow),document.getElementById('body16_' + openWindow),document.getElementById('body17_' + openWindow),document.getElementById('body18_' + openWindow),document.getElementById('body19_' + openWindow),document.getElementById('body20_' + openWindow),document.getElementById('body21_' + openWindow),document.getElementById('body22_' + openWindow),document.getElementById('body23_' + openWindow),document.getElementById('body24_' + openWindow),document.getElementById('body25_' + openWindow),document.getElementById('body26_' + openWindow),document.getElementById('body27_' + openWindow),document.getElementById('body28_' + openWindow),document.getElementById('body29_' + openWindow),document.getElementById('body30_' + openWindow)];
    // Труселя 
    underpant = [document.getElementById('underpants1_' + openWindow),document.getElementById('underpants3_' + openWindow),document.getElementById('underpants4_' + openWindow),document.getElementById('underpants5_' + openWindow),document.getElementById('underpants6_' + openWindow),document.getElementById('underpants7_' + openWindow),document.getElementById('underpants9_' + openWindow),document.getElementById('underpants11_' + openWindow),document.getElementById('underpants12_' + openWindow),document.getElementById('underpants13_' + openWindow),document.getElementById('underpants14_' + openWindow),document.getElementById('underpants15_' + openWindow),document.getElementById('underpants16_' + openWindow),document.getElementById('underpants17_' + openWindow),document.getElementById('underpants18_' + openWindow),document.getElementById('underpants19_' + openWindow),document.getElementById('underpants20_' + openWindow),document.getElementById('underpants21_' + openWindow),document.getElementById('underpants22_' + openWindow),document.getElementById('underpants23_' + openWindow),document.getElementById('underpants24_' + openWindow),document.getElementById('underpants25_' + openWindow),document.getElementById('underpants26_' + openWindow)];
    // Веки 
    rightUpperEyelid = document.getElementById('rigth-upper-eyelid_' + openWindow); rightLowerEyelid = document.getElementById('right-lower-eyelid_' + openWindow);
    leftUpperEyelid = document.getElementById('left-upper-eyelid_' + openWindow); leftLowerEyelid = document.getElementById('left-lower-eyelid_' + openWindow);
    // Рты 
    mouth1 = document.getElementById('mouth1_' + openWindow); mouth2 = document.getElementById('mouth2_' + openWindow);
    // Левые руки 
    second_left_arms = [document.getElementById('second-left-arm1_' + openWindow),document.getElementById('second-left-arm2_' + openWindow),document.getElementById('second-left-arm3_' + openWindow),document.getElementById('second-left-arm4_' + openWindow),document.getElementById('second-left-arm5_' + openWindow),document.getElementById('second-left-arm6_' + openWindow),document.getElementById('second-left-arm7_' + openWindow),document.getElementById('second-left-arm8_' + openWindow),document.getElementById('second-left-arm9_' + openWindow),document.getElementById('second-left-arm10_' + openWindow),document.getElementById('second-left-arm11_' + openWindow),document.getElementById('second-left-arm12_' + openWindow),document.getElementById('second-left-arm13_' + openWindow),document.getElementById('second-left-arm14_' + openWindow),document.getElementById('second-left-arm15_' + openWindow),document.getElementById('second-left-arm16_' + openWindow),document.getElementById('second-left-arm17_' + openWindow),document.getElementById('second-left-arm18_' + openWindow),document.getElementById('second-left-arm19_' + openWindow),document.getElementById('second-left-arm20_' + openWindow),document.getElementById('second-left-arm21_' + openWindow),document.getElementById('second-left-arm22_' + openWindow),document.getElementById('second-left-arm23_' + openWindow),document.getElementById('second-left-arm24_' + openWindow),document.getElementById('second-left-arm25_' + openWindow),document.getElementById('second-left-arm26_' + openWindow),document.getElementById('second-left-arm27_' + openWindow),document.getElementById('second-left-arm28_' + openWindow),document.getElementById('second-left-arm29_' + openWindow),document.getElementById('second-left-arm30_' + openWindow)];
    // Левые предплечья 
    first_left_arms = [document.getElementById('first-left-arm1_' + openWindow),document.getElementById('first-left-arm2_' + openWindow),document.getElementById('first-left-arm3_' + openWindow),document.getElementById('first-left-arm4_' + openWindow),document.getElementById('first-left-arm5_' + openWindow),document.getElementById('first-left-arm6_' + openWindow),document.getElementById('first-left-arm7_' + openWindow),document.getElementById('first-left-arm8_' + openWindow),document.getElementById('first-left-arm9_' + openWindow),document.getElementById('first-left-arm10_' + openWindow),document.getElementById('first-left-arm11_' + openWindow),document.getElementById('first-left-arm12_' + openWindow),document.getElementById('first-left-arm13_' + openWindow),document.getElementById('first-left-arm14_' + openWindow),document.getElementById('first-left-arm15_' + openWindow),document.getElementById('first-left-arm16_' + openWindow),document.getElementById('first-left-arm17_' + openWindow),document.getElementById('first-left-arm18_' + openWindow),document.getElementById('first-left-arm19_' + openWindow),document.getElementById('first-left-arm20_' + openWindow),document.getElementById('first-left-arm21_' + openWindow),document.getElementById('first-left-arm22_' + openWindow),document.getElementById('first-left-arm23_' + openWindow),document.getElementById('first-left-arm24_' + openWindow),document.getElementById('first-left-arm25_' + openWindow),document.getElementById('first-left-arm26_' + openWindow),document.getElementById('first-left-arm27_' + openWindow),document.getElementById('first-left-arm28_' + openWindow),document.getElementById('first-left-arm29_' + openWindow),document.getElementById('first-left-arm30_' + openWindow)];
    // Все левые руки, предплечья 
    first_left_arm = document.getElementById('first-left-arms_' + openWindow); left_arm = document.getElementById('left-arms_' + openWindow);
    // Правые руки 
    second_right_arms = [document.getElementById('second-right-arm1_' + openWindow),document.getElementById('second-right-arm2_' + openWindow),document.getElementById('second-right-arm3_' + openWindow),document.getElementById('second-right-arm4_' + openWindow),document.getElementById('second-right-arm5_' + openWindow),document.getElementById('second-right-arm6_' + openWindow),document.getElementById('second-right-arm7_' + openWindow),document.getElementById('second-right-arm8_' + openWindow),document.getElementById('second-right-arm9_' + openWindow),document.getElementById('second-right-arm10_' + openWindow),document.getElementById('second-right-arm11_' + openWindow),document.getElementById('second-right-arm12_' + openWindow),document.getElementById('second-right-arm13_' + openWindow),document.getElementById('second-right-arm14_' + openWindow),document.getElementById('second-right-arm15_' + openWindow),document.getElementById('second-right-arm16_' + openWindow),document.getElementById('second-right-arm17_' + openWindow),document.getElementById('second-right-arm18_' + openWindow),document.getElementById('second-right-arm19_' + openWindow),document.getElementById('second-right-arm20_' + openWindow),document.getElementById('second-right-arm21_' + openWindow),document.getElementById('second-right-arm22_' + openWindow),document.getElementById('second-right-arm23_' + openWindow),document.getElementById('second-right-arm24_' + openWindow),document.getElementById('second-right-arm25_' + openWindow),document.getElementById('second-right-arm26_' + openWindow),document.getElementById('second-right-arm27_' + openWindow),document.getElementById('second-right-arm28_' + openWindow),document.getElementById('second-right-arm29_' + openWindow),document.getElementById('second-right-arm30_' + openWindow)];
    // Правые предплечья 0 - 24
    first_right_arms = [document.getElementById('first-right-arm1_' + openWindow),document.getElementById('first-right-arm2_' + openWindow),document.getElementById('first-right-arm3_' + openWindow),document.getElementById('first-right-arm4_' + openWindow),document.getElementById('first-right-arm5_' + openWindow),document.getElementById('first-right-arm6_' + openWindow),document.getElementById('first-right-arm7_' + openWindow),document.getElementById('first-right-arm8_' + openWindow),document.getElementById('first-right-arm9_' + openWindow),document.getElementById('first-right-arm10_' + openWindow),document.getElementById('first-right-arm11_' + openWindow),document.getElementById('first-right-arm12_' + openWindow),document.getElementById('first-right-arm13_' + openWindow),document.getElementById('first-right-arm14_' + openWindow),document.getElementById('first-right-arm15_' + openWindow),document.getElementById('first-right-arm16_' + openWindow),document.getElementById('first-right-arm17_' + openWindow),document.getElementById('first-right-arm18_' + openWindow),document.getElementById('first-right-arm19_' + openWindow),document.getElementById('first-right-arm20_' + openWindow),document.getElementById('first-right-arm21_' + openWindow),document.getElementById('first-right-arm22_' + openWindow),document.getElementById('first-right-arm23_' + openWindow),document.getElementById('first-right-arm24_' + openWindow),document.getElementById('first-right-arm25_' + openWindow),document.getElementById('first-right-arm26_' + openWindow),document.getElementById('first-right-arm27_' + openWindow),document.getElementById('first-right-arm28_' + openWindow),document.getElementById('first-right-arm29_' + openWindow),document.getElementById('first-right-arm30_' + openWindow)];
    // Все правые руки, предплечья 
    first_right_arm = document.getElementById('first-right-arms_' + openWindow); right_arm = document.getElementById('right-arms_' + openWindow);
    
    // Exercises locations **************************************************
    if (openWindow < 2) {
        // Show stim in main window
        if (timerData.useStimNum !== null) {
            stimMain[timerData.useStimNum].style.display = 'block'; stimTimer.style.display = 'block'; 
        } // Hide competitions backgrounds 
        backgrMain[4].style.display = 'none'; backgrInvent[4].style.display = 'none'; backgrShop[4].style.display = 'none';
        stmProgressRed.style.display = 'block';
        // Флаги единственного добавления денег и опыта
        exp2Flag = false; exp3Flag = false;
    } // Competitions locations *********************************************
    else {
        // restPower = 0; // Сила от отдыха на локациях соревнований
        compTimerNum = 60; // Счетчик таймера соревнований
        upDownNum = 0; // Проценты опуска и подьема МО чара
        compCount = 0; // Счетчик количества подтягиваний
        // stmMinus = 1; // Начальная трата выносливости
        // compMoneyNum = 51; // Деньги за соревнование
        // Hide stim in main window
        if (timerData.useStimNum !== null) {
            stimMain[timerData.useStimNum].style.display = 'none'; stimTimer.style.display = 'none'; 
        } // Show competitions backgrounds
        backgrMain[4].style.display = 'block'; backgrInvent[4].style.display = 'block'; backgrShop[4].style.display = 'block';
        // Стамина 100% 
        charData.stmProgressNum = charData.stmMaxProgressNum; //staminaProgress.value = charData.stmProgressNum; 
        staminaProgress.style.width = charData.stmProgressNum * 67 / charData.stmMaxProgressNum + '%';
        startRecStamFlag = false;
        // Main elements group
        mainElemComp.style.display = 'block';
        compQuant.innerHTML = compCount; 
        // Raising the stamina progress bar and money group
        stmProgressRed.style.display = 'none';
        // Запуск таймера соревнования 
        if (startWindow.style.display == 'none') timerCompEnd();
    } 
    // Each location ********************************************************
    if (openWindow == 0) {
        // Lvl in main wind
        lvlMain.innerHTML = bodyData.bodyLvlNum; 
        bodyIconMain.style.display = 'block'; legsIconMain.style.display = 'none';
        // expProgress.value = bodyData.bodyExpNum; expProgress.max = bodyData.bodyMaxExpNum; 
        expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';
        // Inventory menu
        inventaryDumb.style.display = 'block'; inventaryBike.style.display = 'none';
        stimsInvent = document.getElementById('stims-dumb');
        menuWinds[1].setAttribute("viewBox", "0 0 2804.061 1280");
        // Смещение пальцев и гантелей  
        left_fingers.style.transform = 'translate(' + -bodyData.transX + 'px)';
        right_fingers.style.transform = 'translate(' + bodyData.transX + 'px)';
        all_left_dumbbells.style.transform = 'translate(' + -bodyData.transX + 'px)';
        all_right_dumbbells.style.transform = 'translate(' + bodyData.transX + 'px)';
        // Точки transform-origin рук
        left_arm.style.transformOrigin = 318.6 - bodyData.transX + 'px 631.3px';
        first_left_arm.style.transformOrigin = 307.7 - bodyData.transX + 'px 716.1px';
        right_arm.style.transformOrigin = 401.5 + bodyData.transX + 'px 631.3px';
        first_right_arm.style.transformOrigin = 412.5 + bodyData.transX + 'px 716.1px';
        // Init game engine
        rotateElems = rotateElems_0;
        rotateElemsEnd = rotateElemsEnd_0;
        backElems = backElems_0;
        upLvl = upLvl_0;
        stopEng = stopEng_0;
    } else if (openWindow == 1) {
        bike_speeds.style.display = 'block';
        // Lvl in main wind
        lvlMain.innerHTML = legsData.legsLvlNum; 
        bodyIconMain.style.display = 'none'; legsIconMain.style.display = 'block';
        // expProgress.value = legsData.legsExpNum; expProgress.max = legsData.legsMaxExpNum;  
        expProgress.style.width = legsData.legsExpNum * 67 / legsData.legsMaxExpNum + '%';
        // Inventory menu
        inventaryDumb.style.display = 'none'; inventaryBike.style.display = 'block'; 
        stimsInvent = document.getElementById('stims-bike');
        menuWinds[1].setAttribute("viewBox", "0 0 2450 1280");
        // Точки transform-origin
        first_left_legs.style.transformOrigin = '272px 852.5px'; left_legs.style.transformOrigin = '342.5px 755px';
        first_right_legs.style.transformOrigin = '493px 763px'; right_legs.style.transformOrigin = '376.5px 755px';
        // Init game engine
        rotateElems = rotateElems_1;
        rotateElemsEnd = rotateElemsEnd_1;
        upLvl = upLvl_1;
        stopEng = stopEng_1;
    } else if (openWindow == 2) {
        // Lvl in main wind
        lvlMain.innerHTML = bodyData.bodyLvlNum; 
        bodyIconMain.style.display = 'block'; legsIconMain.style.display = 'none';
        // expProgress.value = bodyData.bodyExpNum; expProgress.max = bodyData.bodyMaxExpNum; 
        expProgress.style.width = bodyData.bodyExpNum * 67 / bodyData.bodyMaxExpNum + '%';
        // Inventory menu
        inventaryDumb.style.display = 'block'; inventaryBike.style.display = 'none'; 
        stimsInvent = document.getElementById('stims-dumb');
        menuWinds[1].setAttribute("viewBox", "0 0 2804.061 1280");
        // Comp name in main wind
        if (langNum == 1) compNameWord = 'Подтяг.'; 
        else if (langNum == 2) compNameWord = 'Pull-ups';
        else compNameWord = 'Pull-ups'; 
        compNameMain.innerHTML = compNameWord; 
        // Точки transform-origin рук
        left_arm.style.transformOrigin = 318.4 - bodyData.transX + 'px 532.36px';
        first_left_arm.style.transformOrigin = 268.35 - bodyData.transX + 'px 461.8px';
        right_arm.style.transformOrigin = 402.76 + bodyData.transX + 'px 532.36px';
        first_right_arm.style.transformOrigin = 452.81 + bodyData.transX + 'px 461.8px';
        crossbar.style.display = 'block';
        // Init game engine functions
        rotateElems = rotateElems_2;
        rotateElemsEnd = rotateElemsEnd_2;
        backElems = backElems_2;
        stopEng = stopEng_2;
    } else if (openWindow == 3) {
        // Lvl in main wind
        lvlMain.innerHTML = legsData.legsLvlNum; 
        bodyIconMain.style.display = 'none'; legsIconMain.style.display = 'block';
        // expProgress.value = legsData.legsExpNum; expProgress.max = legsData.legsMaxExpNum;
        expProgress.style.width = legsData.legsExpNum * 67 / legsData.legsMaxExpNum + '%';
        // Inventory menu
        inventaryDumb.style.display = 'none'; inventaryBike.style.display = 'block'; 
        stimsInvent = document.getElementById('stims-bike');
        menuWinds[1].setAttribute("viewBox", "0 0 2450 1280");
        // Comp name in main wind
        if (langNum == 1) compNameWord = 'Подтяг.'; 
        else if (langNum == 2) compNameWord = 'Pull-ups'; 
        else compNameWord = 'Squats'; 
        compNameMain.innerHTML = compNameWord;
        // Точки transform-origin
        left_legs.style.transformOrigin = '343px 885.36px'; first_left_legs.style.transformOrigin = '232.46px 853.56px'; 
        right_legs.style.transformOrigin = '378.16px 885.36px'; first_right_legs.style.transformOrigin = '488.71px 853.56px'; 
        // Foot number
        if (legsData.legsLvlNum >= 30) footNum = 29;
        else footNum = legsData.legsLvlNum - 1; 
        // Init game engine functions
        rotateElems = rotateElems_3;
        rotateElemsEnd = rotateElemsEnd_3;
        backElems = backElems_3;
        stopEng = stopEng_3;
    } // Event listenet stimsInvent 
    stimsInvent.addEventListener(clickUpEvent, stimsInventFunc);
    // Show char elem
    initElem('block');
    // Select location btn on
    btns_trans[openWindow].style.opacity = 0.7;
    // Mes rate count **************************************************************************************************
    // if (!mesData.mesRateFlag) {
    //     countShowMesRate += 1; window.localStorage.setItem("countShowMesRateKey1", countShowMesRate); 
    // } 
    // Interstitial count and show interstitial ad *******************************************************************
    intrstCount += 1; console.log('intrstCount = ' + intrstCount);
}
showLocation(); 


// Hide location, char and other elements and data in main window ***************************************************************************************
function hideLocation() {
    if (transNum >= 2 && openWindow <= 1) {
        // Остановка интервала появления птицы
        if (showBirdIntvl !== null) {
            cancelAnimationFrame(showBirdIntvl); showBirdIntvl = null; 
        } // Остановка интервала зелий  
        if (timerData.useStimNum !== null && downTimerIntrvl !== null) {
            cancelAnimationFrame(downTimerIntrvl); downTimerIntrvl = null;
        } 
    } // Stop engine
    stopEng();
    // Hide char elem
    initElem('none');
    // Select location btn off
    btns_trans[openWindow].style.opacity = 0.4;
    // Hide elements in comp loc
    if (openWindow > 1) {
        mainElemComp.style.display = 'none'; 
        backgrMain[4].style.display = 'none'; backgrInvent[4].style.display = 'none'; backgrShop[4].style.display = 'none';
        if (openWindow == 2) {
            pullupBtnCount = 300; transPullupTimer.innerHTML = pullupBtnCount;
            window.localStorage.setItem("pullupTransKey1", pullupBtnCount);
            transPullupIcon.style.display = 'none'; transPullupTimer.style.display = 'block';
            crossbar.style.display = 'none';
        } else if (openWindow == 3) {
            squatBtnCount = 300; transSquatTimer.innerHTML = squatBtnCount;
            window.localStorage.setItem("squatTransKey1", squatBtnCount);
            transSquatIcon.style.display = 'none'; transSquatTimer.style.display = 'block';
        } // Start transBtnTimer
        if (compBtnTimerIntvl == null) transBtnTimer();
    } // Hide elements in exerc loc
    else if (openWindow == 1) bike_speeds.style.display = 'none';
}



// Event listener click game ****************************************************************************************************************************
clickArea.addEventListener(clickDownEvent, clickStart); 
clickArea.addEventListener(clickUpEvent, clickEnd); 
function clickStart() {
    rotateElems();
}
function clickEnd() {
    rotateElemsEnd();
}


