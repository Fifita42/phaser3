export const INITIAL_PLATFORM_SIZE = 0.6;
export const LARGE_PLATFORM_SIZE = 1;

export class Platform {
  constructor(scene) {
    this.relatedScene = scene;
    this.size = INITIAL_PLATFORM_SIZE;
    this.gluePower = false;
    this.hasBallGlued = false;
  }

  create() {
    this.naveP = this.relatedScene.physics.add.image(400, 460, 'naveP').setImmovable().setScale(this.size);
    this.naveP.setCollideWorldBounds(true);
  }

  hasGluePower() {
    return this.gluePower;
  }
  
  updatePosition(bullet, cursors) {
    if (cursors.left.isDown) {
      this.naveP.setVelocityX(-500);
      if (bullet.isGlued || this.hasBallGlued) {
        bullet.get().setVelocityX(-500);
      }
    }
    else if (cursors.right.isDown) {
      this.naveP.setVelocityX(500);
      if (bullet.isGlued || this.hasBallGlued) {
        bullet.get().setVelocityX(500);
      }
    }
    else {
      this.naveP.setVelocityX(0);
      if (bullet.isGlued || this.hasBallGlued) {
        bullet.get().setVelocityX(0);
      }
    }
  }

  setInitialState(bullet) {
    this.naveP.x = 400;
    this.naveP.y = 460;
    bullet.get().setVelocity(0, 0);
    bullet.get().x = 385;
    if (this.size == LARGE_PLATFORM_SIZE) {
      bullet.get().y = 420;
    } else {
      bullet.get().y = 430;
    }
    bullet.isGlued = true;
  }

  setSize(size) {
    this.size = size;
    this.naveP.setScale(size);
  }
  setBigSize() {
    this.setSize(LARGE_PLATFORM_SIZE);
    this.gluePower = false;
  }
  setInitialSize() {
    this.setSize(INITIAL_PLATFORM_SIZE);
  }

  removeGlue() {
    this.gluePower = false;
  }

  setGluePower() {
    this.setInitialSize();
    this.gluePower = true;
  }

  get() {
    return this.naveP;
  }

  isGluedBecausePower() {
    return (this.hasGluePower() && this.hasBallGlued)
  }
}