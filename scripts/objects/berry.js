function Berry(game, x, y, identifier) {
  Phaser.Sprite.call(this, game, x, y, 'berry_' + identifier, 0);

  this.game = game;
  this.identifier = identifier;
  this.game.physics.enable(this);
  this.body.allowGravity = false;
  this.anchor.setTo(0, 0);
  this.row = y;
  this.column = x;
  this.x = this.column * 32;
  this.y = this.row * 32;
  this.scale.setTo(32 / 48, 32 / 48);
}

Berry.prototype = Object.create(Phaser.Sprite.prototype);
Berry.prototype.constructor = Berry;