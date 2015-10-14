function Explosion(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(1);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.animations.add('expand', [0,1,2,3,4,5,6,7,8,9,10,11], 24, false);
	this.animations.play('expand');
	this.events.onAnimationComplete.add(this.removeExplosion,this);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
}

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.removeExplosion = function(){
	this.kill();
};

Explosion.prototype.resetExplosion =function(x,y){
	this.reset(x,y);
	this.animations.play('expand');
};