function Game() {
      this.nextBomb = 0;
      this.bombRate = 500;
}

Game.prototype = {
  preload: function() {},
  create: function() {
    //Mundo
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.add.tilemap('level_1');
    this.map.addTilesetImage('Level 1', 'tilemap_cave');

    this.ground = this.map.createLayer('Ground'),
    this.rocks = this.map.createLayer('Rocks');
    this.rocks.enableBody = true;
    this.game.physics.arcade.enable(this.rocks);
    this.rocks.enableBody = true;
    this.rocks.immovable = true;
    //Musica
    this.backgroundMusic = this.add.audio('music-lvl1', 0.8, true);
    this.backgroundMusic.play();

    //Bombas
    this.maxBombs = 2;
    this.bombsPool = this.add.group();
    this.bombsPool.enableBody = true;
    this.bombsPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bombsPool.setAll('body.immovable',true);
    this.bombsPool.setAll('body.allowGravity',false);

    this.keyBomb = 'voltor';
    this.frameBomb = 0;
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.setAll('body.immovable', true);
    this.explosionPool.setAll('body.allowGravity', true);
    this.explosionRange = 1;

    //Player
    this.player = new Player(this.game, 32 * 6, 32 * 4, 'red', 0);
    this.bombs = this.game.add.group();

    this.map.setCollision(1214, true, 'Rocks');

    this.cursors = game.input.keyboard.createCursorKeys();

    //Ajustes
    this.ground.resizeWorld();
    this.rocks.resizeWorld();
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.rocks);
    this.physics.arcade.overlap(this.player, this.explosionPool, this.destroyPlayer, null, this);

    this.player.handleMotionInput(this.rocks);
    this.player.handleBombInput();

    if (this.player.bombButtonJustPressed && this.bombsPool.total < this.maxBombs && this.time.now > this.nextBomb) {
      this.createBomb(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, this.keyBomb, 0);
    }
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
  getRocksColliding: function(x, y) {
    var column = Math.floor(x / 32),
        row = Math.floor(y / 32),
        rocksColliding = {
          up: true,
          down: true,
          left: true,
          right: true
        };



    if (this.rocks.layer.data[row - 1]) {
      rocksColliding.up = (this.rocks.layer.data[row - 1][column].index === 1214);
    }

    if (this.rocks.layer.data[row + 1]) {
      rocksColliding.down = (this.rocks.layer.data[row + 1][column].index === 1214);
    }

    if (this.rocks.layer.data[row][column - 1]) {
      rocksColliding.left = (this.rocks.layer.data[row][column - 1].index === 1214);
    }

    if (this.rocks.layer.data[row][column + 1]) {
      rocksColliding.right = (this.rocks.layer.data[row][column + 1].index === 1214);
    }

    return rocksColliding;
  }
};