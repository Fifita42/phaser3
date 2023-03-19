import { RestartButton } from '../componentes/restart-buton.js';
import { Volver } from '../componentes/volver-button.js';
import {wid} from '../index.js';
import {heig} from '../index.js';
export class Gameover extends Phaser.Scene//exporto una escena
{
    constructor() {
        super({ key: 'gameover' });//nombre clave de esta escena
        this.restartButton = new RestartButton(this);
        this.volver = new Volver(this);
    }
    create()
    {
        this.bg = this.add.image(0,0,'bg').setOrigin(0,0).setScale(1.4);
        this.gameoverImage = this.add.image(wid/2,(heig/2)-100,'gameover');
        this.restartButton.create();
        this.volver.create();
    }

}