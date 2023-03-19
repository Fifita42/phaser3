import {wid} from '../index.js';
import {heig} from '../index.js';
export class Volver
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }
    create()
    {
            this.volverButton = this.relatedScene.add.sprite(wid/2,(heig/2)+150,'volver').setInteractive();//set interatic avisa cuando estan pasando cosas sobre el boton
    
            this.volverButton.on('pointerover',()=>//poner raton encima
            {
                this.volverButton.setFrame(1);
            });
            this.volverButton.on('pointerout',()=>//quitar raton de encima
            {
                this.volverButton.setFrame(0);
            });
            this.volverButton.on('pointerdown',()=>//hace click
            {
                location.href ='https://xenock20.github.io/HomeMixGames';
            })
    }
}