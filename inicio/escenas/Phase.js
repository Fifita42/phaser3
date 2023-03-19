export class Phase//esta tiene todas las funciones en comun de todos los niveles
{
    constructor(scene) 
    {
        this.relatedScene = scene;
        this.powers = [];
    }
    
    configureColisions()//colision entre bala y nave
    {
        this.relatedScene.physics.add.collider(this.relatedScene.bullet, this.bricks, this.relatedScene.brickImpact, null, this.relatedScene);//llama a brickImpact de game.js
    }
    
    configureColisionsFixed() {
        this.relatedScene.physics.add.collider(this.relatedScene.bullet, this.fixedBricks, this.relatedScene.fixedBrickImpact, null, this.relatedScene);
      }
    
      deleteFixedBricks() {//borrar todos los bloques fixed para pasar al siguiente nivel
        if(this.fixedBricks) {//si hay bloques fixed
          this.fixedBricks.getChildren().forEach(item => {
            item.disableBody(true, true);
          })
        }

        if(this.diamonds) {
          this.diamonds.diamonds.getChildren().forEach(item => {
            item.disableBody(true, true);
          });
        }
        
      }
    

    isPhaseFinished()//comprueba si termino el nivel actual
    {
        return (this.bricks.countActive() === 0)//devuelve true si destruyo todos los bloques
    }

    setBrickCollider(element) {
      this.relatedScene.physics.add.collider(this.bricks, element);
      if (this.fixedBricks) {
        this.relatedScene.physics.add.collider(this.fixedBricks, element);
      }
  }

  getBrickIndex(brick) {
    let children = this.bricks.getChildren();
    for(let i in children) {
      if (children[i] == brick) {
        return i;
      }
    }
  }

  brickImpact(bullet, brick) {
    let brickIndex = this.getBrickIndex(brick);
    if(this.powers[brickIndex]) {
      this.powers[brickIndex].create(bullet.x, bullet.y)
    }
    this.relatedScene.brickImpact(bullet, brick);
  }

}