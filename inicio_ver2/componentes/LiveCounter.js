export class LiveCounter
{
    constructor(scene, initialLives)
    {
        this.relatedScene = scene;
        this.initialLives = initialLives;
    }

    create()
    {
        let displacement = 60;//cant de pixeles entre imagen de vidas
        let firstPosition = 800 -((this.initialLives)*displacement);
        this.liveImages = this.relatedScene.physics.add.staticGroup(
        {
            setScale:
            {
                x: 0.5,
                y: 0.5
            },
            key:'naveP',
            frameQuantity: this.initialLives,
            gridAlign:
            {
                width: this.initialLives,
                height:1,
                cellWidth: displacement,
                cellHeight: 30,
                x: firstPosition,
                y: 30
            }
        })
    }

    liveLost()//funcion llamada por game.js
    {
        if (this.liveImages.countActive() == 0)//si perdio cuando tenia una vida, manda false, que activa gameover
        {
            this.relatedScene.endGame(false);//manda datos al endgame y a la comprovacion luego de la perdida de la bala.
            return false;//false para reiniciar el juego y false para no reiniciar las posiciones
        }
        let currentLiveLost = this.liveImages.getFirstAlive();//agarra el primer elemento disponible del grupo
        currentLiveLost.disableBody(true, true);//la desaparezco
        return true;
    }

    increase() {
        let targetPos = 765;
        this.liveImages.getChildren().forEach( (item, index) => {
        item.x = item.x - 60;
        })
        let newLive = this.liveImages.create(targetPos, 60, 'naveP');
        newLive.setScale(0.5,0.5);
    }

}