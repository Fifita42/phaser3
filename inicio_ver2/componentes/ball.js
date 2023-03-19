export class Ball {

    constructor(scene) {
      this.relatedScene = scene;
      this.isGlued = true;
    }
  
    create() {
      this.bullet = this.relatedScene.physics.add.sprite(401, 405, 'bulletTot');
      this.bullet.setBounce(1);
      this.bullet.setCollideWorldBounds(true);
    }
  
    isLost() {
      return (this.bullet.y > 500 && this.bullet.active) ? true : false;
    }
  
    get() {
      return this.bullet;
    }
  
    throw(velocity) {//lanzar la pelota luego del inicio
      this.bullet.setVelocity(velocity, -300);
      this.isGlued = false;//ya no esta pegada a la nave
    }
  
    removeGlue() {
      this.isGlued = false;
    }
  }