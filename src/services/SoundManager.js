import Phaser from 'phaser';

export default class SoundManager {
  constructor(game) {
    this.game = game;

    this.soundList = [];
  }

  addSound(key, loop = false, allowMultiple = false) {
    const sound = new Phaser.Sound(this.game, key, 1, loop);
    sound.allowMultiple = allowMultiple;
    this.soundList.push(sound);
  }

  getSound(key) {
    return this.soundList.find(x => x.key === key);
  }

  getSoundRandom(baseKey) {
    var sounds = [];
    sounds = this.soundList.filter(x => x.key.indexOf(baseKey) !== -1);
    return sounds[Math.floor(Math.random() * sounds.length)];
  }

  playSound(key) {
    this.getSound(key).play()
  }

  playSoundRandom(baseKey)
  {
    var sounds = [];
    sounds = this.soundList.filter(x => x.key.indexOf(baseKey) !== -1);
    sounds[Math.floor(Math.random() * sounds.length)].play();
  }
}
