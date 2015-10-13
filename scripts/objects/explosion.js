function Explosion(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.anchor.setTo(0.5, 0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('normal', [0,1,2,3,4,5,6,7,8,9,10,11], 8, true);
  this.animations.play('normal');
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
}

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;