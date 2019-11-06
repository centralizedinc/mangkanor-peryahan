import Phaser from "phaser";
import logoImg from "./assets/logo.png";

// scenes
import BootScene from "./scenes/Boot"
import MenuScene from "./scenes/Menu"
import RoletaScene from "./scenes/Roleta"
import PulaPutiScene from "./scenes/PulaPuti"
import ColorGameScene from "./scenes/ColorGame"


const config = {
    type: Phaser.AUTO,
    width: 350,
    height: 550,
    parent: 'game-container',
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

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
