import { Scene } from 'phaser'

//roleta
import wheel from '../assets/wheel.png'
import pin from '../assets/pin.png'

import ball from '../assets/ball.png'

//color game
import blocks from '../assets/blocks_new.png'
import blocks_json from '../assets/blocks_new.json'
import blue from '../assets/blue.png'
import green from '../assets/green.png'
import pink from '../assets/pink.png'
import red from '../assets/red.png'
import white from '../assets/white.png'
import yellow from '../assets/yellow.png'

//common
import logo from '../assets/logo.jpg'
import mk from '../assets/mk.png'

import coin from '../assets/coin.png'
import coin_json from '../assets/coin.json'

//audio
import coins_sounds from '../assets/audio/Coins_Pouring_00.mp3'
import background_music from '../assets/audio/background_music.ogg'
import background_music_mp3 from '../assets/audio/background_music.mp3'

//fonts
import title_font from '../assets/font/font.png'
import title_font_fnt from '../assets/font/font.fnt'


import background from '../assets/background.jpeg'
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
    this.load.image('blue', blue)
    this.load.image('green', green)
    this.load.image('pink', pink)
    this.load.image('red', red)
    this.load.image('white', white)
    this.load.image('yellow', yellow)

    //pula puti
    this.load.image('ball', ball)

    //common
    this.load.atlas('coin', coin, coin_json)
    this.load.image('logo', logo)
    this.load.image('mk', mk)

    // //background
    this.load.image('background', background)
    // this.load.image('color_back', color_back)
    // this.load.image('pulaputi_back', pulaputi_back)
    // this.load.image('roleta', roleta)

    //audio
    this.load.audio('coins_audio', [coins_sounds])
    this.load.audio('background_music', [background_music, background_music_mp3])

    //fonts
    this.load.bitmapFont('main', title_font, title_font_fnt);

  }

  startGame(){


    this.game.player = {
      name:this.facebook.playerName, 
      credits: 0
    }

    this.game.center = {
      x:this.game.renderer.width/2,
      y: this.game.renderer.height/2
    }

    this.facebook.getData([ 'credits' ]);

    this.facebook.on('getdata', () => {   
      console.log('credits:::',this.facebook.data.get('credits'))
      if(!this.facebook.data.get('credits')){
        //first time user
        this.game.player.credits = 0;
        this.facebook.data.set('credits', 0);
      }else{
        this.game.player.credits = this.facebook.data.get('credits');
      }
       
      this.scene.start('MenuScene')
  
  }, this);
    

  

    
  }

}