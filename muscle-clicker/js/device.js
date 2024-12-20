"use strict";
window["GD_OPTIONS"] = {
	"gameId": "3079dc6c6f1e46a8931f4226cd1f4d79",
	"onEvent": function(event) {
		switch (event.name) {
			case "SDK_READY":
				gdsdk.preloadAd('rewarded');
				break;
			case "SDK_GAME_START":
				// advertisement done, resume game logic and unmute audio
				if (sound == 'on' && electroSound[trackFlag].paused) electroSound[trackFlag].play();
				if (menuOpenNum == null) { 
					if (openWindow <= 1) {
						// Запуск интервала зелий
						if (timerData.useStimNum !== null && downTimerIntrvl == null) downTimerStim(); 
						// Запуск интервала появления птицы
						if (showBirdIntvl == null && birds.style.display !== 'block') showBird(); 
					} else if (openWindow == 2 && downTimerCompIntrvl == null) timerCompEnd(bodyData.bodyLvlNum, 'Pullups:');
					else if (openWindow == 3 && downTimerCompIntrvl == null) timerCompEnd(legsData.legsLvlNum, 'Squats:');
				}
				break;
			case "SDK_GAME_PAUSE":
				// pause game logic / mute audio
				if (sound == 'on') electroSound[trackFlag].pause();
				// Остановка движка
				if (openWindow == 1) stopEng();
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
				} 
				break;
			case "SDK_GDPR_TRACKING":
				// this event is triggered when your user doesn't want to be tracked
				break;
			case "SDK_GDPR_TARGETING":
				// this event is triggered when your user doesn't want personalised targeting of ads and such
				break;
			// STARTED ADS
			case "STARTED":
				showAdFlag = true; console.log('showAdFlag ' + showAdFlag);
				break;
			// CLOSE ADS
			case "ALL_ADS_COMPLETED":
				showAdFlag = false;
				if (adNameFlag == 'reward') {
					gdsdk.preloadAd('rewarded');
					if (messenges.style.display == 'block') {
						if (openWindow <= 1) {
							rewardPics.forEach(function(item) {item.style.display = 'none';}); 
							slowHideMes(mesReward);
							console.log('USER_CLOSE_REWARD_BIRD'); 
						} else if (openWindow >= 2) { 
							charData.moneyNum += Math.round(compMoneyNum * compCoef); 
							window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
							moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
							moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum));
							// Переход
							transFunc(transNum); slowHideMes(mesCompEnd);
							console.log('USER_CLOSE_REWARD_COMP');
						} 
					}
				} if (sound == 'on' && electroSound[trackFlag].paused) electroSound[trackFlag].play();
				break;
			// REWARDED REWARD
			case "SDK_REWARDED_WATCH_COMPLETE":
				console.log('SDK_REWARDED_WATCH_COMPLETE!');
				// Награда от птиц
				if (messenges.style.display == 'block') {
					if (openWindow <= 1) {
						if (rewardNum == 0) {
							charData.moneyNum += rewardMoney; 
							moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
							moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum));
						} else {
							inventData.stimInventNum[rewardNum] += 1; window.localStorage.setItem("inventDataKey1", JSON.stringify(inventData));
							stimQuantInvent[0][rewardNum].innerHTML = inventData.stimInventNum[rewardNum];
							stimQuantInvent[1][rewardNum].innerHTML = inventData.stimInventNum[rewardNum];
						} 
					} // Награда - удвоение денег на соревнованиях
					else if (openWindow >= 2) {
						charData.moneyNum += Math.round(compMoneyNum * compCoef); 
						moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum)); 
						moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum));
					} 
				} // Уменьшение колич просмотров рекламы в кнопке в info shop window 
				else if (infoShopMA.style.display == 'block') {
					watchAdsPurchNum[numPurch] -= 1; 
					if (watchAdsPurchNum[numPurch] == 0) {
						watchAdsPurchNum[numPurch] = watchAdsPurchConst[numPurch];
						// Receiving money and sp 
						if (numPurch < 3) {
							if (numPurch == 0) charData.moneyNum += rewardShopMoney; 
							else if (numPurch == 1) charData.moneyNum += rewardShopMoney * 3; 
							else if (numPurch == 2) charData.moneyNum += rewardShopMoney * 6;
							moneyMain.innerHTML = numFormat.format(Math.round(charData.moneyNum));  
							moneyShop.innerHTML = numFormat.format(Math.round(charData.moneyNum));
						} else {
							if (numPurch == 3) charData.spNum += rewardShopSp; 
							else if (numPurch == 4) charData.spNum += rewardShopSp * 3; 
							else if (numPurch == 5) charData.spNum += rewardShopSp * 6;
							statusPoints.innerHTML = charData.spNum;
							spShop.innerHTML = charData.spNum;	
						} 
					} window.localStorage.setItem("watchAdsPurchNumKey1", JSON.stringify(watchAdsPurchNum)); 
					// Show number ads 
					if (langNum == 1) {
						if (watchAdsPurchNum[numPurch] == 1 || watchAdsPurchNum[numPurch] == 5) numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' раз';
						else numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' раза';
					} else if (langNum == 2) numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' vezes';
					else numAdsShop.innerHTML = watchAdsPurchNum[numPurch] + ' times';
				} // LS
				window.localStorage.setItem("charDataKey1", JSON.stringify(charData));
				break;
		}
	},
};
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = '/main.min.js';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'gamedistribution-jssdk'));


// Banner Ads *******************************************************************************************************************************
// window.gdsdk
// .showAd(window.gdsdk.AdType.Display, { containerId: "bannerAd"})
// 	.then(() => console.info('showAd(window.gdsdk.AdType.Display) resolved.'))
// 	.catch(error => console.info(error));



// CLOSE APP ################################################################################################################################
let hiddenGameFlag = false;
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") {
		hiddenGameFlag = false;
		if (sound == 'on' && electroSound[trackFlag].paused && !showAdFlag) electroSound[trackFlag].play();
		if (menuOpenNum == null) { 
			if (openWindow <= 1) {
				// Запуск интервала зелий
				if (timerData.useStimNum !== null && downTimerIntrvl == null) downTimerStim(); 
				// Запуск интервала появления птицы
				if (showBirdIntvl == null && birds.style.display !== 'block') showBird(); 
			} else if (openWindow == 2 && downTimerCompIntrvl == null) timerCompEnd(bodyData.bodyLvlNum, 'Pullups:');
			else if (openWindow == 3 && downTimerCompIntrvl == null) timerCompEnd(legsData.legsLvlNum, 'Squats:');
		}
	} else {
		hiddenGameFlag = true;
		if (sound == 'on') electroSound[trackFlag].pause();
		// Остановка движка
		if (openWindow == 1) stopEng();
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
		} 
	}
});

