export class Nave{
  constructor(scene) {
    this.relatedScene = scene;
    this.size = 1;
  }

  create() {
    this.naveP = this.relatedScene.physics.add.image(300,400, 'cuerpo').setImmovable().setScale(this.size);
    this.naveP.setCollideWorldBounds(true);
  }
  get()
  {
    return this.naveP;
  }
  mover(cursors, mando)
  {
   
    if (cursors.left.isDown||mando.left.isDown) {
        this.naveP.setVelocityX(-500);
      }
      else if (cursors.right.isDown||mando.right.isDown) {
        this.naveP.setVelocityX(500);
      }
      else
      {
        this.naveP.setVelocityX(0);
      }

    if(cursors.up.isDown||mando.up.isDown)
    {
        this.naveP.setVelocityY(-500);
    }
    else if(cursors.down.isDown||mando.down.isDown)
    {
        this.naveP.setVelocityY(500);
    }
    else {
        this.naveP.setVelocityY(-50);
    }
  }
}