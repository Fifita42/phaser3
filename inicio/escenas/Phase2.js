import { Phase } from './Phase.js'

export class Phase2 extends Phase {

    create() 
    {
        this.bricks = this.relatedScene.physics.add.staticGroup();

        this.bricks.create(400, 270, 'orangebrik');
        this.bricks.create(360, 225, 'orangebrik');
        this.bricks.create(440, 225, 'orangebrik');
        this.bricks.create(480, 180, 'orangebrik');
        this.bricks.create(400, 180, 'orangebrik');
        this.bricks.create(320, 180, 'orangebrik');
        this.bricks.create(280, 135, 'orangebrik');
        this.bricks.create(360, 135, 'orangebrik');
        this.bricks.create(440, 135, 'orangebrik');
        this.bricks.create(520, 135, 'orangebrik');
        this.bricks.create(330, 90, 'orangebrik');
        this.bricks.create(470, 90, 'orangebrik');

        this.configureColisions();
    }
}