import {wid} from '../index.js';
import {heig} from '../index.js';
export class RestartButton
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }
    create()
    {
            this.startButton = this.relatedScene.add.sprite(wid/2,(heig/2)+100,'button').setInteractive();//set interatic avisa cuando estan pasando cosas sobre el boton
    
            this.startButton.on('pointerover',()=>//poner raton encima
            {
                this.startButton.setFrame(1);
            });
            this.startButton.on('pointerout',()=>//quitar raton de encima
            {
                this.startButton.setFrame(0);
            });
            this.startButton.on('pointerdown',()=>//hace click
            {
                this.relatedScene.scene.start('game');//start inicia otra escena especificada
            })
    }
}