var DEFAULT_PLAYER_SPEED = 160;

function Player(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.game = game;
  this.maxBombs = 2;
  this.bombStrength = 1;
  this.score = 0;
  this.alive = true;
  this.fila = y;
  this.columna = x;
  this.x = this.columna * 32;
  this.y = this.fila * 32;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.animations.add('up', [15, 12, 13, 14], 8, true);
  this.animations.add('left', [5, 6, 7, 4], 8, true);
  this.animations.add('right', [9, 10, 11, 8], 8, true);
  this.animations.add('down', [1, 2, 3, 0], 8, true);

  this.game.physics.enable(this);

  this.body.setSize(24, 24, 4, 24);
  this.anchor.setTo(0, 0);
  this.body.collideWorldBounds = true;

  this.facing = "down";
  this.bombButtonJustPressed = false;

  this.game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Player.prototype.create = function() {};
// Player.prototype.update = function() {};
Player.prototype.handleInput = function(rocks) {
  this.handleMotionInput(rocks);
  this.handleBombInput();
};

Player.prototype.handleMotionInput = function(level) {
  var moving = true;
  var matriz = level.data;
  if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    console.log(this.fila);
    console.log(matriz.length);
    console.log(this.columna);
    console.log(matriz[0].length);
    console.log(matriz);
    this.facing = "up";
    if( (this.fila - 1) >= 0){
      if(matriz[this.fila - 1][this.columna] == 0){
        this.y = (this.fila - 1) * 32;
        this.fila -= 1;
      }
    }
  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    this.facing = "down";
    if( (this.fila + 1) <= (matriz.length - 1)){
      if(matriz[this.fila + 1][this.columna] == 0){
        this.y = (this.fila + 1) * 32;
        this.fila += 1;
      }
    }

  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.facing = "left";
    if( (this.columna - 1) >= 0){
      if(matriz[this.fila][this.columna - 1] == 0){
        this.x = (this.columna - 1) * 32;
        this.columna -= 1;
      }
    }
  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.facing = "right";

    if( (this.columna + 1) <= (matriz[0].length - 1)){
      if(matriz[this.fila][this.columna + 1] == 0){
        this.x = (this.columna + 1) * 32;
        this.columna += 1;
      }
    }
  } else {
    moving = false;
    this.freeze();
  }

  if(moving)  {
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

Player.prototype.freeze = function() {
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
    this.facing = "down";
    this.alive = true;
    this.maxBombs = 2;
    this.bombStrength = 1;
    this.score = 0;
    this.speed = DEFAULT_PLAYER_SPEED;
  };
