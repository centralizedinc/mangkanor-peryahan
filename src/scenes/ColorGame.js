
import {Scene} from 'phaser'

var bets = [0,0,0,0,0,0]
var winnings = {total:0};
var colors = [
    "pink",
    "white",
    "yellow",
    "blue",
    "green",
    "red"
]
var final_scenes = [
    {index:10, value: 'PINK'},
    {index:0, value: 'WHITE'},
    {index:9, value: 'YELLOW'},
    {index:2, value: 'BLUE'},
    {index:4, value: 'GREEN'},
    {index:7, value: 'RED'},        
]
var block1_done = false;
var block2_done = false;
var block3_done = false;
var isAnimation = false;
export default class ColorGameScene extends Scene {

    /**
     * 
     */
    constructor(){
        super(
            {key:'ColorGameScene'}
        )
    }


    /**
     * 
     */
    create(){

        //physics
        this.physics.world.setBounds(30,50, 290, 400 )
        this.physics.world.pause()

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

        // init state
        this.slot1 = this.createBlock(this.game.center.x-60, 130)
        this.slot2 = this.createBlock(this.game.center.x, 130)
        this.slot3 = this.createBlock(this.game.center.x+60, 130)

        this.play_btn = this.add.text(this.game.center.x+100, 130, "Play")
                        .setDepth(1)
                        .setInteractive()
                        .on('pointerup', ()=>{
                            this.slot1.setVisible(false)
                            this.slot2.setVisible(false)
                            this.slot3.setVisible(false)

                            this.block1.setVisible(true)
                                        .setFriction(0.9)
                                        .setBounce(0.5)
                                        .setCollideWorldBounds(true)
                                        .setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
                                        .play("block_animation",true,Phaser.Math.Between(0,7))
                            this.block2.setVisible(true)
                                        .setFriction(0.9)
                                        .setBounce(0.5)
                                        .setCollideWorldBounds(true)
                                        .setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
                                        .play("block_animation",true,Phaser.Math.Between(0,7))
                            this.block3.setVisible(true)
                                        .setFriction(0.9)
                                        .setBounce(0.5)
                                        .setCollideWorldBounds(true)
                                        .setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
                                        .play("block_animation",true,Phaser.Math.Between(0,7))

                            this.physics.resume()
                        })

        
        

        this.spin_blocks = this.anims.create({ 
                                key: 'block_animation', 
                                frames: this.anims.generateFrameNames('blocks'), 
                                frameRate:16,  
                                repeat: -1 
                            });
        
        this.table = this.add.rectangle(30,100,290,350, 0)
                        .setStrokeStyle(2, 0xffffff)
                        .setOrigin(0)

        this.block1 = this.physics.add.sprite(this.game.center.x-60, 130, 'blocks')
                    .setScale(0.1)
                    .setVisible(false)
        this.block2 = this.physics.add.sprite(this.game.center.x, 130, 'blocks')
                    .setScale(0.1)
                    .setVisible(false)
        this.block3 = this.physics.add.sprite(this.game.center.x+60, 130, 'blocks')
                    .setScale(0.1)
                    .setVisible(false)

        this.physics.world.addCollider(this.block1,this.block2)
        this.physics.world.addCollider(this.block1,this.block3)
        this.physics.world.addCollider(this.block2,this.block3)

        this.pink = this.add.rectangle(25, 500, 100,50, 0xF26DAD).setOrigin(0)
        this.white = this.add.rectangle(125, 500, 100,50, 0xffffff).setOrigin(0)
        this.yellow = this.add.rectangle(225, 500, 100,50, 0xFFF833).setOrigin(0)

        this.blue = this.add.rectangle(25, 550, 100,50, 0x6699FF).setOrigin(0)
        this.green = this.add.rectangle(125, 550, 100,50, 0x36F966).setOrigin(0)
        this.red = this.add.rectangle(225, 550, 100,50, 0xFF6666).setOrigin(0)

        this.createBetButton(this.pink,0)
        this.createBetButton(this.white,1)
        this.createBetButton(this.yellow,2)
        this.createBetButton(this.blue,3)
        this.createBetButton(this.green,4)
        this.createBetButton(this.red,5)

        this.bet_text = []
        this.bet_text.push(this.add.text(
                                    this.pink.x+this.pink.width/2, 
                                    this.pink.y+this.pink.height/2, 
                                    bets[0], 
                                    {color:0xffffff}).setDepth(5).setOrigin(0.5))
        this.bet_text.push(this.add.text(
                                    this.white.x+this.white.width/2, 
                                    this.white.y+this.white.height/2, 
                                    bets[1], 
                                    {color:0xffffff}).setDepth(5).setOrigin(0.5))
        this.bet_text.push(this.add.text(
                                    this.yellow.x+this.yellow.width/2, 
                                    this.yellow.y+this.yellow.height/2, 
                                    bets[2], 
                                    {color:0xffffff}).setDepth(5).setOrigin(0.5))
        this.bet_text.push(this.add.text(
                                    this.blue.x+this.blue.width/2, 
                                    this.blue.y+this.blue.height/2, 
                                    bets[3], 
                                    {color:0xffffff}).setDepth(5).setOrigin(0.5))
        this.bet_text.push(this.add.text(
                                    this.green.x+this.green.width/2, 
                                    this.green.y+this.green.height/2, 
                                    bets[4], 
                                    {color:0xffffff}).setDepth(5).setOrigin(0.5))
        this.bet_text.push(this.add.text(
                                    this.red.x+this.red.width/2, 
                                    this.red.y+this.red.height/2, 
                                    bets[5], 
                                    {color:0xffffff}).setDepth(5).setOrigin(0.5))

        this.exit.setInteractive()
        this.exit.on("pointerup", ()=>{
            this.scene.start('MenuScene')
          });


        //credits animation
    this.credit_anim = this.tweens.add({
        targets:this.credit,
        y:60,
        duration:1000,
        paused:true,
        onComplete:()=>{
          this.credit.setText('')
          console.log('winnings.total:::', winnings.total)
          this.total_coins.text = this.game.player.credits += winnings.total
          winnings = {total:0,slot1:{}, slot2:{}, slot3:{}};
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
          this.total_coins.text = this.game.player.credits -= 100 
        }
      })
    }

    /**
     * @description bet button generator
     * @param {GameObject} btn 
     * @param {Number} indx 
     */
    createBetButton(btn, indx){
        btn.setInteractive();
        btn.on('pointerover',()=>{
            btn.setStrokeStyle(2, 0)
        })
        btn.on('pointerout',()=>{
            btn.setStrokeStyle()
        })
        btn.on('pointerup',()=>{
            // this.game.player.credits -=100
            // this.total_coins.setText(this.game.player.credits)
            this.credit.setText('- 100')
            this.debit_anim.resume()
            bets[indx] +=100
            this.bet_text[indx].setText(bets[indx] )
        })
    }


    /**
     * @description block creator
     * @param {Number} x 
     * @param {Number} y 
     */
    createBlock(x, y){
        var block =  this.add.image(x, y, colors[Phaser.Math.Between(0,5)])
                    .setScale(0.04)
                    .setDepth(1)
                    .setInteractive()
        block.on('pointerup', ()=>{
            this.add.tween({
                targets:block,
                props:{
                    scaleY: 0.01
                },
                yoyo:true,
                repeat:0,
                duration: 100,
                onYoyo:()=>{
                    block.setTexture(colors[Phaser.Math.Between(0,5)])
                }
            })
            
        })
        return block;
    }

    /**
     * @description Game play reset method
     */
    reset(){
        //reset flags
        block1_done = false;
        block2_done = false;
        block3_done = false;
        bets = [0,0,0,0,0,0]
        
        this.bet_text.forEach(txt=>{
            txt.setText(0)
        })
        //hide blocks
        this.block1.setVisible(false)
        this.block2.setVisible(false)
        this.block3.setVisible(false)
        //reset position
        this.block1.body.reset(this.game.center.x-60, 130)
        this.block2.body.reset(this.game.center.x, 130)
        this.block3.body.reset(this.game.center.x+60, 130)
        this.physics.pause()
        //show slots
        this.slot1.setVisible(true)
        this.slot2.setVisible(true)
        this.slot3.setVisible(true)
    }

    /**
     * 
     */
    update(){
        if(this.block1.body.deltaY() == 0 && this.block1.body.onFloor() && !block1_done){
            block1_done = true
            var indx1=Phaser.Math.Between(0,5)
            var final = final_scenes[indx1]
            //stop block
            this.block1.setVelocity(0)
            this.block1.anims.stop()
            this.block1.anims.setCurrentFrame(this.block1.anims.currentAnim.frames[final.index]);
            //set winning color
            // this.slot1.setTexture(colors[indx1])
            this.slot1.setY(this.block1.y)
            
            winnings.slot1 = {color:colors[indx1],bet:bets[indx1],value:bets[indx1]*2, index:indx1}
            // winnings.total += (bets[indx1] * 2)
            

            //credit animation
            // if((bets[indx] * 2)){
            //     this.credit.setText(`+ ${(bets[indx] * 2)}`)
            //     this.tweens.add({
            //         targets:this.credit,
            //         y:60,
            //         duration:1000,
            //         onComplete:()=>{
            //         this.credit.setText('')
            //         this.total_coins.text = this.game.player.credits += (bets[indx] * 2)
            //         }
            //     })
            // }
        }

        if(this.block2.body.deltaY() == 0 && this.block2.body.onFloor() && !block2_done){
            block2_done = true
            var indx2=Phaser.Math.Between(0,5)
            var final = final_scenes[indx2]
            
            this.block2.setVelocity(0)
            this.block2.anims.stop()
            this.block2.anims.setCurrentFrame(this.block2.anims.currentAnim.frames[final.index]);
            
            // this.slot2.setTexture(colors[indx2])
            this.slot2.setY(this.block2.y)
            
            winnings.slot2 = {color:colors[indx2],bet:bets[indx2],value:bets[indx2]*2, index:indx2}
            // winnings.total += (bets[indx2] * 2)
        }

        if(this.block3.body.deltaY() == 0 && this.block3.body.onFloor() && !block3_done){
            block3_done = true
            var indx3=Phaser.Math.Between(0,5)
            var final = final_scenes[indx3]

            this.block3.setVelocity(0)
            this.block3.anims.stop()
            this.block3.anims.setCurrentFrame(this.block3.anims.currentAnim.frames[final.index]);

            // this.slot3.setTexture(colors[indx3])
            this.slot3.setY(this.block3.y)

            winnings.slot3 = {color:colors[indx3],bet:bets[indx3],value:bets[indx3]*2, index:indx3}
            // winnings.total += (bets[indx3] * 2)
        }

        if(block1_done && block2_done && block3_done && !isAnimation){
            
            //animate winning blocks
            
            isAnimation=true;
            winnings.total = (bets[winnings.slot1.index] + bets[winnings.slot2.index] + bets[winnings.slot3.index])*2
            console.log(JSON.stringify(winnings))
            console.log(JSON.stringify(bets))
            console.log()
            this.slot1.setVisible(true).setScale(0.04,0.01).setTexture(winnings.slot1.color)
            this.slot2.setVisible(true).setScale(0.04,0.01).setTexture(winnings.slot2.color)
            this.slot3.setVisible(true).setScale(0.04,0.01).setTexture(winnings.slot3.color)

            this.credit.setText(`+ ${winnings.total}`)
            this.credit_anim.resume()
            this.add.tween({
                targets: [this.slot1, this.slot2, this.slot3],
                props:{
                    scaleY:{value:0.04, duration: 100, deley:3000},
                    y:{value:130, duration: 100,  deley:3000}
                },
                onComplete:()=>{
                    console.log('completed animation')
                    this.reset()
                    isAnimation = false;
                }
            })
        }
        
    }
}