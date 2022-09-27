export class Game extends Phaser.Scene 
{
    constructor() 
    {
      super({ key: 'game' });
    }
    
    preload() {
      this.load.image('bg','background.jpg');
      this.load.image('plataforma','plataforma.png');

      this.load.atlas('megaman','megaman-sprite.png','mega-manSprites.json');

      this.load.atlas('balas','auxx/bulletTot.png','auxx/bulletTot.json');

      this.load.image('cuerpo','cuerpo.png');
    }
  
    create() 
    {
      this.physics.world.setBoundsCollision(true, true, true, true);
      this.bg = this.add.tileSprite(0,0,4800,700,'bg').setOrigin(0);
      this.platform = this.physics.add.image(400,400,'plataforma').setImmovable();
      this.platform.body.allowGravity = false;
      this.anims.create(
        {
          key: 'standing',
          frames: this.anims.generateFrameNames('megaman',
          {
            prefix:'stand',//nombre dentro del json son los 0
            //start: 0 //me diria desde cual comenzar
            end:9,//cuantos hay con ese nombre
            zeroPad:4//cantidad de 0 despues del nombre 
          }),
          repeat: -1
        });
      
      this.anims.create(
        {
          key:'running',
          frames: this.anims.generateFrameNames('megaman',
          {
            prefix: 'run',
            end: 11, 
            zeroPad:4
          }),
          repeat: -1
        });
      
        this.anims.create(
          {
            key:'jumping',
            frames: this.anims.generateFrameNames('megaman',
            {
              prefix: 'jump',
              end: 4, 
              zeroPad:4
            }),
            repeat: 0
          });


          this.anims.create(
            {
              key:'disparos',
              frames: this.anims.generateFrameNames('balas',
              {
                end: 6, 
                zeroPad:0
              }),
              frameRate: 10,
              repeat: -1
            });


        this.cuerpo = this.physics.add.image(400,200,'cuerpo');
        this.megaman = this.add.sprite(this.cuerpo.x,this.cuerpo.y,'megaman');
        //this.megaman.setCollideWorldBounds(true);
        //this.phsycs.add.collider(this.megaman,);
        this.physics.add.collider(this.cuerpo, this.platform);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.dis = this.physics.add.sprite(this.cuerpo.x,this.cuerpo.y,'balas');
        this.dis.visible = false;
        this.dis.setData('disparo',false);
        this.dis.body.allowGravity = false;
        }

      update()
      {
        this.megaman.y = this.cuerpo.y+5;
        this.megaman.x = this.cuerpo.x;

        if(this.cursors.left.isDown)
        {
          this.cuerpo.setVelocityX(-200);
          this.megaman.flipX = true;
          if(this.cuerpo.body.touching.down)
          {
            this.megaman.anims.play('running',true);
          }
        }
        else if(this.cursors.right.isDown)
        {
          this.cuerpo.setVelocityX(200);
          this.megaman.flipX = false;

          if(this.cuerpo.body.touching.down)
          {
            this.megaman.anims.play('running',true);
          }

          //dispara
          if(!this.dis.getData('disparo'))
          {
            this.dis.x = this.cuerpo.x;
            this.dis.y = this.cuerpo.y;
            this.dis.setVelocity(400,10);
            this.dis.visible = true;
            this.dis.setData('disparo',true);
            this.dis.anims.play('disparos');
            setTimeout(()=>{this.dis.visible = false;this.dis.setData('disparo',false)},1000);
          }


        }
        else 
        {
          this.cuerpo.setVelocityX(0);
          if(this.cuerpo.body.touching.down)
          {
            this.megaman.anims.play('standing',true);
          }
        } 
        
        if(this.cuerpo.body.touching.down&&this.cursors.up.isDown)
        {
          this.cuerpo.setVelocityY(-330);
          this.megaman.anims.play('jumping');
          
        }
      }
  } 

