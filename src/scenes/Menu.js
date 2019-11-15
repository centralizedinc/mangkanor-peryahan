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
        this.sound.add('background_music')

        // stop before playing
        this.sound.stopAll()
        this.sound.play('coins_audio', { volume: 0.5 })
        this.sound.play('background_music', { volume: 0.75 })

        this.cameras.main.fadeIn(500);
        // set background color
        this.cameras.main.setBackgroundColor('#640D0D')
        // this.add.image(this.game.center.x, this.game.center.y, 'background').setOrigin(0.5).setDepth(-1).setScale(2)

        //credits
        this.anims.create({ key: 'coin_animation', frames: this.anims.generateFrameNames('coin'), frameRate:24,  repeat: -1 });
        this.add.sprite(80, 50, 'coin').setScale(0.3).play("coin_animation")
        this.add.text(90,50,this.game.player.credits).setOrigin(0,0.5)

        for(var i=0; i<100; i++){
            this.physics.add.sprite(Phaser.Math.Between(50, 300), Phaser.Math.Between(50, 500), 'coin').setScale(0.4).setVelocityX(Phaser.Math.Between(-100, 100)).setBounce(0.5).setCollideWorldBounds().play("coin_animation")
        }
        

        //player
        if(!this.game.player.avatar){
            this.facebook.loadPlayerPhoto(this, 'player').once('photocomplete', this.addPhoto, this);
        }else{
            this.add.image(50,50, this.game.player.avatar).setScale(0.12)
        }
        
        this.add.text(50,80,this.game.player.name, {fontSize:'10px'}).setOrigin(0.5)

        //Menus
        // this.add.bitmapText(center.x, center.y - 200, 'main', 'Mang Kanor Peryahan').setOrigin(0.5).setScale(0.4);
        this.add.text(center.x, center.y - 200,'Mang Kanor Peryahan', {fontSize:'24px'}).setOrigin(0.5)
        this.add.image(center.x, center.y - 130, 'mk').setScale(0.11).setDepth(-1)
        this.add.text(center.x, center.y - 80,'Tara! Laro tayo!', {fontSize:'20px'}).setOrigin(0.5)
        

        //Roleta Game
        this.wheel_img = this.add.sprite(center.x, center.y, "wheel").setScale(0.3).setVisible(false);
        this.wheel_anim = this.tweens.add({
            targets: this.wheel_img,
            props:{
                angle:{value: 360, duration:1000, ease:"Cubic.easeOut"},
                scale:{value:1, duration:800}
            },
            callbackScope: this,
            paused:true
        })
        
        
        
        // this.createLights(this.game.center.x, this.game.center.y-20)
        

        var roleta_btn = this.add.rectangle(this.game.center.x, this.game.center.y, 200, 50).setStrokeStyle(1,0xffffff)
        var roleta = this.add.text(center.x, center.y, 'Roleta Game', {fontSize:'18px'}).setOrigin(0.5).setDepth(1)

        //Color Game
        this.anims.create({ key: 'block_animation', frames: this.anims.generateFrameNames('blocks'), frameRate:6,  repeat: -1 });
        this.cube = this.add.sprite(center.x, center.y, 'blocks').setScale(0.1).setVisible(false)
        this.cube_anim = this.add.tween({
            targets:this.cube,
            scale:0.8,
            duration:1000,
            repeat:-1,
            paused:true
        })
        
        var colorgame_btn = this.add.rectangle(this.game.center.x, this.game.center.y +70, 200, 50).setStrokeStyle(1,0xffffff)
        var colorgame = this.add.text(center.x, center.y + 70, 'Color Game', {fontSize:'18px'}).setOrigin(0.5).setDepth(1) 

        //Pula Puti Game
        this.grid = this.add.grid(center.x, center.y, 50, 50, 5, 5, 0xff0000).setAltFillStyle(0xffffff).setOutlineStyle().setOrigin(0.5).setVisible(false);
        var pulaputi_btn = this.add.rectangle(this.game.center.x, this.game.center.y +140, 200, 50).setStrokeStyle(1,0xffffff)
        var pulaputi = this.add.text(center.x, center.y + 140, 'PulaPuti Game', {fontSize:'18px'}).setOrigin(0.5).setDepth(1) 
        this.pulaputi_anim = this.tweens.add({
            targets: this.grid,
            props:{
                rotation:{value:-25, duration: 3000, ease:"Linear"},
                scale:{value: 5, duration: 1000}
            },
            callbackScope: this,
            repeat:-1,
            paused:true
        })

        // this.add.tween({
        //     targets:[pulaputi_btn,colorgame_btn, roleta_btn],
        //     props:{
        //         strokeColor:0
        //     },
        //     duration:10000,
        //     repeat:-1
        // })

        this.add.rectangle(this.game.center.x, this.game.center.y +210, 100, 50).setStrokeStyle(1,0xffffff)
        var buy = this.add.text(center.x, center.y + 210, 'Buy/Sell', {fontSize:'18px'}).setOrigin(0.5).setDepth(1) 

        this.active_btn = this.add.image(50,50,'mk').setScale(0.05).setVisible(false)
        this.createMenuButton(roleta, 'RoletaScene')
        this.createMenuButton(colorgame, 'ColorGameScene')
        this.createMenuButton(pulaputi, 'PulaPutiScene')
        this.createMenuButton(buy, 'PulaPutiScene')

        
    }

    createLights(x, y){
        this.graphics = this.add.graphics({ lineStyle: { color: 0xF0C654 }, fillStyle: { color: 0xF0C654 }});
        this.lights = []
        this.lights.push(new Phaser.Geom.Circle(x, y, 5))   
        this.lights.push(new Phaser.Geom.Circle(x, y+40, 5))    

        var start = 0;
        var end = 0;
        for(var i=15; i<=130; i+=15){
           
            start =x-i;
            end = x+i;

            this.lights.push(new Phaser.Geom.Circle(start, y, 5))   
            this.lights.push(new Phaser.Geom.Circle(end, y, 5)) 

            this.lights.push(new Phaser.Geom.Circle(start, y+40, 5))   
            this.lights.push(new Phaser.Geom.Circle(end, y+40, 5)) 
        }

        this.lights.push(new Phaser.Geom.Circle(start, y+20, 5))   
        this.lights.push(new Phaser.Geom.Circle(end, y+20, 5)) 

        //render bulb
        this.lights.forEach(bulb=>{
            this.graphics.fillCircleShape(bulb);
        })
        
    }

    createMenuButton(btn, scene, indx){
        
        btn.setInteractive()
        //clicked        
        btn.on('pointerup', ()=>{
            var _scene = this
            if(scene === 'RoletaScene'){
                this.wheel_img.setVisible(true)
                this.wheel_anim.resume()
            }else if(scene === 'ColorGameScene'){
                this.cube.setVisible(true)
                this.cube.play("block_animation")
                this.cube_anim.resume()
            }else {
                this.grid.setVisible(true)
                this.pulaputi_anim.resume()                
            }
            this.cameras.main.fadeOut(500);
            this.cameras.main.on('camerafadeoutcomplete', function () {
                _scene.scene.start(scene)        
            });
            // 
        })
        //hover
        btn.on('pointerover', ()=>{
            this.active_btn.setX(50)
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