let azAdWrapper;
const sgSdk = (function () {
  window['console']['log'] = () => {};
  let config;
  let adPlaying = false;
	let focused = false;
  let audioContext;

  function initialize(moduleArray, _config, callBack) {
    config = _config;
    const getCurrentLanguage = (supportedLanguages) => {
      // ?lang=en
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop)
      });
      if (params.lang) {
          return params.lang;
      }
      let lang = (navigator.language || navigator.userLanguage).substr(0, 2);

      if (supportedLanguages.indexOf(lang) === -1) {
        lang = 'en';
      }

      return lang;
    };
    const settings = {
      config: {
        rewarded: {
          enabled: true,
        },
        env: {
          locale: getCurrentLanguage(config.supportedLanguages),
        },
        user: {
          avatar: "",
          avatarBase64: "",
          name: "Fake User",
          userId: "1234"
        }
      },
    };
    var integrationVars =  window['_azerionIntegration'];

    if (window.hasOwnProperty('fbrqSA') && window['fbrqSA'] === true) {
      h5branding.Utils.ASSET_LOCATION = 'assets/';
    }

    h5branding.SplashLoader.getInstance({
      gameId: integrationVars.gdId,
      gameName: document.title,
      gameTitle: document.title,
      libs: [],
      version: '1.0',
    }).create()
      .then(() => {
        azAdWrapper = new h5ads.AdWrapper(integrationVars.advType, integrationVars.gdId);

        callBack(null, settings, sgSdk);
      })
      .catch((e) => {
        console.error('h5branding load loaded', e);
      });
  }

  function trigger(key, data, binder) {
    // console.log('trigger', key, data, binder);
    switch (key) {
      case 'restore':
        restore(data, binder);
        break;
      case 'save':
        save(data, binder);
        break;

      case 'loading.completed':
        loadingComplete(data, binder);
        break;

      case 'loading.update':
        loadingUpdate(data, binder);
        break;

      case 'levelStart':
        levelStart(data, binder);
        break;

      case 'gameTracking':
      case 'start':
      case 'levelFinish':
        nothing(data, binder);
        break;

      case 'gameOver':
      case 'beforePlayButtonDisplay':
      case 'playButtonPressed':
        callbackCall(data, binder);
        break;

      case "interstitialAd":
        showAD(data, binder);
        break;

      case 'rewardedAd':
        showADRewarded(data, binder);
        break;
      case 'moreGames':
        moreGames();
        break;
      default:
        break;
    }
  }
  function moreGames() {
    h5branding.Branding.openCampaignLink(document.title, 'more_games');
  }

  function loadingUpdate(data, binder) {
    h5branding.SplashLoader.getInstance().setLoadProgress(data.progressPercentage);
  }

  function loadingComplete(data, binder) {
    addListenerAdWrapper();

    h5branding.SplashLoader.getInstance().setLoadProgress(100);
    h5branding.SplashLoader.getInstance().setButtonCallback(() => {
        h5branding.SplashLoader.getInstance().destroy();
        AzerionGameEvents.sendPortalEvent('SPLASH_PLAY');
        showAD({callback: function() {
          data.callback.call(binder);
          if (config.runGame) {
            config.runGame();
          }
        }}, binder)
    });

    addGameEvents();
  }

  function nothing(data, binder) {
    // we dont use this data for now
  }

  function restore(data, binder) {
    data.callback.call(binder, null, localStorage.getItem('cc3' + data.key));
  }

  function save(data, binder) {
    localStorage.setItem('cc3' + data.key, data.value);
    if (data.callBack) {
      data.callback.call(binder);
    }
  }

  function levelStart(data, binder) {
    // we dont use this data for now
  }

  function callbackCall(data, binder) {
    if (data.callback) {
      data.callback.call(binder);
    }
  }

  function addListenerAdWrapper() {
    azAdWrapper.on(h5ads.AdEvents.CONTENT_PAUSED, () => {
      console.log('CONTENT_PAUSED');
      pause();
      adPlaying = true;
    });

    azAdWrapper.on(h5ads.AdEvents.CONTENT_RESUMED, () => {
      console.log('CONTENT_RESUMED');
      adFinish();
    });
  }

  function addGameEvents() { //only for phaser 2
    focused = true;
    window.game.stage.disableVisibilityChange = true;
    window.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    Phaser.Stage.prototype.visibilityChange = visibilityChange;

    window.game.onBlur.add(onBlur);
    window.game.onFocus.add(onFocus);
    window.game.onPause.add(onPause);
    window.game.onResume.add(onResume);

    audioContext = window.game.sound.context;
    audioContext.onstatechange = (event) => {
        if ((isAdPlaying() === true || focused === false) && audioContext.state === 'running') {
            audioContext.suspend();
        }
    };

    if (!window.game.scale.fullScreenScaleMode) {
      window.game.scale.fullScreenScaleMode = window.game.scale.scaleMode;
    }
    // window.addEventListener("pointerdown", () => {
    //   console.error('startFullScreen');
    //   window.game.scale.startFullScreen(true);
    // });
  }
  //ovveride internal method cuz if playing rewarded ad and switch tabs music will start playing behind ad
  function visibilityChange(event) {
    if (event.type === 'pagehide' || event.type === 'blur')
    {
      window.game.onBlur.dispatch(event);
    }
    else if (event.type === 'pageshow' || event.type === 'focus')
    {
      window.game.onFocus.dispatch(event);
    }
  }

  function onPause() {
    // window.game.paused = true;
    //for update resize when game paused
    window.game.time.gamePaused();
    // window.game.sound.setMute();
    audioContext.suspend();
  }

  function onResume() {
    // window.game.paused = false;
    //for update resize when game paused
    window.game.input.reset();
    window.game.time.gameResumed();
    // window.game.sound.unsetMute();
    audioContext.resume();
  }

  function pause() {
    window.game.onPause.dispatch();
  }

  function resume() {
    if (focused === true) {
      window.game.onResume.dispatch();
    }
  }

  function onBlur() {
    focused = false;
    pause();
  }

  function onFocus() {
    focused = true;
    if (adPlaying === false) {
        resume();
    }
  }

  function adStart() {
    showLoader();
    adPlaying = true;
  }

  function adFinish() {
    window.focus();
    adPlaying = false;
    hideLoader();
    resume();
  }

  function showLoader() {
    let loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
  }

  function hideLoader() {
    let loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
  }

  function showAD(data, binder) {
    adStart();

    azAdWrapper.once(h5ads.AdEvents.CONTENT_RESUMED, () => {
      console.log('DEBUG: onAdComplete');
      data.callback.call(binder);
    });
    azAdWrapper.showAd(h5ads.AdType.interstitial);
  }

  function showADRewarded(data, binder) {
    adStart();

    let succeed = false;
    azAdWrapper.once(h5ads.AdEvents.AD_REWARDED, () => {
      succeed = true;
    });

    azAdWrapper.once(h5ads.AdEvents.CONTENT_RESUMED, () => {
      console.log('DEBUG: rewarded onAdComplete');
      azAdWrapper.preloadAd(h5ads.AdType.rewarded);
      data.callback.call(binder, succeed);
    });
    azAdWrapper.showAd(h5ads.AdType.rewarded);
  }

  function isAdPlaying() {
    return adPlaying;
  }

  return {
    initialize,
    trigger,
    isAdPlaying
  };
}());
;var AzerionGameEvents = (function () {
    function AzerionGameEvents() {
    }

    AzerionGameEvents.eventNames = {
        "SPLASH_PLAY": {
            "eventName": "click_splash_play_btn"
        },
        "SELECT_LEVEL": {
            "eventName": "click_level"
        },
        "GET_MORE_COINS": {
            "eventName": "click_get_more_coins"
        },
        "BUY_LIFE": {
            "eventName": "click_buy_a_life"
        },
        "MATCH": {
            "eventName": "click_matching_cookies"
        },
        "SELECT_BOOSTER": {
            "eventName": "click_booster"
        },
        "SELECT_HOME": {
            "eventName": "click_home_from_level"
        },
        "GET_MORE_MOVES": {
            "eventName": "click_get_more_moves_in_level"
        },
        "BUY_MOVES": {
            "eventName": "click_buy_moves_on_gameover"
        },
        "SPIN_ON_FAIL": {
            "eventName": "click_spin_for_moves_on_gameover"
        },
        "REPLAY_ON_GAMEOVER": {
            "eventName": "click_replay_on_gameover"
        },
        "CONTINUE": {
            "eventName": "click_continue_on_game_win"
        },
        "DOUBLE": {
            "eventName": "click_double_rewards_on_game_win"
        }
    }

    AzerionGameEvents.getBoosterEventName = function (boosterNr) {
        let boosterName = 'click_booster'
        switch(boosterNr) {
            case 1:
                boosterName = `${boosterName}_swap`;
                break;
            case 2:
                boosterName = `${boosterName}_wand`;
                break;
            case 3:
                boosterName = `${boosterName}_horizontal_line`;
                break;
            case 4:
                boosterName = `${boosterName}_vertical_line`;
                break;
            case 5:
                boosterName = `${boosterName}_extra_moves_1`;
                break;
            case 6:
                boosterName = `${boosterName}_extra_moves_2`;
                break;
            case 7:
                boosterName = `${boosterName}_random_lines`;
                break;
            case 8:
                boosterName = `${boosterName}_color_bomb`;
                break;
            case 9:
                boosterName = `${boosterName}_cross`;
                break;
            default:
                break
        }
        return {eventName: boosterName};
    }
    AzerionGameEvents.sendPortalEvent = function (eventName, data) {
        //these are the events we are sending for Brigitte
        if (window.hasOwnProperty('gdsdk')) {
            try {
                const level = data?.level ? data.level : 1;
                let fullEventName = AzerionGameEvents.eventNames[eventName];
                const boosterNr = data?.boosterNr ? data.boosterNr : null;
                if(eventName === 'SELECT_BOOSTER'){
                    fullEventName = AzerionGameEvents.getBoosterEventName(boosterNr)
                }
                console.log('DEBUG: sending events for Brigitte', eventName, level, fullEventName);
                window.gdsdk.sendEvent({
                    eventName: 'game_event',
                    data: {level: level, event: 'brigitte_game_event', score: 0, brgGameEvent: fullEventName.eventName}
                });
            } catch (e) {
                console.log(`Could not send Lagged event: ${e}`);
            }
        }
    }
    return AzerionGameEvents;
}());

