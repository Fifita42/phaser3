import { RestartButton } from '../componentes/restart-buton.js'
export class Gameover extends Phaser.Scene//exporto una escena
{
    constructor() {
        super({ key: 'gameover' });//nombre clave de esta escena
        this.restartButton = new RestartButton(this);
    }

    preload()
    {
        this.load.image('gameover', '../images/gameover.png');
        this.restartButton.preload();
    }
    create()
    {
        this.add.image(410,250,'background');//como ya se preload el background en game, no hace falta repetir
        this.restartButton.create();
        this.gameoverImage = this.add.image(400,250,'gameover');
    }

}