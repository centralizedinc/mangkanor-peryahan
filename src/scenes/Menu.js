import { Scene } from 'phaser'

var center = {};

export default class MenuScene extends Scene {

    constructor () {
        super({ key: 'MenuScene' })
      }
    
    /**
     * 
     */
    preload () {
        // this.game.player.name = this.facebook.playerName
        center = {
            x:this.game.renderer.width/2,
            y: this.game.renderer.height/2
        }
    }

    /**
     * 
     */
    create(){

        //play audio
        this.sound.add('coins_audio')
        this.sound.play('coins_audio', { volume: 0.5 })
        this.sound.add('background_music')
        this.sound.play('background_music', { volume: 0.75 })

        this.cameras.main.fadeIn(500);
        // set background color
        this.cameras.main.setBackgroundColor('#640D0D')

        //credits
        this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
        this.add.sprite(80, 50, 'coin').setScale(0.3).play("coin_animation")
        this.add.text(90,50,this.game.player.credits).setOrigin(0,0.5)

        for(var i=0; i<100; i++){
            this.physics.add.sprite(Phaser.Math.Between(50, 300), Phaser.Math.Between(50, 500), 'coin').setScale(0.4).setVelocityX(Phaser.Math.Between(-100, 100)).setBounce(0.5).setCollideWorldBounds().play("coin_animation")
        }
        

        //player
        this.facebook.loadPlayerPhoto(this, 'player').once('photocomplete', this.addPhoto, this);
        this.add.text(50,80,this.game.player.name, {fontSize:'10px'}).setOrigin(0.5)

        //Menus
        this.add.text(center.x, center.y - 200,'Mang Kanor Peryahan', {fontSize:'24px'}).setOrigin(0.5)
        this.add.image(center.x, center.y - 130, 'mk').setScale(0.11).setDepth(-1)
        this.add.text(center.x, center.y - 80,'Tara! Laro tayo!', {fontSize:'20px'}).setOrigin(0.5)
        

        //Roleta Game
        var wheel = this.add.sprite(center.x-100, center.y, "wheel").setScale(0.3);
        this.tweens.add({
            targets: wheel,
            angle: 360,
            duration: 2000,
            ease: "Cubic.easeOut",
            callbackScope: this,
            repeat:-1
        })
        var roleta = this.add.text(center.x-50, center.y, 'Roleta Game', {fontSize:'18px'}).setOrigin(0, 0.5).setDepth(1)

        //Color Game
        this.anims.create({ key: 'block_animation', frames: this.anims.generateFrameNames('blocks'), frameRate:6,  repeat: -1 });
        var cube = this.add.sprite(center.x-100, center.y + 70, 'blocks').setScale(0.1)
        cube.play("block_animation")
        var colorgame = this.add.text(center.x-50, center.y + 70, 'Color Game', {fontSize:'18px'}).setOrigin(0, 0.5).setDepth(1) 

        //Pula Puti Game
        var grid = this.add.grid(center.x-100, center.y + 140, 50, 50, 5, 5, 0xff0000).setAltFillStyle(0xffffff).setOutlineStyle().setOrigin(0.5);
        var pulaputi = this.add.text(center.x-50, center.y + 140, 'PulaPuti Game', {fontSize:'18px'}).setOrigin(0, 0.5).setDepth(1) 
        this.tweens.add({
            targets: grid,
            rotation: -25,
            duration: 5000,
            ease: "Linear",
            callbackScope: this,
            repeat:-1
        })

        this.active_btn = this.add.image(50,50,'mk').setScale(0.05).setVisible(false)
        this.createMenuButton(roleta, 'RoletaScene')
        this.createMenuButton(colorgame, 'ColorGameScene')
        this.createMenuButton(pulaputi, 'PulaPutiScene')
    }

    createMenuButton(btn, scene, indx){
        
        btn.setInteractive()
        //clicked        
        btn.on('pointerup', ()=>{
            var _scene = this
            this.cameras.main.fadeOut(500);
            this.cameras.main.on('camerafadeoutcomplete', function () {
                _scene.scene.start(scene)        
            });
            // 
        })
        //hover
        btn.on('pointerover', ()=>{
            this.active_btn.setX(btn.x + 180)
            this.active_btn.setY(btn.y)
            this.active_btn.setVisible(true)
        })
        btn.on('pointerout', ()=>{
            this.active_btn.setVisible(false)
        })
    }

    addPhoto(key){
        this.game.player.avatar = key;
        this.add.image(50, 50, key).setScale(0.12);
        
    }
}