function Game() {
      this.nextBomb = 0;
      this.bombRate = 500;
}

Game.prototype = {
  loadLevel: function(index) {
    var levels = this.game.cache.getJSON('levels'),
        levelsIndex = index - 1,
        level = levels[levelsIndex];

    this.map = this.add.tilemap('level_' + index);
    this.map.addTilesetImage(level.title, level.tileset);
    this.map.setCollision(level.rockId, true, 'Rocks');

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level.data);
    this.easystar.setAcceptableTiles([0]);
    //Musica
    this.backgroundMusic = this.add.audio('level_' + index, 0.6, true);
    this.backgroundMusic.play();

    this.level = level;
  },
  create: function() {
    //Mundo
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.loadLevel(this.game.rnd.between(1, 3));

    this.ground = this.map.createLayer('Ground'),
    this.rocks = this.map.createLayer('Rocks');
    this.rocks.enableBody = true;
    this.game.physics.arcade.enable(this.rocks);
    this.rocks.enableBody = true;
    this.rocks.immovable = true;

    //Bombas
    this.bombsPool = this.add.group();
    this.bombsPool.enableBody = true;
    this.bombsPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bombsPool.setAll('body.immovable', true);
    this.bombsPool.setAll('body.allowGravity', false);

    this.keyBomb = 'voltorb';
    this.frameBomb = 0;
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.setAll('body.immovable', true);
    this.explosionPool.setAll('body.allowGravity', true);
    this.explosionRange = 1;


    this.enemyPool = this.add.group();

    //this.game.time.events.loop(5000, this.addEnemy, this);
    this.cursors = game.input.keyboard.createCursorKeys();

    var availableSpaces = [];

    this.rocks.layer.data.forEach(function(row) {
      row.forEach(function(cell) {
        if (cell.index === -1) {
          availableSpaces.push({ x: cell.x, y: cell.y });
        }
      });
    });

    this.availableSpaces = availableSpaces;

    var font = {
          font: '15px "Pokemon Regular"',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center',
        };

    //Player
    var pos=this.availableSpaces[this.availableSpaces.length - 1];
    this.player = new Player(this.game, 32 * pos.x, 32 * 0, 'red', 0);
    this.bombs = this.game.add.group();

    this.scoreText = this.add.text(this.game.world.width - 30, 10, this.player.score.toString(), font);

    //Ajustes
    this.ground.resizeWorld();
    this.rocks.resizeWorld();

    this.addEnemy(1);
    this.addEnemy(2);
    this.addEnemy(3);

    this.handleEnemyMovement();
    //this.game.time.events.loop(1000, this.handleEnemyMovement, this);
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.rocks);
    this.physics.arcade.collide(this.enemyPool, this.rocks);
    this.physics.arcade.collide(this.player, this.enemyPool);
    this.physics.arcade.collide(this.enemyPool, this.bombsPool);
    this.physics.arcade.collide(this.player, this.bombsPool);
    this.physics.arcade.overlap(this.player, this.explosionPool, this.destroyPlayer, null, this);
    this.physics.arcade.overlap(this.enemyPool, this.explosionPool, this.destroyEnemy, null, this);

    this.player.handleMotionInput(this.rocks);
    this.player.handleBombInput();

    if (this.player.bombButtonJustPressed && this.player.canDropBombs(this.bombsPool) && this.time.now > this.nextBomb) {
      this.createBomb(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, this.keyBomb, 0);
    }

    this.enemyDropBomb();

    if(this.easystar){
      this.easystar.calculate();
    }

  },

  enemyDropBomb: function(){
      var enemyRandom = getRandomInt(0,this.enemyPool.children.length-1);
      if (this.enemyPool.children[enemyRandom].canDropBombs(this.bombsPool)
      && this.time.now > this.nextBomb
      && this.enemyPool.children[enemyRandom].alive) {
        this.createBomb(this.enemyPool.children[enemyRandom].x + this.enemyPool.children[enemyRandom].width / 2, this.enemyPool.children[enemyRandom].y + this.enemyPool.children[enemyRandom].height / 2, this.keyBomb, 0);
      }
  },
  handleEnemyMovement: function(){
   for (var i = 0, len = this.enemyPool.children.length; i < len; i++) {
     console.log("este es " + i);
     this.findPathForEnemy(this.enemyPool.children[i],function(){
       this.handleEnemyMovement();
     });
    }

  },
  findPathForEnemy:function(enemy, callback){
    this.easystar.findPath(enemy.x/32, enemy.y/32,7,7,function(path){
            console.log(this.enemyPool);
          });
  },
  walkEnemy:function(path){
    var i = 0;
    console.log(path)
     this.game.time.events.loop(Phaser.Timer.SECOND, function(){
          if(i < path.length){
            console.log("PATH: X " + path[i].x + " Y " +path[i].y);
            this.enemyPool.children[0].x = path[i].x;
            i++;
          }
     });
  },
  addEnemy: function(enemyID) {

    var currentEnemy = this.enemyPool.getFirstExists(false),
        positionIndex = this.game.rnd.between(0, this.availableSpaces.length - 1),
        position = this.availableSpaces[positionIndex];
    var finalPos;
    if(enemyID ==1)
    {
      finalPos = this.availableSpaces[this.availableSpaces.length - 1];
    }
    else if(enemyID ==2)
    {
      finalPos = this.availableSpaces[this.availableSpaces.length - 1];
      finalPos.x=0;
    }
    else if(enemyID ==3)
    {
      finalPos = this.availableSpaces[this.availableSpaces.length - 1];
      finalPos.y=0;
    }

//if (!currentEnemy) {
      currentEnemy = new Enemy(this.game, finalPos.x * 32, finalPos.y * 32);

      this.enemyPool.add(currentEnemy);
    //}
    // else {
    //   currentEnemy.reset(position.x * 32, position.y * 32 - 4);
    // }
  },
  createBomb: function(x, y, key, frame) {
    var rocksColliding = this.getRocksColliding(x, y);

    var currentBomb = this.bombsPool.getFirstExists(false);
    this.nextBomb = this.time.now + this.bombRate;

    if(!currentBomb) {
      currentBomb = new Bomb(this.game, x, y, key, frame, this.explosionPool, this.explosionRange, rocksColliding);

      this.bombsPool.add(currentBomb);
    }
    else{
      currentBomb.resetBomb(x, y, rocksColliding);
    }
  },
  destroyPlayer: function(player, explosion) {
    setTimeout(function() {
      player.kill();
      this.backgroundMusic.stop();
    }.bind(this), 40);
  },
  destroyEnemy: function(enemy, explosion) {
    enemy.kill();
    enemy.alive = false;
    this.player.score += 1;

    this.scoreText.text = this.player.score.toString();
  },
  getRocksColliding: function(x, y) {
    var column = Math.floor(x / 32),
        row = Math.floor(y / 32),
        rocksColliding = {
          up: true,
          down: true,
          left: true,
          right: true
        };

    if(row - 1>=0 && column>=0){
      if (this.rocks.layer.data[row - 1] !== undefined && this.rocks.layer.data[row - 1]) {
       rocksColliding.up = (this.rocks.layer.data[row - 1][column].index === this.level.rockId);
     }
   }
    else
    {
      rocksColliding.up = true;
    }
   if(column>=0){
      if (this.rocks.layer.data[row + 1] !== undefined && this.rocks.layer.data[row + 1]) {
       rocksColliding.down = (this.rocks.layer.data[row + 1][column].index === this.level.rockId);
     }
    }
    else
    {
      rocksColliding.down = true;
    }
    if(column - 1>=0 && row>=0){
      if (this.rocks.layer.data[row][column - 1] !== undefined && this.rocks.layer.data[row][column - 1]) {
      rocksColliding.left = (this.rocks.layer.data[row][column - 1].index === this.level.rockId);
      }
    }
    else
    {
      rocksColliding.left = true;
    }
    if(row>=0){
      if (this.rocks.layer.data[row][column + 1] !== undefined  && this.rocks.layer.data[row][column + 1]) {
        rocksColliding.right = (this.rocks.layer.data[row][column + 1].index === this.level.rockId);
      }
    }
    else
    {
      rocksColliding.right = true;
    }

    return rocksColliding;
  },
  resetPlayer: function() {
      this.player.resetForNewRound();
  },
  clearBombs: function() {
    for(var bombId in this.bombsPool) {//TODO: add detonate timer ID
          //clearTimeout(this.bombsPool[bombId].detonateTimerID);
    }
    this.bombsPool = {};
  },
  resetForNewRound: function() {
    this.clearBombs();
    this.resetPlayer();
  },
  calculateRoundWinner: function() {
    if(this.player.alive)
    {
       if(this.enemyPool.count == 0)
        this.showGameStatusAndReset();
    }
  },
  showGameStatusAndReset: function() {
  },
  getRandomInt:function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

};
