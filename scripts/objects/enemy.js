var DEFAULT_ENEMY_SPEED = 100	;

function Enemy(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'enemy', 0);
  this.game = game;
  this.game.physics.enable(this);
  this.body.allowGravity = false;
  this.maxBombs = 1;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.alive = true;
  this.fila = y;
  this.columna = x;
  this.x = this.columna * 32;
  this.y = this.fila * 32;
  this.animations.add('up', [15, 12, 13, 14], 8, true);
  this.animations.add('left', [5, 6, 7, 4], 8, true);
  this.animations.add('right', [9, 10, 11, 8], 8, true);
  this.animations.add('down', [1, 2, 3, 0], 8, true);
  this.facing = "down";
  this.body.immovable = true;
}

Enemy.prototype = Object.create(Player.prototype);
Enemy.prototype.constructor = Enemy;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Enemy.prototype.easyStarMovement = function(player,level){
  var easystar = new EasyStar.js();
  var playerX = Math.floor(player.x / 32);
  var playerY = Math.floor(player.y / 32);
  var thisX = Math.floor(this.x / 32);
  var thisY = Math.floor(this.y / 32);
  easystar.setGrid(level.data);
  easystar.setAcceptableTiles([0]);
  easystar.findPath(thisX , thisY, playerX, playerY, function(path){
   this.path = path;
   var i = 0;
   this.game.time.events.loop(Phaser.Timer.SECOND, function(){
        if(i < path.length){
          this.x = (path[i].x) * 32;
          this.y = (path[i].y) * 32;
          i++;
        }
      },this);
  }.bind(this));
  easystar.calculate();
};

Enemy.prototype.canDropBombs = function(bombsPool) {
  return (bombsPool.total < this.maxBombs);
};
