import { Game } from './game.js';//trae la clase Game dentro del archivo especificado
import { Congratulations  } from './escenas/congratulations.js';
import { Gameover } from './escenas/game-over.js';
const config = {
  type: Phaser.AUTO,//indica si usar canvas o WebGl depende de ordenador
  width: 800,//tamaño de canvas
  height: 500,
  scene: [Game, Congratulations, Gameover],//que escenas va a haber en mi juego [Game,GameOver,Win,etc]
  physics: {//fisiacas
    default: 'arcade',//las basicas de 2d
    arcade: {
      //gravity: { y: 400 },//solo gravedad en eje y
      debug: false
    }
  }
}

var game = new Phaser.Game(config);//inicia la clase Game con las configuraciones dadas