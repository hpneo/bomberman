function Player(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.game = game;
  this.animations.add('up', [15, 12, 13, 14], 8, true);
  this.animations.add('left', [5, 6, 7, 4], 8, true);
  this.animations.add('right', [9, 10, 11, 8], 8, true);
  this.animations.add('down', [1, 2, 3, 0], 8, true);

  this.game.physics.enable(this);

  this.body.setSize(24, 24, 4, 24);
  this.anchor.set(0, 0);
  this.body.collideWorldBounds = true;

  this.game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Player.prototype.create = function() {};
// Player.prototype.update = function() {};