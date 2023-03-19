import {wid} from '../../index.js'
import {heig} from '../../index.js'
export class LiveCounter
{
    constructor(scene, initialLives)
    {
        this.relatedScene = scene;
        this.initialLives = initialLives;
        this.widd = wid;
    }

    create()
    {
        let displacement = 50;//cant de pixeles entre imagen de vidas
        let firstPosition = this.widd - ((this.initialLives)*displacement);
        this.liveImages = this.relatedScene.physics.add.staticGroup(
        {
            setScale:
            {
                x: 0.9,
                y: 0.9
            },
            key:'navecita',
            frameQuantity: this.initialLives,
            gridAlign:
            {
                width: this.initialLives,
                height:1,
                cellWidth: displacement,
                cellHeight: 30,
                x: firstPosition,
                y: 10
            }
        })
    }

    liveLost()//funcion llamada por game.js
    {
        if (this.liveImages.countActive() == 1)//si perdio cuando tenia una vida, manda false, que activa gameover
        {
            //console.log('perdiste');//manda datos al endgame y a la comprovacion luego de la perdida de la bala.
            this.relatedScene.endGame(true);//false para reiniciar el juego y false para no reiniciar las posiciones
        return;
        }
        let currentLiveLost = this.liveImages.getFirstAlive();//agarra el primer elemento disponible del grupo
        currentLiveLost.disableBody(true, true);//la desaparezco
    }

    increase() {
        let targetPos = 40*this.initialLives;
        this.liveImages.getChildren().forEach( (item, index) => {
        item.x = item.x - 60;
        })
        let newLive = this.liveImages.create(targetPos, 30, 'navecita');
        newLive.setScale(0.5,0.5);
    }

}