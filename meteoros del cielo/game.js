import{Scoreboard} from './componentes/scoreboard/Scoreboard.js';
import{LiveCounter} from './componentes/live/LiveCounter.js';
import{Mando} from './componentes/mando/mando.js';
import{Nave} from './componentes/nave/nave.js';
import{Meteor, record} from './componentes/asteroides/asteroid.js';
import {wid} from './index.js';
export class Game extends Phaser.Scene {//permitimos enviar esta clase a quien lo pida

//Phaser.Scene contiene una escena básica y nosotros la extendemos para darle la funcionalidad que requiere nuestro juego.
    constructor() {
      super({ key: 'game' });//nombre clave de esta escena
    }
    init()
    {
      this.naveP = new Nave(this);
      this.meteoros = new Meteor(this);
      this.score = new Scoreboard(this);
      this.lives = new LiveCounter(this,3);
      this.mado = new Mando(this);
      this.widd = wid;
      this.tiempo = 700;//cada cuamto caen asteroides
      this.timer;
      this.caida = 222;
      this.timerContador;
      this.contador = 0;
    }
    preload() 
    {
      this.load.image('cuerpo','imagenes/cuerpo.png');
      this.load.image('asteroide','imagenes/asteroid.png');
      this.load.image('derecha','imagenes/right.png');
      this.load.image('izquierda','imagenes/left.png');
      this.load.atlas('navecita','imagenes/cohete.png','sprite.json');

    }
    
    create() {
      this.physics.world.setBoundsCollision(true, true, true, true);
      this.bg = this.add.image(0,0,'bg').setOrigin(0,0).setScale(1.4);
      //this.bg.flipX = 180;
      //this.bg.angle = 90;
      this.mado.create();
      this.score.create();
      this.lives.create();

      this.anims.create(
        {
          key:'mov',
          frames: this.anims.generateFrameNames('navecita',
          {
            prefix:'Sprite',
            end: 6, 
            zeroPad:4
          }),
          frameRate: 10,
          repeat: -1,
          yoyo: true
        });

        this.naveP.create();
        this.imagen = this.add.sprite(this.naveP.get().x,this.naveP.get().y,'navecita');

        this.meteoros.create();
        this.meteoros.setAsteroidCollicion();

        this.timer = this.time.addEvent(//lanzar meteoros cada tiempo
        {
          delay:this.tiempo,
          callback: this.lanzarMeteor,
          callbackScope: this,
          loop: true
        });
      
        //cada 20 segundos actualiza la velocidad de creaciond de meteoros
        this.timerContador = this.time.addEvent(//lanzar meteoros cada tiempo
        {
          delay:20000,
          callback: ()=>{
            if(this.tiempo>10)this.tiempo--;
            this.timer = this.time.addEvent(//lanzar meteoros cada tiempo
            {
              delay:this.tiempo,
              callback: this.lanzarMeteor,
              callbackScope: this,
              loop: true
            });
          },
          callbackScope: this,
          loop: true
        });
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() 
    {
      this.imagen.x = this.naveP.get().x;
      this.imagen.y = this.naveP.get().y-20;
      this.imagen.anims.play('mov',true);
      this.naveP.mover(this.cursors,this.mado);
    }

    lanzarMeteor()
    {
      let met1 = this.meteoros.get().get(Phaser.Math.Between(0,this.widd/3),Phaser.Math.Between(-50,-200),'asteroide').setScale(0.3);
        
      let met2 = this.meteoros.get().get(Phaser.Math.Between(this.widd/3,this.widd/2),Phaser.Math.Between(-100,-150),'asteroide').setScale(0.3);
        
      let met3 = this.meteoros.get().get(Phaser.Math.Between(this.widd/2,this.widd),Phaser.Math.Between(-200,-250),'asteroide').setScale(0.3);
    
      if(met1&&met2&&met3)//si fueron creados correctamente
      {
        met1.setActive(true);
        met1.body.velocity.y = this.caida;
  
        met2.setActive(true);
        met2.body.velocity.y = this.caida;

        met3.setActive(true);
        met3.body.velocity.y = this.caida;
      }

      met1.outOfBoundsKill = true;
      met2.outOfBoundsKill = true;
      met3.outOfBoundsKill = true;
      this.caida+=2;
      this.score.incrementPoints(30);
    }

    impact(aster)
    {
      this.score.incrementPoints(-30);
      this.caida+=10;
      if(aster.y>this.naveP.get().y-30)
      {
        if(aster.x<this.naveP.get().x)
          {
            //destruye
          }
          else if(aster.x>this.naveP.get().x)
          {
            //destruye
          }
    }else
      {
        this.lives.liveLost();
      }
    }

    
  endGame(completed)
  {
      if(completed)
      {
          this.scene.start('gameover');
      }
  }
    
}
