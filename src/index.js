import Phaser from "phaser";
import logoImg from "./assets/logo.png";

// scenes
import BootScene from "./scenes/Boot"
import MenuScene from "./scenes/Menu"
import RoletaScene from "./scenes/Roleta"
import PulaPutiScene from "./scenes/PulaPuti"
import ColorGameScene from "./scenes/ColorGame"

// console.log('Initializing ...')
FBInstant.initializeAsync().then(()=> {

//   console.log('FacebookInitialized:::::')
  const config = {
      type: Phaser.AUTO,
      width: 350,
      height: 550,
      parent: 'game-container',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 400 },
          debug: false
        }
      },
      scene: [BootScene, RoletaScene, MenuScene, PulaPutiScene, ColorGameScene]
  };

  const game = new Phaser.Game(config);
})




