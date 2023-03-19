export let record = -30;
export class Meteor{
    constructor(scene) {
      this.relatedScene = scene;
      this.size = 1;
    }
    create() {
        this.meteoros = this.relatedScene.physics.add.group(
            {
              defaultKey: 'asteroide',
              setXY:
              {
                x:150,
                y:150
              },
              //maxSize:100 //limitar la cantidad de sprites que se pueden crear de ese grupo.
            }
          );
        //   this.meteoros.children.iterate(x=>
        //     {
        //         x.body.allowGravity = false;
        //     });
    }
    get()
    {
      return this.meteoros;
    }

    setAsteroidCollicion()
    {
        this.relatedScene.physics.add.collider(this.relatedScene.naveP.get(), this.meteoros, this.impact, null, this);
    }

    impact(nave,asteroide)
    {
        this.relatedScene.impact(asteroide);
        //asteroide.disableBody(false,false); 
        asteroide.destroy();
    }
  }