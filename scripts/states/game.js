function Game() {}

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

    //Bombas
    this.bombsMax = 2;
    this.bombsPool = this.add.group();
    this.bombsPool.enableBody=true;
    this.keyBomb = 'voltor';
    this.frameBomb=0;

    //Player
    this.player = new Player(this.game, 32 * 6, 32 * 4, 'red', 0);
    this.game.physics.enable(this.rocks);
    map.setCollision(1214, true, 'Rocks');
    this.cursors = game.input.keyboard.createCursorKeys();


    //Ajustes
    this.ground.resizeWorld();
    this.rocks.resizeWorld();
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.rocks);

    this.player.handleMotionInput(this.rocks);
    this.player.handleBombInput();
    this.createBomb(this.player.x+this.player.width/2,this.player.y+this.player.height/2,this.keyBomb,0);
    console.log(this.bombsPool.total);
  },
  render: function() {
    // this.game.debug.body(this.player);
  },
  createBomb:function(x,y,key,frame){
    if(this.player.bombButtonJustPressed && this.bombsPool.total<this.bombsMax){
      var currentBomb = this.bombsPool.getFirstExists(false);
      
      if(!currentBomb){
        currentBomb = new Bomb(this.game, x, y, key,frame);
        this.bombsPool.add(currentBomb);
      }
      else{
        console.log('en el resetear');
        currentBomb.resetBomb(x, y);
      }
    }
  },
};