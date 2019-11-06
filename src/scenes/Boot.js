import { Scene } from 'phaser'
import wheel from '../assets/wheel.png'
import pin from '../assets/pin.png'
import logo from '../assets/logo.jpg'
import background from '../assets/background.jpg'
import coin from '../assets/coin.png'
import coin_json from '../assets/coin.json'
import blocks from '../assets/blocks_new.png'
import blocks_json from '../assets/blocks_new.json'

import color_back from '../assets/color_back.jpg'
import pulaputi_back from '../assets/pulaputi_back.jpg'
import roleta from '../assets/roleta.jpg'


export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    // this.facebook.once('startgame', this.create, this);
    // this.facebook.showLoadProgress(this);

    this.load.image('wheel', wheel)
    this.load.image('pin', pin)
    this.load.image('logo', logo)
    this.load.image('background', background)
    this.load.image('color_back', color_back)
    this.load.image('pulaputi_back', pulaputi_back)
    this.load.image('roleta', roleta)
    this.load.image('background', background)
    this.load.image('background', background)
    this.load.atlas('coin', coin, coin_json);
    this.load.atlas('blocks', blocks, blocks_json);
    // image.scale.setTo(0.1,0.1);
    // this.load.image('bomb', bomb)
    // this.load.audio('thud', [thudMp3, thudOgg])
    this.add.text(this.game.renderer.width/2.5, this.game.renderer.height/2.2, 'Loading ...').setOrigin(0)
    this.loadingBar = this.add.graphics({
        fillStyle: {color: 0xffffff}
      })
    
    this.load.on('progress', (percent)=>{
      this.loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 10)
    })
  }

  create () {
    this.scene.start('MenuScene')
    // this.scene.start('ColorGameScene')
    
  }
}