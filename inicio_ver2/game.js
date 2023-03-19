import{PhaseConstructor} from './escenas/PhaseConstructor.js';
import{Scoreboard} from './componentes/Scoreboard.js';//traigo otro script y lo incluyo
import{LiveCounter} from './componentes/LiveCounter.js';//traigo otro script y lo incluyo

import { Platform } from '../componentes/nave.js';
import { Ball } from '../componentes/ball.js';


const INITIAL_LIVES = 3;
const INITIAL_VELOCITY_X = -60;//velocidad inicial en x de la bala

window.addEventListener('keydown',(e)=>//la cree para reiniciar la pagina con enter
{
  if(e.key=='Enter')location.reload();
});


export class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'game' });//nombre clave de esta escena
    }
    init() {//se ejecuta solo una vez al inicio
        this.glueRecordVelocityX = INITIAL_VELOCITY_X; 
        this.phaseConstructor = new PhaseConstructor(this);//instancio el constructor de los niveles
        this.scoreboard = new Scoreboard(this);//instancio una nueva clase scoreboard con todos los datos de esta escena
        this.liveCounter = new LiveCounter(this, INITIAL_LIVES);//Esto permite que, cada vez que la escena del juego se resetea, se cree un nuevo contador de vidas.
        this.naveP = new Platform(this);
        this.bullet = new Ball(this);
      }
    preload() {//precarga cosas
      this.load.image('background', 'images/background.jpg');//carga la imagen y le da nombre background
      //this.load.image('bullet', 'images/bullet/b1.png');
      this.load.image('bluebrik', 'images/brickBlue.png');
      this.load.image('blackbrik', 'images/brickBlack.png');
      this.load.image('greenbrik', 'images/brickGreen.png');
      this.load.image('orangebrik', 'images/brickOrange.png');
      this.load.image('yellowbrick', 'images/brickYellow.png');
      this.load.image('greybrik', 'images/brickGrey.png');
      this.load.image('naveP', 'images/NaveAnim/nav1.png');
      this.load.audio('laser', 'sonidos/laser.mp3');
      this.load.atlas('bulletTot','images/bullet/bulletTot.png','images/bullet/bulletTot.json');
      this.load.spritesheet('bluediamond',
      'images/diamondSprite.png',
      { frameWidth: 48, frameHeight: 48 }
);
    }
  
    create() {
        this.add.image(410, 250, 'background');
        this.physics.world.setBoundsCollision(true, true, true, false);//todo es fisico menos el suelo
        this.liveCounter.create();
        this.naveP.create();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        this.anims.create(
          {
            key:'balas',
            frames: this.anims.generateFrameNames('bulletTot',
            {
              end: 6, 
              //zeroPad:0
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
          });
        this.bullet.create();
        this.physics.add.collider(this.bullet.get(), this.naveP.get(), this.navePImpact, null, this);//.get es una funcion dentro de ambas que devuelve .bullet o .navp
        this.scoreboard.create();
        this.disparar = this.sound.add('laser');//creo la variable del sonido que puedo controlar
        
        this.anims.create({
          key: 'bluediamondanimation',
          frames: this.anims.generateFrameNumbers('bluediamond', { start: 0, end: 7 }),
          frameRate: 10,
          repeat: -1,
          yoyo: true,
    });
    this.anims.create({
      key: 'reddiamondanimation',
      frames: this.anims.generateFrameNumbers('bluediamond', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'greendiamondanimation',
      frames: this.anims.generateFrameNumbers('bluediamond', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.phaseConstructor.create();
    this.miSprite = this.physics.add.sprite(40, 40, 'bluediamond');
    this.miSprite.anims.play('bluediamondanimation');
  }


    update() 
    {
      this.naveP.updatePosition(this.bullet,this.cursors);//mover
        if (this.bullet.isLost()) {//se fue la bala?
          let gameNotFinished = this.liveCounter.liveLost();//true o false
          if(gameNotFinished)//se perdio la bala
          {
            this.naveP.setInitialState(this.bullet);//devolver todoa su posicion
            this.naveP.setInitialSize();//devolver a su tamaño original
            this.naveP.removeGlue();//desactiva la habilidad pegamento
            this.glueRecordVelocityX = INITIAL_VELOCITY_X;
          }
        }

        if (this.cursors.up.isDown) {//tecla ariba
          if(this.bullet.isGlued)//la pelota esta aderida?
          {
            this.bullet.throw(INITIAL_VELOCITY_X);//lanzar la bala
          }else if(this.naveP.isGluedBecausePower()){//devuelve true si la bala esta pegada por la habilidad
            this.bullet.throw(this.glueRecordVelocityX);
            this.naveP.hasBallGlued = false;
          }
        }
        
    }

    navePImpact(bullet,naveP)//llamado cada vez que la nave y la bala chocan
    {
      this.disparar.play();
      this.scoreboard.incrementPoints(1);//cada vez que choca, le envio un punto
      let relativeImpact = bullet.x - naveP.x;//decide si toco mas a la izquierda o a la derecha- - es izq y + es derech.
      
      if(this.naveP.hasGluePower()) {//tiene la habilidad pegamento
        bullet.setVelocityY(0);
        bullet.setVelocityX(0);//mantiene la pelota unida a la nave
        this.glueRecordVelocityX = this.calculateVelocity(relativeImpact);//cuando suelte la vola va a salir como si no se hubiese pegado
        this.naveP.hasBallGlued = true;//actualmente tiene la bala pegada
      } else {
        bullet.setVelocityX(this.calculateVelocity(relativeImpact));//bota a la derecha o izquierda
      }
    }

    calculateVelocity(relativeImpact) {//rebota para derecha o izquierda
      if(relativeImpact > 50) {
        relativeImpact = 50;
      }
      if (relativeImpact > 0) {
        return (8 * relativeImpact);
      } else if (relativeImpact < 0) {
        return (8 * relativeImpact);
      } else {
        return (Phaser.Math.Between(-10, 10))//suelta direccion al azar
      }
    }

    brickImpact(bullet,brik)//destruyo los bloques
    { 
      brik.disableBody(true,true); 
      this.scoreboard.incrementPoints(10);
      
      if (this.phaseConstructor.isPhaseFinished()) { //va a phaseConstructor.js al metodo isPhaseFinished que va al nivel respectivo que va a phase.js que va a isPhaseFinished que devuelve true if this.bricks.countActive() === 0
        this.phaseConstructor.nextLevel();//pasa al siguiente nivel o le envia true a endGame para terminar el juego
        this.naveP.setInitialState(this.bullet);//devuelve la nave a su posicion
      }
    }

  endGame(completed)
  {
      if(!completed)//si es falso, perdio el juego
      {
          this.scene.start('gameover');//va a game-over.js
      }
      else//si es true, continua el juego
      {
          this.scene.start('congratulations');//va a congratulations.js
      }
  }

    increaseLives() {
      this.liveCounter.increase();
    }

    setGluePower() {
      this.naveP.setGluePower();
    }

    setPlatformBig() {
      this.naveP.setBigSize();
    }

    removeGlueFromBall() {
      this.bullet.removeGlue();
    }
}
