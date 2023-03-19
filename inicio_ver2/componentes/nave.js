export const INITIAL_PLATFORM_SIZE = 0.6;
export const LARGE_PLATFORM_SIZE = 1;

export class Platform {
  constructor(scene) {
    this.relatedScene = scene;
    this.size = INITIAL_PLATFORM_SIZE;
    this.gluePower = false;
    this.hasBallGlued = false;//actualmente tiene la bala pegada
  }

  create() {
    this.naveP = this.relatedScene.physics.add.image(400, 460, 'naveP').setImmovable().setScale(this.size);
    this.naveP.setCollideWorldBounds(true);
  }

  hasGluePower() {//es para revisar si tiene el poder o no
    return this.gluePower;
  }
  
  updatePosition(bullet, cursors) {//mover la nave ,y la bala(si es que esta pegada)
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

  setInitialState(bullet) {//devolver la nave a su posicion, la bala tambien
    this.naveP.x = 400;
    this.naveP.y = 460;
    bullet.get().setVelocity(0, 0);
    bullet.get().x = 401;
    if (this.size == LARGE_PLATFORM_SIZE) {//si esta agigantada la nave
      bullet.get().y = 435;
    } else {
      bullet.get().y = 405;
    }
    bullet.isGlued = true;
  }

  setSize(size) {//cambiar de tamaño la nave
    this.size = size;
    this.naveP.setScale(size);//devuelvo la nave a su tamaño si antes era grande o si gano tamaño
  }
  setBigSize() {
    this.setSize(LARGE_PLATFORM_SIZE);//volver grande a  la nave
    this.gluePower = false;
  }
  setInitialSize() {//hace la nave chiquita
    this.setSize(INITIAL_PLATFORM_SIZE);//llama a la funcion setsize
  }

  removeGlue() {//desactivar la habilidad pegamento
    this.gluePower = false;
  }

  setGluePower() {//activar la habilidad pegamento
    this.setInitialSize();//devuelve el tamaño a la normalidad
    this.gluePower = true;//activa habilidad
  }

  get() {//me facilita tener que escribir en game.js this.bullet.bullet
    return this.naveP;
  }

  isGluedBecausePower() {//esta activada la habilidad pegamento?
    return (this.hasGluePower() && this.hasBallGlued)
  }
}