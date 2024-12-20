"use strict";
window["GD_OPTIONS"] = {
	"gameId": "fbc0584bbcd44afbad26cf490688fa45",
	"onEvent": function(event) {
		switch (event.name) {
			case "SDK_READY":
				gdsdk.preloadAd('rewarded');
				break;
			case "SDK_GAME_START":
				// advertisement done, resume game logic and unmute audio
				onResume();
				break;
			case "SDK_GAME_PAUSE":
				// pause game logic / mute audio
				onPause();
				break;
			case "SDK_GDPR_TRACKING":
				// this event is triggered when your user doesn't want to be tracked
				break;
			case "SDK_GDPR_TARGETING":
				// this event is triggered when your user doesn't want personalised targeting of ads and such
				break;
			// STARTED ADS
			case "STARTED":
				showAdFlag = true; 
                intrstCount = 0;
				break;
			// CLOSE ADS
			case "ALL_ADS_COMPLETED":
				showAdFlag = false;
				if (adNameFlag == 'reward') {
					gdsdk.preloadAd('rewarded');
					// Close mesReward
                    if (mesReward.style.display == 'block') {
                        slowHideMes(mesReward); rewardPics[rewardNum].style.display = 'none'; rewardGroupMes.style.display = 'none'; 
                        continueEngine(); 
                    } 
				} if (soundData.musicFlag == 'on' && electroTreck[soundData.treckNum].paused) electroTreck[soundData.treckNum].play();
				break;
			// REWARDED REWARD
			case "SDK_REWARDED_WATCH_COMPLETE":
				console.log('SDK_REWARDED_WATCH_COMPLETE!');
				// Money or stim reward from birds
                if (mesReward.style.display == 'block') {
                    if (rewardNum == 9) {
                        moneyNum += moneyRewNum; window.localStorage.setItem("moneyNumKey5", moneyNum); 
                        moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum));
                    } else {
                        // Add stim quant
                        stimNum[rewardNum] += 1; window.localStorage.setItem("stimNumKey5", JSON.stringify(stimNum));
                        quantStim[rewardNum].innerHTML = stimNum[rewardNum];
                    } 
                } // Уменьшение колич просмотров рекламы в кнопке в info shop window 
                else if (infoShopWind.style.display == 'block') {
                    purchAdsNum[selectItemNum] -= 1;
                    if (purchAdsNum[selectItemNum] <= 0) {
                        purchAdsNum[selectItemNum] = purchAdsConst[selectItemNum];
                        // Receiving money and sp 
                        if (selectItemNum < 3) { 
                            if (selectItemNum == 0) moneyNum += rewardShopMoney; 
                            else if (selectItemNum == 1) moneyNum += rewardShopMoney * 5; 
                            else if (selectItemNum == 2) moneyNum += rewardShopMoney * 10;
                            moneyQuant.innerHTML = numFormat.format(Math.round(moneyNum));
                            moneyShopQuant.innerHTML = numFormat.format(Math.round(moneyNum));
                            window.localStorage.setItem("moneyNumKey5", moneyNum);
                        } // Init item sp
                        else {
                            if (selectItemNum == 3) spNum += rewardShopSp; 
                            else if (selectItemNum == 4) spNum += rewardShopSp * 5; 
                            else if (selectItemNum == 5) spNum += rewardShopSp * 10;
                            spMenu.innerHTML = numFormat.format(Math.round(spNum));
                            spShopQuant.innerHTML = numFormat.format(Math.round(spNum));
                            window.localStorage.setItem("spNumKey5", spNum); 
                        }  
                    } numAdsInfo.innerHTML = purchAdsNum[selectItemNum] + ' times';
                    window.localStorage.setItem("purchAdsNumKey5", JSON.stringify(purchAdsNum));
                }
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
		onResume();
	} else {
		hiddenGameFlag = true;
		onPause();
	}
});

function onPause() {
	if (soundData.musicFlag == 'on') electroTreck[soundData.treckNum].pause();
    if (menuOpenNum == -1) pauseEngine();
}
function onResume() {
	if (soundData.musicFlag == 'on' && electroTreck[soundData.treckNum].paused) electroTreck[soundData.treckNum].play();
	if (menuOpenNum == -1 && startWindow.style.display !== 'block') continueEngine();
}
	
	


// HIDE LOAD WINDOW #########################################################################################################################
window.onload = function() {
	showWordsFunc();
}









