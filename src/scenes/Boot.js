import { Scene } from 'phaser'

//roleta
import wheel from '../assets/wheel.png'
import pin from '../assets/pin.png'

//color game
import blocks from '../assets/blocks_new.png'
import blocks_json from '../assets/blocks_new.json'

//common
import logo from '../assets/logo.jpg'
import mk from '../assets/mk.png'

import coin from '../assets/coin.png'
import coin_json from '../assets/coin.json'

//audio
import coins_sounds from '../assets/audio/Coins_Pouring_00.mp3'
import background_music from '../assets/audio/background_music.ogg'

// import background from '../assets/background.jpg'
// import color_back from '../assets/color_back.jpg'
// import pulaputi_back from '../assets/pulaputi_back.jpg'
// import roleta from '../assets/roleta.jpg'


export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.facebook.once('startgame', this.startGame, this);
    this.facebook.showLoadProgress(this);

    //roleta game
    this.load.image('wheel', wheel)
    this.load.image('pin', pin)

    //color game
    this.load.atlas('blocks', blocks, blocks_json);

    //common
    this.load.atlas('coin', coin, coin_json)
    this.load.image('logo', logo)
    this.load.image('mk', mk)

    // //background
    // this.load.image('background', background)
    // this.load.image('color_back', color_back)
    // this.load.image('pulaputi_back', pulaputi_back)
    // this.load.image('roleta', roleta)

    //audio
    this.load.audio('coins_audio', [coins_sounds])
    this.load.audio('background_music', [background_music])

  }

  startGame(){
    this.game.player = {
      name:this.facebook.playerName, 
      credits:2500
    }

    this.game.center = {
      x:this.game.renderer.width/2,
      y: this.game.renderer.height/2
    }
    this.scene.start('MenuScene')
  }

}