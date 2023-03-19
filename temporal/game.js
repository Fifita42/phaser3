export class Game extends Phaser.Scene {//permitimos enviar esta clase a quien lo pida
//Phaser.Scene contiene una escena básica y nosotros la extendemos para darle la funcionalidad que requiere nuestro juego.
    constructor() {
      super({ key: 'game' });//nombre clave de esta escena
    }
    preload() 
    {
      this.load.image('bg','background.jpg');
      this.load.atlas('navecita','cohete.png','sprite.json');
    }
    create() {
       //this.physics.world.setBoundsCollision(true, true, true, true);//todo es fisico menos el suelo
       this.bg = this.add.tileSprite(0,0,4800,700,'bg').setOrigin(0);
       this.bg.setInteractive();
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
        this.naveP = this.physics.add.sprite(0,0, 'navecita')//.setOrigin(0);
        //this.naveP.setScale(1.5,1.5);
        //this.naveP.angle = 45;
       //this.naveP.body.allowGravity = false;//la gravedad no lo afecta

        this.naveP.setCollideWorldBounds(true);
     
     }


    update() 
    {//se ejecuta constantemente
  
  /*  let pointer = this.input.activePointer;
    if (pointer.isDown) {
    var touchX = pointer.x;
    var touchY = pointer.y;
    this.naveP.x = touchX;
    this.naveP.y = touchY;
     }
     */
 /*    this.input.on('pointerdown', function(pointer){
    var touchX = pointer.x;
    var touchY = pointer.y;
    this.naveP.x = touchX;
    this.naveP.y = touchY;
}, this);
*//*
this.input.on('pointerup', function(pointer){
    var touchX = pointer.x;
    var touchY = pointer.y;
     this.naveP.x = touchX;
    this.naveP.y = touchY;
}, this);*/
/*
this.bg.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    this.naveP.x = localX;
    this.naveP.y = localY;
}, this);
*/
/*this.bg.setInteractive({ draggable: true }).on('dragstart', function(pointer, dragX, dragY){
    this.naveP.x = dragX;
    this.naveP.y = dragY;
    }, this);*/
  this.naveP.setInteractive({ draggable: true }).on('drag', function(pointer, dragX, dragY){
        this.naveP.setPosition(dragX, dragY);
    }, this);
    /*this.naveP.setInteractive({ draggable: true }).on('dragend', function(pointer, dragX, dragY, dropped){
      console.log(dragX);//esta función es para detectar que punto fue tocado
      console.log(dragY);
       //this.naveP.x += dragX;
       //this.naveP.y += dragY;
    }, this);*/
    this.naveP.anims.play('mov',true);
    }
}
