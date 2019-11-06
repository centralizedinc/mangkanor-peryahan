
import {Scene} from 'phaser'

var total_amount = 2500
var bets = [0,0,0,0,0,0]
var winnings = 0;
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
        block1_done = false;
        block2_done = false;
        block3_done = false;
        bets = [0,0,0,0,0,0]
        this.add.image(0,0,'color_back').setOrigin(0).setScale(0.75).setDepth(0)
        this.physics.world.setBounds(30,50, 290, 350 )
        // this.physics.world.pause()
        this.spin_coin = this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
        this.coin = this.add.sprite(30, 30, 'coin').setScale(0.5)
        this.exit = this.add.text(this.game.renderer.width - 50, 20, 'Exit')

        this.total_coins = this.add.text(45, 20, total_amount,)

        // this.pull = this.add.text(this.game.renderer.width/2,this.game.renderer.height/2, 'Pull')
        

        this.spin_blocks = this.anims.create({ key: 'block_animation', frames: this.anims.generateFrameNames('blocks'), frameRate:12,  repeat: -1 });
        
        this.table = this.add.rectangle(30,50,290,350, 0).setStrokeStyle(2, 0xffffff).setOrigin(0)

        this.block1 = this.physics.add.sprite(50, 80, 'blocks').setScale(0.1)
        this.block1.setFriction(0.9).setBounce(0.5).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
        this.block1.play("block_animation")
            

        this.block2 = this.physics.add.sprite(this.game.renderer.width/2, 80, 'blocks').setScale(0.1)
        this.block2.setFriction(0.9).setBounce(0.7).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
        this.block2.play("block_animation")
            

        this.block3 = this.physics.add.sprite(300, 80, 'blocks').setScale(0.1)
        this.block3.setFriction(0.9).setBounce(0.7).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-100,100), Phaser.Math.Between(100,200))
        this.block3.play("block_animation")

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

        // pull
        // this.pull.setInteractive()
        // this.pull.on('pointerup', ()=>{
        //     this.physics.world.resume()
        // })

        this.exit.setInteractive()
        this.exit.on("pointerup", ()=>{
            this.scene.start('MenuScene')
          });
    }

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

        
        
    }
}