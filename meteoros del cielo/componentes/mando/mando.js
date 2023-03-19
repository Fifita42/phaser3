import {wid} from '../../index.js'
import {heig} from '../../index.js'
export class Mando
{
    constructor(scene, initialLives)
    {
        this.relatedScene = scene;
        this.initialLives = initialLives;
        this.widd = wid;
        this.heigg = heig;
        this.right = {isDown: false};
        this.left = { isDown: false };
        this.up = { isDown: false };
        this.down = { isDown: false };
        this.visibles;
        this.dispositivo;
    }

    create()
    {
        this.queDispositivoEstaUsando();
        this.rightButton = this.relatedScene.add.image(this.widd-150,this.heigg-230,'derecha').setInteractive({ draggable: true });this.rightButton.setOrigin(0,0);this.rightButton.setScale(2);
        this.leftButton = this.relatedScene.add.image(this.widd-330,this.heigg-230,'izquierda').setInteractive({ draggable: true });this.leftButton.setOrigin(0,0);this.leftButton.setScale(2);
        this.upButton = this.relatedScene.add.image(170,this.heigg-370,'izquierda').setInteractive({ draggable: true });this.upButton.angle = 90;this.upButton.setOrigin(0,0);this.upButton.setScale(2);
        this.downButton = this.relatedScene.add.image(170,this.heigg-200,'derecha').setInteractive({ draggable: true });this.downButton.angle = 90;this.downButton.setOrigin(0,0);this.downButton.setScale(2);
    
        this.leftButton.on('pointerdown', () => {
            this.left.isDown = true;
            this.right.isDown = false;
            
          });
          this.leftButton.on('pointerup', () => {
            this.left.isDown = false;
          });
          this.leftButton.on('dragend', () => {
            this.left.isDown = false;
          });
      

          this.rightButton.on('pointerdown', () => {
            this.left.isDown = false;
            this.right.isDown = true;
           
          });
          this.rightButton.on('pointerup', () => {
            this.right.isDown = false;
          });
          this.rightButton.on('dragend', () => {
            this.right.isDown = false;
          });


          this.upButton.on('pointerdown', () => {
            this.down.isDown = false;
            this.up.isDown = true;
          });
          this.upButton.on('pointerup', () => {
            this.up.isDown = false;
          });
          this.upButton.on('dragend', () => {
            this.up.isDown = false;
          });


          this.downButton.on('pointerdown', () => {
            this.down.isDown = true;
            this.up.isDown = false;
          });
          this.downButton.on('pointerup', () => {
            this.down.isDown = false;
          });
          this.downButton.on('dragend', () => {
            this.down.isDown = false;
          });
          if(!this.visibles)
          {
            this.rightButton.visible=false;
            this.leftButton.visible=false;
            this.downButton.visible=false;
            this.upButton.visible=false;
          }
        

    }

    queDispositivoEstaUsando()
    {
      let navegador = navigator.userAgent;
      if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
          this.dispositivo = "celular";
          console.log("Estás usando un dispositivo móvil!!");
        this.visibles = true;
        } else {
          this.dispositivo = "computadora";
          console.log("No estás usando un móvil");
      }
    }

}