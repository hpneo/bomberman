function Bomb(game, x, y, key, frame, explosionPool, explosionRange, rocksColliding) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game=game;
  this.explosionRange = explosionRange;
  this.rocksColliding = rocksColliding;
  this.anchor.setTo(0.5, 0.5);
  this.explosionPool = explosionPool;
  this.width = 32;
  this.height = 32;

  game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.immovable = true;
  this.animations.add('normal', [0,1], 2, true);
  this.animations.play('normal');

  this.sizeTween = game.add.tween(this.scale).to({x: 0.9, y: 0.9}, 500, Phaser.Easing.Default, true, 0, true, true);
  this.sizeTween.onComplete.add(this.removeBomb,this);
  this.hasExploded = false;
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.removeBomb = function() {
  this.bombExplosion = this.game.add.audio('explosion');
  this.bombExplosion.play();
  this.renderExplosion();
  this.hasExploded = true;
  this.kill();
  this.sizeTween.stop(); // stop tween and mark it for deletion
};

Bomb.prototype.resetBomb = function(x, y, rocksColliding) {
  this.reset(x, y);
  this.rocksColliding = rocksColliding;
  this.hasExploded = false;
  this.sizeTween = game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Default, true, 0, true, true);
  this.sizeTween.onComplete.add(this.removeBomb, this);
};

Bomb.prototype.renderExplosion = function() {
  this.renderSingleExplosion(this.x, this.y);

  if (!this.rocksColliding.up) {
    this.renderUpExplosion();
  }

  if (!this.rocksColliding.down) {
    this.renderDownExplosion();
  }

  if (!this.rocksColliding.left) {
    this.renderLeftExplosion();
  }

  if (!this.rocksColliding.right) {
    this.renderRightExplosion();
  }
};

Bomb.prototype.renderSingleExplosion = function(x, y) {
  var explosion = this.explosionPool.getFirstExists(false);

  if(!explosion) {
    explosion = new Explosion(this.game, x, y, 'explosion', 0);

    this.explosionPool.add(explosion);
  }
  else {
    explosion.resetExplosion(x, y);
  }
};

Bomb.prototype.renderUpExplosion = function() {
  for (var i = 0; i < this.explosionRange; i++) {
    this.renderSingleExplosion(this.x, this.y  - ((i + 1) * 32));
  }
};

Bomb.prototype.renderDownExplosion = function() {
  for (var i = 0; i < this.explosionRange; i++) {
    this.renderSingleExplosion(this.x, this.y  + ((i + 1) * 32));
  }
};

Bomb.prototype.renderLeftExplosion = function() {
  for (var i = 0; i < this.explosionRange; i++) {
    this.renderSingleExplosion(this.x - ((i + 1) * 32), this.y);
  }
};

Bomb.prototype.renderRightExplosion = function() {
  for (var i = 0; i < this.explosionRange; i++) {
    this.renderSingleExplosion(this.x + ((i + 1) * 32), this.y);
  }
};