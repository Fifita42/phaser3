export class Scoreboard//exporto ina clase
{
    constructor(scene)
    {
        this.score = -30;
        this.relatedScene = scene;
    }
create()//el metodo se puede llamar como quiera
    {

        this.scoreText = this.relatedScene.add.text(16, 16, 'PUNTOS: 0', { 
            fontSize: '20px', 
            fill: '#fff', 
            fontFamily: 'verdana, arial, sans-serif' 
        });
    }

    incrementPoints(points)//es llamadda por game.js
    {
        this.score+=points;
        this.scoreText.setText('PUNTOS: ' + this.score);//inserta el texto
    }
}