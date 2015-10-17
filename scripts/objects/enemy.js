var DEFAULT_PLAYER_SPEED = 160;

function Enemy(game, x, y) {
  Player.call(this, game, x, y, 'enemy', 0);

  this.body.immovable = true;
  this.body.allowGravity = false;
  this.maxBombs = 1;
}

Enemy.prototype = Object.create(Player.prototype);
Enemy.prototype.constructor = Enemy;