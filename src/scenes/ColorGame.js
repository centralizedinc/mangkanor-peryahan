
import {Scene} from 'phaser'

var total_amount = 2500
var bets = [0,0,0,0,0,0]
var winnings = 0;
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
                                        .play("block_animation")
                            this.block2.setVisible(true)
                                        .setFriction(0.9)
                                        .setBounce(0.5)
                                        .setCollideWorldBounds(true)
                                        .setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
                                        .play("block_animation")
                            this.block3.setVisible(true)
                                        .setFriction(0.9)
                                        .setBounce(0.5)
                                        .setCollideWorldBounds(true)
                                        .setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
                                        .play("block_animation")

                            this.physics.resume()
                        })

        this.physics.world.setBounds(30,50, 290, 350 )
        this.physics.world.pause()
        

        this.spin_blocks = this.anims.create({ key: 'block_animation', frames: this.anims.generateFrameNames('blocks'), frameRate:12,  repeat: -1 });
        
        this.table = this.add.rectangle(30,100,290,350, 0).setStrokeStyle(2, 0xffffff).setOrigin(0)

        this.block1 = this.physics.add.sprite(this.game.center.x-60, 130, 'blocks').setScale(0.1).setVisible(false)
        this.block2 = this.physics.add.sprite(this.game.center.x, 130, 'blocks').setScale(0.1).setVisible(false)
        this.block3 = this.physics.add.sprite(this.game.center.x+60, 130, 'blocks').setScale(0.1).setVisible(false)

        this.physics.world.addCollider(this.block1,this.block2)
        this.physics.world.addCollider(this.block1,this.block3)
        this.physics.world.addCollider(this.block2,this.block3)

        this.pink = this.add.rectangle(25, 420, 100,50, 0xF26DAD).setOrigin(0)
        this.white = this.add.rectangle(125, 420, 100,50, 0xffffff).setOrigin(0)
        this.yellow = this.add.rectangle(225, 420, 100,50, 0xFFF833).setOrigin(0)

        this.blue = this.add.rectangle(25, 470, 100,50, 0x6699FF).setOrigin(0)
        this.green = this.add.rectangle(125, 470, 100,50, 0x36F966).setOrigin(0)
        this.red = this.add.rectangle(225, 470, 100,50, 0xFF6666).setOrigin(0)

        this.createBetButton(this.pink,0)
        this.createBetButton(this.white,1)
        this.createBetButton(this.yellow,2)
        this.createBetButton(this.blue,3)
        this.createBetButton(this.green,4)
        this.createBetButton(this.red,5)

        this.bet_text = []
        this.bet_text.push(this.add.text(60, 435, bets[0], {color:0xffffff}).setDepth(5))
        this.bet_text.push(this.add.text(160, 435, bets[1], {color:0xffffff}).setDepth(5))
        this.bet_text.push(this.add.text(260, 435, bets[2], {color:0xffffff}).setDepth(5))

        this.bet_text.push(this.add.text(60, 485, bets[3], {color:0xffffff}).setDepth(5))
        this.bet_text.push(this.add.text(160, 485, bets[4], {color:0xffffff}).setDepth(5))
        this.bet_text.push(this.add.text(260, 485, bets[5], {color:0xffffff}).setDepth(5))

        this.exit.setInteractive()
        this.exit.on("pointerup", ()=>{
            this.scene.start('MenuScene')
          });
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
            total_amount -=100
            this.total_coins.setText(total_amount)
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
            var indx=Phaser.Math.Between(0,5)
            var final = final_scenes[indx]
            this.block1.setVelocity(0)
            this.block1.anims.stop()
            this.block1.anims.setCurrentFrame(this.block1.anims.currentAnim.frames[final.index]);
            
            total_amount += (bets[indx] * 2)
            console.log(bets[indx] * 2)
            this.total_coins.setText(total_amount)
        }

        if(this.block2.body.deltaY() == 0 && this.block2.body.onFloor() && !block2_done){
            block2_done = true
            var indx=Phaser.Math.Between(0,5)
            var final = final_scenes[indx]
            this.block2.setVelocity(0)
            this.block2.anims.stop()
            this.block2.anims.setCurrentFrame(this.block2.anims.currentAnim.frames[final.index]);

            total_amount += (bets[indx] * 2)
            console.log(bets[indx] * 2)
            this.total_coins.setText(total_amount)
        }

        if(this.block3.body.deltaY() == 0 && this.block3.body.onFloor() && !block3_done){
            block3_done = true
            var indx=Phaser.Math.Between(0,5)
            var final = final_scenes[indx]
            this.block3.setVelocity(0)
            this.block3.anims.stop()
            this.block3.anims.setCurrentFrame(this.block3.anims.currentAnim.frames[final.index]);

            total_amount += (bets[indx] * 2)
            console.log(bets[indx] * 2)
            this.total_coins.setText(total_amount)
        }

        if(block1_done && block2_done && block3_done && !isAnimation){
            this.reset()
            //animate winning blocks
            isAnimation=true;
            this.add.tween({
                targets:
            })
        }
        
    }
}