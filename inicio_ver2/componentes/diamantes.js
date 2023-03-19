export class Diamonds {
    constructor(scene) {
      this.relatedScene = scene;
      this.diamonds = this.relatedScene.physics.add.group();
      this.relatedScene.physics.add.collider(this.relatedScene.naveP.get(), this.diamonds, this.bulletImpact, null, this);
    }
    
    create(x, y, sprite, relatedPower) {
      let diamond = this.diamonds.create(x, y, sprite)
      diamond.relatedPower = relatedPower;
      diamond.setScale(0.6);
      diamond.anims.play(sprite + 'animation');
      diamond.body.setAllowRotation();
      diamond.body.setAngularVelocity(100);
      diamond.body.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      diamond.setBounce(1);
      diamond.setCollideWorldBounds(true);
    }
  
    bulletImpact(bullet, diamond) {
      diamond.destroy();
      diamond.relatedPower.givePower();
      
      /*es para en su lugar chocarla con la bala
      let currentVelocity = naveP.body.velocity;
      this.relatedScene.removeGlueFromBall();
      if(currentVelocity.y > 0) {
        bullet.body.setVelocityY(300);
      } else {
        bullet.body.setVelocityY(-300);
      }*/
    }
  }

