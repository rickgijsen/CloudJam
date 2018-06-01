import DateManager from './DateManager';
import { print } from '../utils';

export default class Facebook {
  static initializeAsync (Game, config) {
    if (('FBInstant' in window)) {
      FBInstant.initializeAsync().then(function () {
        window.game = new Game(config);
        print(`FB Instant SDK Version: ${Facebook.getSDKVersion}`);
        this.game.ID = Facebook.playerGetID;
      });
    } else {
      window.game = new Game(config);
    }
  }

  static setLoadingProgress (progress) {
    if (('FBInstant' in window)) {
      FBInstant.setLoadingProgress(progress);
    }
  }

  static startGameAsync (callback, scope) {
    if (('FBInstant' in window)) {
      FBInstant.startGameAsync().then(() => {
        callback.call(scope);
      });
    } else {
      callback.call(scope);
    }
  }

  static quit() {
    FBInstant.quit();
  }

  static get playerGetName() {
    return FBInstant.player.getName();
  }

  static get contextType() {
    return FBInstant.context.getType();
  }

  static get playerGetID() {
    return FBInstant.player.getID();
  }

  static get playerGetPhoto() {
    return FBInstant.player.getPhoto();
  }

  static get getSDKVersion() {
    return FBInstant.getSDKVersion();
  }

  static get getPlatform() {
    return FBInstant.getPlatform();
  }

  static getSupportedAPIs() {
    return FBInstant.getSupportedAPIs();
  }

  /**
   * Set the data that needs to be saved in the Facebook database.
   *
   * @param data Array of objects with key and value pair.
   */

  static setDataAsync(pData) {
    const data = pData;
    data.lastLoggedIn = DateManager.currentTime;

    FBInstant.player.setDataAsync(data)
      .then(() => {
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Get data from the Facebook database.
   *
   * @param data Array of keys of the data you want to get.
   * @param scope Scope of the callback. It's usually 'this'.
   * @param callback Function that needs to be called after resolving the promise.
   */

  static getDataAsync(data, scope, callback) {
    FBInstant.player.getDataAsync(data)
      .then((result) => {
        callback.call(scope, result);
      });
  }

}