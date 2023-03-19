import { RestartButton } from '../componentes/restart-buton.js'
export class Congratulations extends Phaser.Scene//exporto una escena
{
    constructor() {
        super({ key: 'congratulations' });//nombre clave de esta escena
        this.restartButton = new RestartButton(this);
    }

    preload()
    {
        this.load.image('congratula', '../images/congratulations.png');
        this.restartButton.preload();
    }
    create()
    {
        this.add.image(410,250,'background');//como ya se preload el background en game, no hace falta repetir
        this.restartButton.create();
        this.congratsImage = this.add.image(400,90,'congratula');
    }

}