var DEFAULT_PLAYER_SPEED = 160,
    TILE_SIZE = 32;

function Player(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.game = game;
  this.maxBombs = 2;
  this.bombStrength = 1;
  this.score = 0;
  this.alive = true;
  this.row = y;
  this.column = x;
  this.x = this.column * TILE_SIZE;
  this.y = this.row * TILE_SIZE;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.animations.add('up', [15, 12, 13, 14], 8, true);
  this.animations.add('left', [5, 6, 7, 4], 8, true);
  this.animations.add('right', [9, 10, 11, 8], 8, true);
  this.animations.add('down', [1, 2, 3, 0], 8, true);

  this.game.physics.enable(this);

  this.body.setSize(24, 24, 4, 24);
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.anchor.setTo(0, 0);
  this.body.collideWorldBounds = true;

  this.facing = 'down';
  this.bombButtonJustPressed = false;
  this.isMoving = false;

  this.game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(rocks) {
  this.handleMotionInput(rocks);
  this.handleBombInput();
};

Player.prototype.coordinateToGrid = function(coordinate) {
  var minimumGridValue = Phaser.Math.snapToFloor(coordinate, TILE_SIZE) / TILE_SIZE,
      maximumGridValue = Phaser.Math.snapToCeil(coordinate, TILE_SIZE) / TILE_SIZE;

  if (coordinate >= (minimumGridValue * TILE_SIZE) && coordinate <= (maximumGridValue * TILE_SIZE)) {
    return minimumGridValue;
  }
  else {
    return maximumGridValue;
  }
};

Player.prototype.moveUp = function(levelGridData) {
  this.facing = 'up';
  this.isMoving = true;

  if ((this.row - 1) >= 0) {
    if (levelGridData[this.row - 1][this.column] === 0) {
      this.y -= (TILE_SIZE - 8) * (this.game.time.elapsed / 350);
      // this.row = Phaser.Math.snapToCeil(this.y, TILE_SIZE) / TILE_SIZE;
      this.row = this.coordinateToGrid(this.y + 24);
    }
  }
  else {
    if (this.y >= -8) {
      this.y -= TILE_SIZE * (this.game.time.elapsed / 350);
    }
  }
};

Player.prototype.moveDown = function(levelGridData) {
  this.facing = 'down';
  this.isMoving = true;

  if ((this.row + 1) <= (levelGridData.length - 1)) {
    if (levelGridData[this.row + 1][this.column] === 0) {
      this.y += (TILE_SIZE - 8) * (this.game.time.elapsed / 350);
      // this.row = Phaser.Math.snapToFloor(this.y, TILE_SIZE) / TILE_SIZE;
      this.row = this.coordinateToGrid(this.y + 24);
    }
  }
  else {
    if (this.y < (levelGridData.length - 1) * TILE_SIZE) {
      this.y += TILE_SIZE * (this.game.time.elapsed / 350);
    }
  }
};

Player.prototype.moveLeft = function(levelGridData) {
  this.facing = 'left';
  this.isMoving = true;

  if ((this.column - 1) >= 0) {
    if (levelGridData[this.row][this.column - 1] === 0) {
      this.x -= TILE_SIZE * (this.game.time.elapsed / 350);
      // this.column = Phaser.Math.snapToCeil(this.x, TILE_SIZE) / TILE_SIZE;
      this.column = this.coordinateToGrid(this.x + 4);
    }
  }
  else {
    if (this.x >= 4) {
      this.x -= TILE_SIZE * (this.game.time.elapsed / 350);
    }
  }
};

Player.prototype.moveRight = function(levelGridData) {
  this.facing = 'right';
  this.isMoving = true;

  if ((this.column + 1) <= (levelGridData[0].length - 1)) {
    if (levelGridData[this.row][this.column + 1] === 0) {
      this.x += TILE_SIZE * (this.game.time.elapsed / 350);
      // this.column = Phaser.Math.snapToCeil(this.x, TILE_SIZE) / TILE_SIZE;
      this.column = this.coordinateToGrid(this.x + 4);
    }
  }
  else {
    if (this.x < levelGridData[0].length * TILE_SIZE) {
      this.x += TILE_SIZE * (this.game.time.elapsed / 350);
    }
  }
};

Player.prototype.handleMotionInput = function(level) {
  var levelGridData = level.data;

  if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    this.moveUp(levelGridData);
  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    this.moveDown(levelGridData);
  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.moveLeft(levelGridData);
  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.moveRight(levelGridData);
  } else {
    this.stop();
  }

  // console.log(this.x, this.y, this.column, this.row);

  if (this.isMoving) {
    this.animations.play(this.facing);
  }
};

Player.prototype.handleBombInput = function() {
  if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.bombButtonJustPressed) {
    this.bombButtonJustPressed = true;

  } else if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.bombButtonJustPressed) {
    this.bombButtonJustPressed = false;
  }
};

Player.prototype.stop = function() {
  this.isMoving = false;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.animations.stop();
};

Player.prototype.canDropBombs = function(bombsPool) {
  return (bombsPool.total < this.maxBombs);
};

Player.prototype.resetForNewRound = function(x, y, key, frame) {
  this.x = this.x;
  this.y = this.y;
  this.facing = 'down';
  this.alive = true;
  this.maxBombs = 2;
  this.bombStrength = 1;
  this.score = 0;
  this.speed = DEFAULT_PLAYER_SPEED;
};
