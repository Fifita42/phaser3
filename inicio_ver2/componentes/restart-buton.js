export class RestartButton
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    preload()
    {
        this.relatedScene.load.spritesheet('button','../images/restart.png',
        {
            frameWidth:190,
            frameHeight:49
        });
    }

    create()
    {
            this.startButton = this.relatedScene.add.sprite(400,430,'button').setInteractive();//set interatic avisa cuando estan pasando cosas sobre el boton
    
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