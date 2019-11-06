import {Scene} from 'phaser'

var total_amount = 2500
var x = 0
var y = 0
var cells = []
var box_no = 250
var bet_pula = 0
var bet_puti = 0
var message = ""
var play = false;
export default class PulaPutiScene extends Scene {

    /**
     * 
     */
    constructor () {
        super({ key: 'PulaPutiScene' })
      }

      /**
       * 
       */
    create(){

        // this.add.image(0,0,'pulaputi_back').setOrigin(0).setScale(0.68).setDepth(0)

        this.spin_coin = this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
        this.coin = this.add.sprite(30, 30, 'coin').setScale(0.5)
        this.exit = this.add.text(this.game.renderer.width - 50, 20, 'Exit')

        this.total_coins = this.add.text(45, 20, total_amount)
        this.add.grid(10, 60, this.game.renderer.width-20, this.game.renderer.height-250, 15, 15, 0xff0000).setAltFillStyle(0xffffff).setOutlineStyle().setOrigin(0);

        this.initialTime = 10;
        this.countdown = this.add.text(this.game.renderer.width/2, 20, this.formatTime(this.initialTime));
        var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.countdown_message = this.add.text(this.game.renderer.width/2, 150, message, {fontSize:'78px', color:0xffffff}).setDepth(2)


        var pula = this.add.rectangle(10, 370, (this.game.renderer.width-20)/2,100, 0xff0000).setOrigin(0)
        this.bet_pula_text = this.add.text(75, 410,bet_pula)
        var puti = this.add.rectangle(175, 370, (this.game.renderer.width-20)/2,100, 0xffffff).setOrigin(0)
        this.bet_puti_text = this.add.text(240, 410,bet_puti,{color:0xffffff})

        // for(var i=0; i<box_no; i++){
        //     cells.push(this.add.rectangle(10 + x, 60, 15, 15).setStrokeStyle(3, 0xf8fc05).setOrigin(0))
        // }

        this.exit.setInteractive()
        this.exit.on("pointerup", ()=>{
            this.scene.start('MenuScene')
          });

        pula.setInteractive()
        pula.on('pointerover', ()=>{
            pula.setStrokeStyle(5, 0x000000)
        })
        pula.on('pointerout', ()=>{
            pula.setStrokeStyle()
        })

        pula.on('pointerup', ()=>{
            this.total_coins.text = total_amount -= 100
            this.bet_pula_text.text = bet_pula+=100
        })

        puti.setInteractive()
        puti.on('pointerover', ()=>{
            puti.setStrokeStyle(5, 0x000000)
        })
        puti.on('pointerout', ()=>{
            puti.setStrokeStyle()
        })
        puti.on('pointerup', ()=>{
            this.total_coins.text = total_amount -= 100
            this.bet_puti_text.text = bet_puti+=100
        })
    }
   
    /**
     * 
     */
    update(){
        if(play){            
            if(cells.length > 1){
                cells.forEach(cell=>{
                    cell.x = (Phaser.Math.Between(0,21) * 15) +10
                    cell.y = (Phaser.Math.Between(0,19) * 15) +60
                    this.winning = cell;
                })
                var active = cells.shift()
                active.destroy()
            }else{
                this.initialTime=10
                play = false
                var color_result=(this.winning.x + this.winning.y) % 2;
               
                if(color_result){                                        
                    total_amount += (bet_puti*2)
                }else{                    
                    total_amount += (bet_pula*2)
                }
                this.bet_puti_text.text = 0
                bet_puti=0
                this.bet_pula_text.text = 0
                bet_pula=0
                this.total_coins.setText(total_amount)               
            }
        }
    }

    /**
     * 
     * @param {*} seconds 
     */
    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent (){
        if(this.initialTime <=5){
            this.countdown_message.text = this.initialTime
            if(this.initialTime <=0){
                this.countdown_message.text = ''
                play = true  
                if(cells.length<=1)   
                for(var i=0; i<box_no; i++){
                    cells.push(this.add.rectangle(10 + x, 60, 15, 15).setStrokeStyle(3, 0xf8fc05).setOrigin(0))
                }           
            }
        }
        
        if(this.initialTime >=0){
             // One second
            this.countdown.setText(this.formatTime(this.initialTime));
        }

        this.initialTime -= 1;
        
    }

}