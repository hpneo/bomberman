function Game() {
      this.nextBomb = 0;
      this.bombRate = 500;
}

Game.prototype = {
  preload: function() {},
  create: function() {
    //Mundo
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var map = this.add.tilemap('level_1');
    map.addTilesetImage('Level 1', 'tilemap_cave');
    this.ground = map.createLayer('Ground'),
    this.rocks = map.createLayer('Rocks');
    this.rocks.enableBody = true;
    //Musica
    this.musicLvl1 = this.add.audio('music-lvl1',1,true);
    this.musicLvl1.play();

    //Bombas
    this.bombsMax = 2;
    this.bombsPool = this.add.group();
    this.bombsPool.enableBody=true;
    this.bombsPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bombsPool.setAll('body.immovable',true);
    this.bombsPool.setAll('body.allowGravity',false);
    
    this.keyBomb = 'voltor';
    this.frameBomb=0;
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody=true;
    this.sizeExplosion = 1;

    //Player
    this.player = new Player(this.game, 32 * 6, 32 * 4, 'red', 0);
    this.bombs = this.game.add.group();
    this.rocks.enableBody = true;
    this.game.physics.enable(this.rocks);
    map.setCollision(1214, true, 'Rocks');
    this.cursors = game.input.keyboard.createCursorKeys();


    //Ajustes
    this.ground.resizeWorld();
    this.rocks.resizeWorld();
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.rocks);
    this.physics.arcade.collide(this.player,this.bombsPool);

    this.player.handleMotionInput(this.rocks);
    this.player.handleBombInput();
    this.createBomb(this.player.x+this.player.width/2,this.player.y+this.player.height/2,this.keyBomb,0);

  },
  render: function() {
    // this.game.debug.body(this.player);
  },
  createBomb:function(x,y,key,frame){


    if(this.player.bombButtonJustPressed && this.bombsPool.total<this.bombsMax && this.time.now>this.nextBomb){
      var currentBomb = this.bombsPool.getFirstExists(false);
      this.nextBomb = this.time.now + this.bombRate;

      if(!currentBomb){
        currentBomb = new Bomb(this.game, x, y, key,frame,this.explosionPool,this.sizeExplosion);
        this.bombsPool.add(currentBomb);
      }
      else{
        currentBomb.resetBomb(x, y);
      }
    }
  },

};