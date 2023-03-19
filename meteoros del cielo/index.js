export let heig = window.innerHeight;
export let wid = window.innerWidth;
let dispositivo;

function queDispositivoEstaUsando()
{
  let navegador = navigator.userAgent;
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
      dispositivo = "celular";
      console.log("Estás usando un dispositivo móvil!!");
      heig = heig*1.5;
      wid = wid*1.5;
      if(heig>1190)heig=1190;
      if(wid>812)wid=812;

    } else {
      dispositivo = "computadora";
      console.log("No estás usando un móvil");
      heig = 800;
      wid = 600;
  }
}
queDispositivoEstaUsando();
import { Game } from './game.js';//trae la clase Game dentro del archivo especificado
import { Play  } from './escenas/play.js';
import { Gameover } from './escenas/game-over.js';

const config = {
  pixelArt: true,//remarca los pixeles de las imagenes
  type: Phaser.AUTO,//indica si usar canvas o WebGl depende de ordenador
  // width: 600,//tamaño de canvas
  // height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    
    width: wid,
    height: heig
},
  parent: 'phaser-example',//id del contenedor
  backgroundColor: '#34495E',//fondo del lienzo
  banner:
  {
    hidePhaser: true,//oculta texto de phaser en la consola
    text:'#000000',//cambia color del titulo del juego enn la consola
    background:[
      'red',
      'yellow',
      'red',
      'transparent'
    ]
  },
  input:{
    activePointers:4,
  },
  scene: [Play, Game,Gameover],//que escenas va a haber en mi juego [Game,GameOver,Win,etc]
  physics: {//fisiacas
    default: 'arcade',//las basicas de 2d
    arcade: {
      gravity: { y: 0},//solo gravedad en eje y
      debug: false
    }
  }
}

var game = new Phaser.Game(config);//inicia la clase Game con las configuraciones dadas