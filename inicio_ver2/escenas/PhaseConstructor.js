import { Phase1 } from './Phase1.js';
import { Phase2 } from './Phase2.js';
import { Phase4 } from './Phase4.js';
export class PhaseConstructor 
{//almacena todos los niveles
    constructor(scene)
    {
        this.relatedScene = scene;
        this.phases = [
        Phase4,
        Phase2,
        Phase1,
    ];
    }

    create() 
    {
        let CurrenPhaseClass = this.phases.pop();//es igual al ultimo nivel, luego se borra ese nivel de phases. buscar .pop javascript para mas info.
        this.currentPhase = new CurrenPhaseClass(this.relatedScene);//CurrenPhaseClass contiene 1 nivel, este nivel contiene el archivo Phase.js, este archivo tiene un constructor
        //que le pide la escena donde imprimir sus cosas y con que detectar coliciones
        return this.currentPhase.create();//devuelvo al archivo game.js este nivel y uso la funcion create() que imprime el nivel
    }

    nextLevel()//es llamada por game.js cada vez que choca con un bloque
    {
        if(this.phases.length == 0) {//verifica si se completaron todos los niveles de phases al detectar si .pop elimino todos
            this.relatedScene.endGame(true);//llama al endgame que posee game.js
        } 
        else 
        {
            this.currentPhase.deleteFixedBricks();
            return this.create();//le devuelve el proximo nivel. borra nivel anterior, crea variable de proximo nivel con la escena de game.js, imprime proximo nivel(proceso de liinea 17 a 20)
        }
    }

    isPhaseFinished(){//es llamada por game.js
        return this.currentPhase.isPhaseFinished();//nivel contiene phase.js, phase.js contiene isPhaseFinished, que comprueva si destruyo todos los bloques
      //se hace este proceso en phase.js ya que en phaseconstructor.js no existe this.briks para comprobarlos
    }
}