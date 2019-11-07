import { Scene } from 'phaser'

export default class MenuScene extends Scene {

    constructor () {
        super({ key: 'MenuScene' })
      }
    
    /**
     * 
     */
    preload () {
    
    }

    /**
     * 
     */
    create(){

        //draw background
        this.add.image(0,0,'background').setOrigin(0).setScale(0.68).setDepth(0)

        this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
        this.add.sprite(50, 50, 'coin').setScale(0.5).play("coin_animation")

        // this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.20, 'logo').setScale(0.1).setDepth(1)
        // this.add.text(this.game.renderer.width /8, this.game.renderer.height * 0.30, 'Mang Kanor Peryahan' , {fontSize:'24px'}).setOrigin(0).setDepth(1)

        var roleta = this.add.text(this.game.renderer.width /4, this.game.renderer.height / 2.2, '[ ]Roleta', {fontSize:'24px'}).setOrigin(0).setDepth(1)        
        var colorgame = this.add.text(this.game.renderer.width /4, this.game.renderer.height / 1.9, '[ ]Color Game', {fontSize:'24px'}).setOrigin(0).setDepth(1) 
        var pulaputi = this.add.text(this.game.renderer.width /4, this.game.renderer.height / 1.7, '[ ]Pula Puti', {fontSize:'24px'}).setOrigin(0).setDepth(1) 
        this.add.text(this.game.renderer.width /4, this.game.renderer.height / 1.5, '[ ]Settings', {fontSize:'24px'}).setOrigin(0).setDepth(1)

        roleta.setInteractive()
        roleta.on('pointerup', ()=>{
            this.scene.start('RoletaScene')
        })
        roleta.on('pointerover', ()=>{
            roleta.setText('[x]Roleta')
        })
        roleta.on('pointerout', ()=>{
            roleta.setText('[ ]Roleta')
        })

        colorgame.setInteractive()
        colorgame.on('pointerup', ()=>{
            this.scene.start('ColorGameScene')
        })
        colorgame.on('pointerover', ()=>{
            colorgame.setText('[x]Color Game')
        })
        colorgame.on('pointerout', ()=>{
            colorgame.setText('[ ]Color Game')
        })

        pulaputi.setInteractive()
        pulaputi.on('pointerup', ()=>{
            this.scene.start('PulaPutiScene')
        })
        pulaputi.on('pointerover', ()=>{
            pulaputi.setText('[x]Pula Puti')
        })
        pulaputi.on('pointerout', ()=>{
            pulaputi.setText('[ ]Pula Puti')
        })
    }
}