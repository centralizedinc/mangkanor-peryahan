import { Scene } from 'phaser'

var gameOptions = {
  slices: 24,
  slicePrizes: [
    
    {name:"Bankrupt", value:0}, 
    {name:"Spin Again", value:0},
    {name:"1,000", value:1000},
    {name:"3,000", value:3000},
    {name:"Loose A Turn", value:0},
    {name:"White", value:0},
    {name:"7,500", value:7500},
    {name:"3,500", value:3500},
    {name:"2,000", value:2000},
    {name:"0", value:0},
    {name:"Bankrupt", value:0},
    {name:"1,000", value:1000},
    {name:"Amount", value:0},
    {name:"White", value:0}, 
    {name:"2,000", value:2000}, 
    {name:"1,000", value:1000},
    {name:"2,000", value:2000},
    {name:"1,250", value:1250},
    {name:"5,000", value:5000},
    {name:"2,500", value:2500}, 
    {name:"7,500", value:7500}, 
    {name:"10,000", value:10000}, 
    {name:"4,000", value:4000}, 
    {name:"3,500", value:3500}
  ],
  rotationTime: 10000
}
var rounds, degrees


export default class RoletaScene extends Scene {
  constructor () {
    super({ key: 'RoletaScene' })
  }

  
  create () {
    this.cameras.main.fadeIn(500);
    // intial state
    this.canSpin = true;
    this.hold = false

    // set background color
    this.cameras.main.setBackgroundColor('#640D0D')

    //credits
    this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
    this.add.sprite(80, 50, 'coin').setScale(0.3).play("coin_animation")
    this.total_coins = this.add.text(90,50,this.game.player.credits).setOrigin(0,0.5)
    this.credit = this.add.text(90,70,'', {fontSize:'12px'}).setOrigin(0,0.5)

    //player
    this.add.image(50,50, this.game.player.avatar).setScale(0.12)
    this.add.text(50,80,this.game.player.name, {fontSize:'10px'}).setOrigin(0.5)

    
    this.wheel = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "wheel");
    this.pin = this.add.sprite(this.game.center.x, this.game.center.y-130, "pin");    
    this.pin.setScale(0.025)
    
    this.exit = this.add.text(this.game.renderer.width - 50, 50, 'Exit')
    this.winnings = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "").setOrigin(0.5);
    
    this.wheel.setInteractive()
    this.wheel.on("pointerup", this.spinWheel, this);
    this.wheel.on("pointerdown", this.holdWheel, this);

    this.exit.setInteractive();
    this.exit.on("pointerup", ()=>{
      this.scene.start('MenuScene')
    });



    // camera zoom animation
    this.cam_zoom = this.tweens.add({
      targets: this.cameras.main,
      props: {
          zoom: { value: 2.5, duration: 2000, ease: 'Sine.easeInOut' },
          rotation: { value: 10, duration: 1000, ease: 'Cubic.easeInOut' }
      },
      yoyo: true,
      paused:true,
      onComplete:()=>{
        this.credit.setText(`+ ${gameOptions.slicePrizes[this.prize].value}`);
        this.sound.add('coins_audio')
        this.sound.play('coins_audio', { volume: 0.75 })
        this.credit_anim.resume();
      }        
    });

    //credits animation
    this.credit_anim = this.tweens.add({
      targets:this.credit,
      y:60,
      duration:1000,
      paused:true,
      onComplete:()=>{
        this.credit.setText('')
        this.total_coins.text = this.game.player.credits += gameOptions.slicePrizes[this.prize].value
      }
    })
    
    //debit animation
    this.debit_anim = this.tweens.add({
      targets:this.credit,
      y:80,
      duration:1000,
      paused:true,
      onComplete:()=>{
        this.credit.setText('')
        this.total_coins.text = this.game.player.credits -= 500 
      }
    })
  }

  update (time, delta) {
    if(this.hold){
      this.wheel.rotation = Math.atan2(this.input.y - this.wheel.y, this.input.x - this.wheel.x);
    }

    if(!this.canSpin){
      this.pin.angle -=5
      if(this.pin.angle < -15){
        this.pin.angle = -5
      }
    }
    
  }

 

  holdWheel(){
    if(this.canSpin){
      this.hold = true;
      this.winnings.text = ""
    }
    
  }

  spinWheel(){
    this.credit.setText('- 500');
    this.debit_anim.resume();
    
    this.hold = false

    if(this.canSpin){      
      rounds = Phaser.Math.Between(5, 20);
      degrees = Phaser.Math.Between(0, 360);
      this.canSpin = false;
      this.prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));
      var tween = this.tweens
      this.tweens.add({
        targets: [this.wheel],
        angle: 360 * rounds + degrees,
        duration: gameOptions.rotationTime,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete: function(tween){
            // player can spin again
            this.canSpin = true;
            this.pin.angle = 0;
            this.winnings.text = gameOptions.slicePrizes[this.prize].name       
            
            this.cam_zoom.resume()
        }
    });
      
    }
  }

  
}