import { Game } from './game.js';//trae la clase Game dentro del archivo especificado
const config = {
  type: Phaser.AUTO,//indica si usar canvas o WebGl depende de ordenador
  width: 300,//tamaño de canvas
  height: 300,
  scene: [Game],//que escenas va a haber en mi juego [Game,GameOver,Win,etc]
  physics: {//fisiacas
    default: 'arcade',//las basicas de 2d
    arcade: {
      gravity: { y: 400 },//solo gravedad en eje y
      debug: false
    }
  }
}

var game = new Phaser.Game(config);//inicia la clase Game con las configuraciones dadas