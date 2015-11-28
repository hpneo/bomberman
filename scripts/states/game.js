function Game() {
  this.nextBomb = 0;
  this.bombRate = 500;
}

Game.CURRENT_LEVEL = 0;
Game.BERRIES = [
  'red',
  'yellow',
  'blue',
  'green',
  'pink',
  'white',
  'black'
];

Game.prototype = {
  loadLevel: function(index) {
    if (index > 3) {
      Game.CURRENT_LEVEL = index = 1;
    }

    var levels = this.game.cache.getJSON('levels'),
    levelsIndex = index - 1,
    level = levels[levelsIndex];

    this.map = this.add.tilemap('level_' + index);
    this.map.addTilesetImage(level.title, level.tileset);
    this.map.setCollision(level.rockId, true, 'Rocks');

    //Musica
    this.backgroundMusic = this.add.audio('level_' + index, 0.6, true);
    this.backgroundMusic.play();

    this.level = level;
    this.levelIndex = index;
  },
  create: function() {
    //Mundo
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.loadLevel(++Game.CURRENT_LEVEL);

    this.ground = this.map.createLayer('Ground'),
    this.rocks = this.map.createLayer('Rocks');
    this.rocks.enableBody = true;
    this.game.physics.arcade.enable(this.rocks);
    this.rocks.enableBody = true;
    this.rocks.immovable = true;

    //Bombas
    this.bombs = this.add.group();
    this.bombs.enableBody = true;
    this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
    this.bombs.setAll('body.immovable', true);
    this.bombs.setAll('body.allowGravity', false);

    this.berries = this.add.group();
    this.bombs.enableBody = true;

    this.keyBomb = 'voltorb';
    this.frameBomb = 0;
    this.explosions = this.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.setAll('body.immovable', true);
    this.explosions.setAll('body.allowGravity', true);
    this.explosionRange = 1;

    this.enemies = this.add.group();

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
    var pos = this.availableSpaces[this.availableSpaces.length - 1];
    this.player = new Player(this.game, 14, 0, 'red', 0);
    this.player.score = 0;
    this.bombs = this.game.add.group();

    this.scoreText = this.add.text(this.game.world.width - 30, 10, this.player.score.toString(), font);

    //Ajustes
    this.ground.resizeWorld();
    this.rocks.resizeWorld();

    for (var i = 0; i < this.levelIndex * 3; i++) {
      this.addEnemy(i + 1);
    }

    for (var i = 0; i < this.levelIndex * 2; i++) {
      this.addBerry();
    }
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.rocks);
    this.physics.arcade.collide(this.enemies, this.rocks);
    this.physics.arcade.collide(this.player, this.enemies);
    this.physics.arcade.collide(this.enemies, this.bombs);
    this.physics.arcade.collide(this.player, this.bombs);
    this.physics.arcade.overlap(this.player, this.explosions, this.destroyPlayer, null, this);
    this.physics.arcade.overlap(this.enemies, this.explosions, this.destroyEnemy, null, this);
    this.physics.arcade.overlap(this.player, this.berries, this.applyBerry, null, this);

    this.player.handleMotionInput(this.level);
    this.player.handleBombInput();

    if (this.player.bombButtonJustPressed && this.player.canDropBombs(this.bombs) && this.time.now > this.nextBomb) {
      this.createBomb(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, this.keyBomb, 0);
    }

    if (!this.player.alive) {
      this.state.start('GameOver');
    }

    if (this.player.isMoving) {
      try {
        this.enemies.callAll('easyStarMovement', null, this.player, this.level);
      } catch (e) {

      }
    }

    var enemyRandom = this.game.rnd.between(0, this.enemies.children.length - 1);

    if (this.enemies.children[enemyRandom].alive) {
      this.enemyDropBomb(this.enemies.children[enemyRandom]);
    }
  },
  enemyDropBomb: function(enemy) {
    if (enemy.alive && enemy.canDropBombs(this.bombs) && this.time.now > this.nextBomb)
    {
      if (Math.abs(this.player.row - enemy.row) <= 3 && Math.abs(this.player.column - enemy.column) <= 3) {
        this.createBomb(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, this.keyBomb, 0);
      }
    }
  },
  addEnemy: function() {
    var currentEnemy = this.enemies.getFirstExists(false),
        positionIndex = this.game.rnd.between(0, this.availableSpaces.length - 1),
        position = this.availableSpaces[positionIndex],
        finalPos;

    currentEnemy = new Enemy(this.game, position.x, position.y);
    currentEnemy.alive = true;

    this.enemies.add(currentEnemy);

    currentEnemy.easyStarMovement(this.player, this.level);
  },
  addBerry: function() {
    var currentEnemy = this.berries.getFirstExists(false),
        positionIndex = this.game.rnd.between(0, this.availableSpaces.length - 1),
        position = this.availableSpaces[positionIndex];

    currentBerry = new Berry(this.game, position.x, position.y, Game.BERRIES[this.game.rnd.between(0, Game.BERRIES.length - 1)]);

    this.berries.add(currentBerry);
  },
  createBomb: function(x, y, key, frame) {
    var rocksColliding = this.getRocksColliding(x, y),
        currentBomb = this.bombs.getFirstExists(false);

    this.nextBomb = this.time.now + this.bombRate;

    if (!currentBomb) {
      currentBomb = new Bomb(this.game, x, y, key, frame, this.explosions, this.explosionRange, rocksColliding);

      this.bombs.add(currentBomb);
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

    this.player.score = this.enemies.children.filter(function(e) { return e.alive === false; }).length;

    this.scoreText.text = this.player.score.toString();

    if (this.player.score === this.enemies.children.length) {
      this.backgroundMusic.stop();
      this.player.score = 0;
      this.game.state.start('Game');
    }
  },
  applyBerry: function(player, berry) {
    switch (berry.identifier) {
      case 'black':
        this.enemies.setAll('maxBombs', 0);
        this.bombs.callAll('kill');
        this.explosions.callAll('kill');

        setTimeout(function() {
          this.enemies.setAll('maxBombs', 1);
        }.bind(this), 5000);
        break;
      case 'red':
        this.enemies.setAll('maxBombs', 2);

        setTimeout(function() {
          this.enemies.setAll('maxBombs', 1);
        }.bind(this), 5000);
        break;
      case 'green':
        this.bombs.callAll('kill');
        this.explosions.callAll('kill');

        this.enemies.children.forEach(function(enemy) {
          this.destroyEnemy(enemy);
        }, this);
        break;
    }

    berry.kill();
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
    for(var bombId in this.bombs) {//TODO: add detonate timer ID
      //clearTimeout(this.bombs[bombId].detonateTimerID);
    }
    this.bombs = {};
  },
  resetForNewRound: function() {
    this.clearBombs();
    this.resetPlayer();
  },
  calculateRoundWinner: function() {
    if(this.player.alive)
    {
      if(this.enemies.count == 0)
      this.showGameStatusAndReset();
    }
  },
  showGameStatusAndReset: function() {
  },
  getRandomInt:function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};