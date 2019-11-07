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
var rounds, degrees, wheel_tween
var total_amount = 2500


export default class RoletaScene extends Scene {
  constructor () {
    super({ key: 'RoletaScene' })
  }

  
  create () {

    this.facebook.loadPlayerPhoto(this, 'player').once('photocomplete', this.addPlayerPhoto, this);
    this.add.text(this.game.renderer.width/2, this.game.renderer.height/4, this.facebook.playerName).setOrigin(0.5);
    this.facebook.openInvite('Hello, come play with me')
    
    // this.add.image(0,0,'color_back').setOrigin(0).setScale(0.4).setDepth(0)
    this.canSpin = true;
    this.hold = false
    this.wheel = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "wheel");
    this.pin = this.add.sprite(this.game.config.width / 2, this.game.config.height / 3.7, "pin");    
    this.pin.setScale(0.025)

    this.spin_coin = this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
    this.coin = this.add.sprite(30, 30, 'coin').setScale(0.5)

    this.total_coins = this.add.text(45, 20, total_amount)
    this.exit = this.add.text(this.game.renderer.width - 50, 20, 'Exit')
    this.winnings = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "").setOrigin(0.5);
    
    this.wheel.setInteractive()
    this.wheel.on("pointerup", this.spinWheel, this);
    this.wheel.on("pointerdown", this.holdWheel, this);

    this.exit.setInteractive();
    this.exit.on("pointerup", ()=>{
      this.scene.start('MenuScene')
    });

  //   var tween_winning = this.tweens.add({
  //     targets: [ this.winnings],
  //     x: '+=600',
  //     y: '+=200',
  //     duration: 4000,
  //     ease: 'Power3'
  // });
    

  }

  update (time, delta) {
    if(this.hold){
      this.wheel.rotation = Math.atan2(this.input.y - this.wheel.y, this.input.x - this.wheel.x);
      // this.pin.angle -= 2;
    }

    if(!this.canSpin){
      this.pin.angle -=5
      if(this.pin.angle < -15){
        this.pin.angle = -5
      }
    }
    
  }

  addPlayerPhoto (key)
    {
        this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, key).setScale(0.1);
        
    }

  holdWheel(){
    if(this.canSpin){
      this.hold = true;
      this.winnings.text = ""
    }
    
  }

  spinWheel(){
    this.total_coins.text = total_amount -= 500
    this.hold = false
    this.coin.play("coin_animation")
    if(this.canSpin){
      
      rounds = Phaser.Math.Between(5, 20);
      degrees = Phaser.Math.Between(0, 360);
      this.canSpin = false;
      var prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));
      var tween = this.tweens
      wheel_tween = this.tweens.add({
        targets: [this.wheel],
        angle: 360 * rounds + degrees,
        duration: gameOptions.rotationTime,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete: function(tween){
            // player can spin again
            this.canSpin = true;
            this.pin.angle = 0;
            this.winnings.text = gameOptions.slicePrizes[prize].name
            this.coin.anims.stop()
            var winnings = this.winnings
            var game = this.game
            var total_coins = this.total_coins
          //   this.tweens.add({
          //     targets: [ this.winnings],
          //     x: '-=140',
          //     y: '-=200',
          //     duration: 3000,
          //     ease: 'Power3',
          //     delay: 1000,
          //     onComplete:function (tween){
          //       console.log('oncomplete')
          //       winnings.text ="",
          //       winnings.x = game.config.width / 2 
          //       winnings.y = game.config.height / 2
          //       total_coins.text = total_amount += gameOptions.slicePrizes[prize].value
          //     }
          // });
              this.tweens.add({
                targets: this.cameras.main,
                props: {
                    zoom: { value: 2.5, duration: 2000, ease: 'Sine.easeInOut' },
                    rotation: { value: 10, duration: 1000, ease: 'Cubic.easeInOut' }
                },
                yoyo: true,
                onComplete:function(tween){
                  winnings.text ="",
                winnings.x = game.config.width / 2 
                winnings.y = game.config.height / 2
                total_coins.text = total_amount += gameOptions.slicePrizes[prize].value
                  // tweens.add({
                  //       targets: [ this.winnings],
                  //       x: '-=140',
                  //       y: '-=200',
                  //       duration: 3000,
                  //       ease: 'Power3',
                  //       delay: 1000,
                  //       onComplete:function (tween){
                  //         console.log('oncomplete')
                  //         winnings.text ="",
                  //         winnings.x = game.config.width / 2 
                  //         winnings.y = game.config.height / 2
                  //         total_coins.text = total_amount += gameOptions.slicePrizes[prize].value
                  //       }
                  //   });
                }
            });
        }
    });
      
    }
  }

  
}