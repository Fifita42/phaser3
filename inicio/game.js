import{PhaseConstructor} from './escenas/PhaseConstructor.js';
import{Scoreboard} from './componentes/Scoreboard.js';//traigo otro script y lo incluyo
import{LiveCounter} from './componentes/LiveCounter.js';//traigo otro script y lo incluyo



window.addEventListener('keydown',(e)=>//la cree para reiniciar la pagina con enter
{
  if(e.key=='Enter')location.reload();
});


export class Game extends Phaser.Scene {//permitimos enviar esta clase a quien lo pida
//Phaser.Scene contiene una escena básica y nosotros la extendemos para darle la funcionalidad que requiere nuestro juego.
    constructor() {
      super({ key: 'game' });//nombre clave de esta escena
    }
    init() {//se ejecuta solo una vez al inicio
        this.phaseConstructor = new PhaseConstructor(this);//instancio el constructor de los niveles
        this.scoreboard = new Scoreboard(this);//instancio una nueva clase scoreboard con todos los datos de esta escena
        this.liveCounter = new LiveCounter(this, 3);//Esto permite que, cada vez que la escena del juego se resetea, se cree un nuevo contador de vidas.
      }
    preload() {//precarga cosas
      this.load.image('background', 'images/background.jpg');//carga la imagen y le da nombre background
      this.load.image('naveP', 'images/NaveAnim/nav1.png');
      //this.load.image('bullet', 'images/bullet/b1.png');
      this.load.image('bluebrik', 'images/brickBlue.png');
      this.load.image('blackbrik', 'images/brickBlack.png');
      this.load.image('greenbrik', 'images/brickGreen.png');
      this.load.image('orangebrik', 'images/brickOrange.png');
      this.load.image('yellowbrick', 'images/brickYellow.png');
      this.load.image('greybrik', 'images/brickGrey.png');

      this.load.atlas('bulletTot','images/bullet/bulletTot.png','images/bullet/bulletTot.json');

      this.load.audio('laser', 'sonidos/laser.mp3');

      this.load.spritesheet('bluediamond',
      'images/diamondSprite.png',
      { frameWidth: 48, frameHeight: 48 }
);
    }
  
    create() {//crea luego de finalizada la precarga//add ya es variable de phaser
        this.add.image(410, 250, 'background');//imprime el bacground. las coordenadas se toman desde el centro de la imagen y la esquina izquierda superior
        this.physics.world.setBoundsCollision(true, true, true, false);//todo es fisico menos el suelo
        //this.miGrupo = this.physics.add.staticGroup();//creo un grupo de imagenes
        //this.miGrupo.create(253,244,'bluebrik');
        // this.gameoverImage = this.add.image(400, 250, 'gameover');//imprime game over y le da sus propiedades a una variable para despues modificarlas
        // this.gameoverImage.visible = false;//oculto la imagen
        // this.congratsImage = this.add.image(400,90,'congratulations');
        // this.congratsImage.visible = false;
        this.naveP = this.physics.add.image(400, 400, 'naveP').setImmovable();;//agrego la nave con fisicas, y la funcion que le inpide ser impulsada por otros objetos
        this.naveP.body.allowGravity = false;//la gravedad no lo afecta
        this.naveP.setCollideWorldBounds(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();//accede a las teclas, solo a las direccionales
        
        
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


        this.bullet = this.physics.add.sprite(404, 322, 'bulletTot');//agrega una imagen con fisicas y la almaceno en bullet
        this.bullet.setData('pegada',true);//le doy para que almacene un dato el cual me dira si se pega a la nave
        this.bullet.setCollideWorldBounds(true);//le da estructura contra el canvas
        this.bullet.setBounce(1);//rebota segun la fuersa de choque
        //this.bullet.setVelocity(100, 10)//le da velocidad X e Y. aparte estan setVelocityX() y setVelocityY()
        
        /*
        let velocity = 100 * Phaser.Math.Between(1.3, 2);//numero aleatorio entre 1.3 y 2
        if (Phaser.Math.Between(0, 10) > 5)//numero entre 0 y 10
        {
            velocity = 0 - velocity;//volver negativa la velocidad
        }//esto hace que la velocidad sea hacia la derecha, pero si se cumple el if, va hacia la izquierda
        this.bullet.setVelocity(velocity, 10);
        */
        this.physics.add.collider(this.bullet, this.naveP, this.navePImpact, null, this);//reacciona al choque entre bullet y nave
        /*
        Objeto de colisión 1: el primer objeto sobre el que se configura 
        la colisión.
        Objeto de colisión 2: el segundo objeto implicado en la colisión.
        Callback de colisión: es una función que se ejecutará cuando los 
        dos elementos se han chocado. Esta función es la clave de la 
        implementación del comportamiento, pues es donde se permite 
        especificar el código del Javascript a ejecutar como consecuencia
        del impacto.
        Callback para decidir si hay colisión: esta sería una 
        función que permite decidir si se debe ejecutar el comportamiento 
        de colisión o no. Es una función que siempre debe devolver un
        boleano. Si le entregamos null, como en nuestro ejemplo, siempre 
        que se toquen los elementos se producirá el comportamiento de 
        colisión.
        El contexto sobre el que se ejecutarán los callback de colisión.
        Este contexto será habitualmente "this", para que dentro del 
        código de la función, la variable this siga siendo igual a la 
        escena sobre la que estamos trabajando. Aquí lo normal será 
        pasarle "this", pero podríamos pasarle otro objeto cualquiera, 
        para que "this" dentro del método callback de la colisión sea una 
        referencia a ese objeto. simplificad, es el parametro a enviar a la funcion navImpact
        */
        this.scoreboard.create();//Creo el record
        this.disparar = this.sound.add('laser');//creo la variable del sonido que puedo controlar
        this.liveCounter.create();//creo las vidas
        this.phaseConstructor.create();//llamo al nivel y lo imprimo
        
        this.anims.create({
          key: 'bluediamondanimation',
          frames: this.anims.generateFrameNumbers('bluediamond', { start: 0, end: 7 }),
          frameRate: 10,
          repeat: -1,
          yoyo: true,
    });
    this.miSprite = this.physics.add.sprite(40, 40, 'bluediamond');
    this.miSprite.anims.play('bluediamondanimation');
    this.physics.add.collider(this.naveP, this.miSprite);
    }


    update() 
    {//se ejecuta constantemente
        if (this.cursors.left.isDown) {//tecla izquierda
          this.naveP.setVelocityX(-500);//lo manda hacia atras
          if(this.bullet.getData('pegada'))//agarro uno de sus datos
          {
            this.bullet.setVelocityX(-500);
          }
        }
        else if (this.cursors.right.isDown) {
          this.naveP.setVelocityX(500);
          if(this.bullet.getData('pegada'))
          {
            this.bullet.setVelocityX(500);
          }
        }
        else {
          this.naveP.setVelocityX(0);//se detiene
          if(this.bullet.getData('pegada'))
          {
          this.bullet.setVelocityX(0);
          }
        }
        if(this.bullet.y > 500 && this.bullet.active) {//la bala salio del mapa
          // this.gameoverImage.visible = true;
          // this.scene.pause();//detiene todo//scene ya es una variable de phaser
          // this.briks.setVisible(false);//ocultar todos los elementos de la grilla
          let gameNotFinished = this.liveCounter.liveLost();//funcion de livecount.js, quita una vida y comprueba la cantidad. devuelve true si sigue vivo
          if (gameNotFinished) 
          {//perdio una vida perosigue vivo. reinicio posiciones.
           this.setInitialPlatformState(); //this.showGameOver();
          }
          
        
        }

        if(this.cursors.up.isDown&&this.bullet.getData('pegada'))
        {
          this.bullet.setVelocity(-75,-300);
          this.bullet.setData('pegada',false);
          this.bullet.anims.play('balas',true);
          this.disparar.play();
        }
    }

    navePImpact(bullet,naveP)//llamado cada vez que la nave y la bala chocan
    {
      this.disparar.play();
      this.scoreboard.incrementPoints(1);//cada vez que choca, le envio un punto
      let relativeImpact = bullet.x - naveP.x;//decide si toco mas a la izquierda o a la derecha- - es izq y + es derech.
      if(relativeImpact<0.1&&relativeImpact>-0.1)
      {
      bullet.setVelocityX(Phaser.Math.Between(-10,10));//en caso de que el resultado se hacerque a 0, dar una velocidad aleatoria
      }
      else
      {
        bullet.setVelocityX(10*relativeImpact);
      }
    }

    brickImpact(bullet,brik)//no hay que borrar bullet ya que al enviar los parametros se emvio primero bullet, luego brik
    {//disableBody lo desaparece del grupo
      brik.disableBody(true,true);//primer parametro: quita collider, segundo parametro: hace invisible
      this.scoreboard.incrementPoints(10);
      /*if(this.briks.countActive()===0)//verifica cuantos elementos estan activos
      {
        // this.congratsImage.visible=true;
        // this.scene.pause();
        this.endGame(true);
      }*/
      if (this.phaseConstructor.isPhaseFinished()) { //va a phaseConstructor.js al metodo isPhaseFinished que va al nivel respectivo que va a phase.js que va a isPhaseFinished que devuelve true if this.bricks.countActive() === 0
        this.phaseConstructor.nextLevel();//pasa al siguiente nivel o le envia true a endGame para terminar el juego
        this.setInitialPlatformState();//devuelve la nave a su posicion
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

  setInitialPlatformState()//devuelve las posiciones a lo default
  {
      this.naveP.x = 400;
      this.naveP.y = 400;
      this.bullet.setVelocity(0,0);
      this.bullet.x = 404;
      this.bullet.y = 322;
      this.bullet.setData('pegada', true);
      //this.bullet.anims.stop('balas');
      this.bullet.anims.stop(null,true);
    }

    increaseLives() {
      this.liveCounter.increase();
    }

}
