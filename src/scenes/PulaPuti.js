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
var resetting = false;

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

        //camera effect
        this.cameras.main.fadeIn(500);
        // set background color
        this.cameras.main.setBackgroundColor('#640D0D')

        //credits
        this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
        this.add.sprite(80, 50, 'coin').setScale(0.3).play("coin_animation")
        this.total_coins = this.add.text(90,50,this.game.player.credits).setOrigin(0,0.5)
        this.credit = this.add.text(80,70,'', {fontSize:'12px'}).setOrigin(0,0.5)

        //player
        this.add.image(50,50, this.game.player.avatar).setScale(0.12)
        this.add.text(50,80,this.game.player.name, {fontSize:'10px'}).setOrigin(0.5)

        //exit
        this.exit = this.add.text(this.game.renderer.width - 50, 50, 'Exit')
        
        //timer
        this.initialTime = 10;
        this.countdown = this.add.text(this.game.center.x, 130, this.formatTime(this.initialTime)).setOrigin(0.5);
        var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.countdown_message = this.add.text(this.game.center.x, this.game.center.y-50, message, {fontSize:'78px', color:0xffffff}).setDepth(2).setOrigin(0.5)

        //ball
        this.ball = this.physics.add.image(this.game.center.x,160, 'ball')
            .setOrigin(0.5)
            .setScale(0.06)
            .setDepth(2)
            .setCollideWorldBounds(true)
            .setBounce(0.8)
            .setVelocity(Phaser.Math.Between(-100, 100),Phaser.Math.Between(-100, 100))
            
            
        this.ball.setInteractive()        
        
        //rotate ball
        this.tweens.add({
            targets: this.ball,
            rotation: -25,
            duration: 5000,
            ease: "Linear",
            callbackScope: this,
            repeat:-1
        })
        this.physics.world.setBounds(30,50, 290, 400 )
        this.physics.pause()

        //board
        this.init_board = this.add.grid(this.game.center.x, 450, 300, 10, 25, 25, 0xff0000).setAltFillStyle(0xffffff)
        this.board = this.add.grid(this.game.center.x, 150, 300, 300, 25, 25, 0xff0000)
            .setAltFillStyle(0xffffff)
            .setOutlineStyle()
            .setOrigin(0.5,0)
            .setVisible(false)

        
        //betting board
        //pula
        var pula = this.add.rectangle(20, 490, (this.game.renderer.width-40)/2,100, 0xff0000).setOrigin(0)
        this.bet_pula_text = this.add.text(pula.x+(pula.width/2), 540,bet_pula).setOrigin(0.5)
        //puti
        var puti = this.add.rectangle(this.game.center.x, 490, (this.game.renderer.width-40)/2,100, 0xffffff).setOrigin(0)
        this.bet_puti_text = this.add.text(puti.x+(puti.width/2), 540,bet_puti,{color:0xffffff}).setOrigin(0.5)


        //winning block
        this.winning_block = this.add.rectangle(this.game.center.x, this.game.center.y-50, 100,100, 0xffffff).setOrigin(0.5).setDepth(10).setVisible(false)
        this.winning_text = this.add.text(this.game.center.x, this.game.center.y-50,'PUTI',{color:0xffffff}).setOrigin(0.5).setDepth(10).setVisible(false)

        this.winning_anim = this.add.tween({
            targets: [this.winning_block,this.winning_text],
            props:{
                scale:2
            },
            paused:true,            
            yoyo: true,
            duration: 1000,
            repeat:2,
            onComplete:()=>{
                this.winning_block.setVisible(false)
                this.winning_text.setVisible(false)
                this.reset()
            }  
        })

        //flip board animation
        this.flip_board_anim = this.add.tween({
            targets:this.init_board,
            scaleY:0.01,
            ease: 'Linear',
            duration: 300,
            repeat: 0,
            yoyo: false,
            paused:true,
            onComplete:()=>{
                this.init_board.setVisible(false)
                this.board.scaleY(0.01)
                this.board.setVisible(true)
                
                this.ball.setVisible(false)
            }
        })

        this.show_board_anim = this.add.tween({
            targets:this.board,
            scaleY:0.1,
            ease: 'Linear',
            duration: 300,
            repeat: 0,
            yoyo: false,
            paused:true,
        })

        


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
     * resetting view
     */
    reset(){
        play = false
        resetting = true;

        this.initialTime=10

        this.winning.destroy()
        
        this.ball.setVisible(true)
        this.ball.body.reset(this.game.center.x,160)
        this.ball.body.setBounce(0.5).setVelocity(Phaser.Math.Between(-100,100),Phaser.Math.Between(-100,100))

        this.physics.pause()

        this.init_board.setVisible(true)
        this.board.setVisible(false)
        
    }
    holdBall(){
        this.hold = true;
    }
    dropBall(){
        this.hold = false;
    }
    /**
     * 
     */
    update(){
        if(this.hold){
            this.ball.body.reset(this.input.x, 160)
        }
        if(play){            
            if(cells.length > 1){
                cells.forEach(cell=>{
                    cell.x = (Phaser.Math.Between(0,11) * 25) +25
                    cell.y = (Phaser.Math.Between(0,11) * 25) +150
                    this.winning = cell;
                })
                var active = cells.shift()
                active.destroy()
            }else{                
                console.log(`X: ${this.winning.x} Y: ${this.winning.y}`)
                var color_result=(this.winning.x + this.winning.y) % 2;
               
                if(!color_result){      
                    console.log('PUTI!!!!')                                  
                    total_amount += (bet_puti*2)
                    this.winning_block.setFillStyle(0xffffff)  
                    this.winning_text.setText('PUTI').setColor('#000000')
                }else{                    
                    console.log('PULA!!!!')                                  
                    total_amount += (bet_pula*2)
                    this.winning_block.setFillStyle(0xff0000) 
                    this.winning_text.setText('PULA').setColor('#ffffff')
                }
                this.bet_puti_text.text = 0
                bet_puti=0
                this.bet_pula_text.text = 0
                bet_pula=0
                this.total_coins.setText(total_amount)  
                
                
                var _scene =this   
                this.highlight_anim = this.tweens.add({
                    targets:this.winning,
                    props:{
                        strokeColor:0xfffff0
                    },
                    repeat:10,
                    yoyo:true,
                    duration:500,
                    onComplete:()=>{
                        _scene.winning_anim.resume() 
                        _scene.winning_block.setVisible(true)
                        _scene.winning_text.setVisible(true) 
                    }
                })  
            }
        }else{
            if(this.ball.body.deltaY() == 0 && this.ball.body.onFloor() && !resetting){
                console.log('ball is done bouncing')
                this.flip_board_anim.resume()
                // play = true;                
                // this.board.setVisible(true)
                // this.init_board.setVisible(false)
                // this.ball.setVisible(false)
                // if(cells.length<=1)   
                // for(var i=0; i<box_no; i++){
                //     cells.push(this.add.rectangle(10 + x, 60, 25, 25).setStrokeStyle(4, 0).setOrigin(0))
                // }
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
                this.hold = false;
                this.physics.resume()
                resetting =false;
                // this.board.setVisible(true)
                // this.init_board.setVisible(false)
                // this.ball.setVisible(false)
                // if(cells.length<=1)   
                // for(var i=0; i<box_no; i++){
                //     cells.push(this.add.rectangle(10 + x, 60, 25, 25).setStrokeStyle(4, 0).setOrigin(0))
                // }           
            }
        }
        
        if(this.initialTime >=0){
             // One second
            this.countdown.setText(this.formatTime(this.initialTime));
        }

        this.initialTime -= 1;
        
    }

}