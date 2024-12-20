var azAdWrapper;
var sgSdk = function () {
	// window.console.log = () => {};
	var config;
	var pauseGame;
	var resumeGame;
	var runGame;

	const getUrlParams = (query) => {
		let value = null;
		try {
			const urlParams = new URLSearchParams(window.location.search);
			value = urlParams.get(query);
		} catch (error) {
			console.log('Could not get url parameters : ', error);
		}
		return value;
	}
	
	const getLanguageFromURL = () => {
		return getUrlParams('lang');
	}

	let getCurrentLanguage = () => {
		var supportedLanguages = ["en", "de", "es", "fr", "it", "pt", "ru", "tr", "nl", "pl", "vi", "hi", "ja"];
		var lang = getLanguageFromURL() ? getLanguageFromURL() : (navigator.language || navigator.userLanguage);

		if(lang.indexOf('-') !== -1) {
			lang = lang.split('-')[0];
		}

		if(supportedLanguages.indexOf(lang) === -1) {
			lang = supportedLanguages[0];
		}

		return lang;
	}
	async function initialize(moduleArray, _config, callBack) {
		config = _config;
		pauseGame = config.freezeGame;
		resumeGame = config.unfreezeGame;
		runGame = config.runGame;
		var settings = {
			config: {
				rewarded: {
					enabled: true
				},
				env: {
					locale: getCurrentLanguage()
				}
			}
		};
		// _azerionIntegrationSDK.init();		
		// await _azerionIntegrationSDK.onLoadStart();
		// await _azerionIntegrationSDK.onLoadProgress(15);
		// await _azerionIntegrationSDK.onAdProviderLoaded().then(() => {
		// 	callBack(null, settings, sgSdk);
		// }).catch((e) => {
		// 	callBack(null, settings, sgSdk);
		// })
		callBack(null, settings, sgSdk);
		
	}

	function getLanguage() {
		return getCurrentLanguage();
	}

	function trigger(key, data, binder) {
		switch (key) {
			case "init":
				init(data, binder);
				break;
			case "loadProgress":
				loadProgress(data, binder);
				break;
			case "loadComplete":
				loadComplete(data, binder);
				break;

			case "restore":
				restore(data, binder);
				break;

			case "loading.completed":
				loadingComplete(data, binder);
				break;

			case "loading.update":
				loadProgress(data, binder);
				loadingUpdate(data, binder);
				break;

			case "levelStart":
				levelStart(data, binder);
				break;

			case "gameTracking":
			case "start":
			case "levelFinish":
				nothing(data, binder);
				break;

			case "save":
				save(data, binder);
				break;

			case "beforePlayButtonDisplay":
			case "playButtonPressed":
				callbackCall(data, binder);
				break;

			case 'interstitialAd':
				interstitialAd(data, binder)
				break;

			case "rewardedAd":
				rewardedAd(data, binder);
				break;

			case "gameOver":
				gameOver(data, binder);
				break;

			default:
				break;
		}
	}

	async function init(data, binder) {
		h5branding.Branding.analyticsEnabled = false;//ENABLE_ANALYTICS;				
		window._azerionIntegrationSDK.addListeners(pauseGame, resumeGame);	
		data.callback.call(binder);
	}

	function loadProgress(data) {
		let progress = Math.min(80, data.progressPercentage);
		_azerionIntegrationSDK.onLoadProgress(progress)
	}

	async function loadComplete(data, binder) {
		console.log('[AD_HANDLER] loadComplete');
		_azerionIntegrationSDK.onLoadProgress(100)

		await _azerionIntegrationSDK.onLoadComplete();
		await _azerionIntegrationSDK.showInterstitialAd();
		data.callback.call(binder);
	}

	function gameOver(data, binder) {
		data.callback.call(binder);
	}

	function nothing(data) {
		// we dont use this data for now
	};

	async function restore(data, binder) {
		var item = null;	
		item = await _azerionIntegrationSDK.getData(data.key);
		data.callback.call(binder, null, item);
	}

	function loadingUpdate(data, binder) {
		// we dont use this data for now
	}

	async function loadingComplete(data, binder) {
		// we dont use this data for now
		_azerionIntegrationSDK.onLoadProgress(100)

		await _azerionIntegrationSDK.onLoadComplete();
		await _azerionIntegrationSDK.showInterstitialAd();		
		_azerionIntegrationSDK.preloadAd('rewarded');
		runGame()
		data.callback.call(binder, null);
	}

	function levelStart(data, binder) {
		// we dont use this data for now
	}

	async function save(data, binder) {
		let saveData = {
			score: 0,
			key: data.key,
			data: data.value
		}
		item = await _azerionIntegrationSDK.setData(saveData);
		data.callback.call(binder);
	}

	function callbackCall(data, binder) {
		data.callback.call(binder);
	}

	async function interstitialAd(data, binder) {
		await _azerionIntegrationSDK.showInterstitialAd();
		data.callback.call(binder);
	}

	async function rewardedAd(data, binder) {
		let succeed = false;

		succeed = await _azerionIntegrationSDK.showRewardedAd();
		// data.callback.call(binder);
		data.callback.call(binder, succeed);
	}

	return {
		initialize: initialize,
		trigger: trigger,
		getLanguage: getLanguage,
		GA: {
			GameAnalytics: {
				setCustomDimension01: nothing,
				addDesignEvent: nothing,
			}
		}
	}

}();

async function _loadGame() {
	// init the sdk
	window._azerionIntegrationSDK.init();		
	await window._azerionIntegrationSDK.onLoadStart();
	await _azerionIntegrationSDK.onLoadProgress(15);
  
	if (window.hasOwnProperty('fbrqSA') && window['fbrqSA'] === true) {
	  h5branding.Utils.ASSET_LOCATION = 'assets/';
	}

	if (!window._azerionIntegrationSDK.isAdProviderLoaded()) {
        console.log(`wait because ad provider not loaded ${_azerionIntegrationSDK.isAdProviderLoaded()}`)
        await _azerionIntegrationSDK.onAdProviderLoaded();
    }   

	initGame();
  }