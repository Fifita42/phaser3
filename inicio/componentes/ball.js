export class Ball {

    constructor(scene) {
      this.relatedScene = scene;
      this.isGlued = true;
    }
  
    create() {
      this.bullet = this.relatedScene.physics.add.image(385, 430, 'bullet');
      this.bullet.setBounce(1);
      this.bullet.setCollideWorldBounds(true);
    }
  
    isLost() {
      return (this.bullet.y > 500 && this.bullet.active) ? true : false;
    }
  
    get() {
      return this.bullet;
    }
  
    throw(velocity) {
      this.bullet.setVelocity(velocity, -300);
      this.isGlued = false;
    }
  
    removeGlue() {
      this.isGlued = false;
    }
  }