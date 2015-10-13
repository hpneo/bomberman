function Bomb(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.anchor.setTo(0.5, 0.5);
  //this.scale.setTo(0.5,0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('normal', [0,1], 2, true);
  this.animations.play('normal');

  this.sizeTween = game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Default, true, 0, true, true);
  this.sizeTween.start();
  this.sizeTween.onComplete.add(this.removeBomb,this);
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.removeBomb = function() {
  this.kill();
  this.sizeTween.stop(); // stop tween and mark it for deletion
};
Bomb.prototype.resetBomb = function(x,y){
  this.reset(x,y);
  this.sizeTween = game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Default, true, 0, true, true);
  this.sizeTween.onComplete.add(this.removeBomb,this);
};


/*
Bomb.prototype.renderExplosion = function() {

  var currentExplosion = this.explosionPool.getFirstExists(false);

    if(!currentExplosion) {
      currentExplosion = new Explosion(this.game, this.x, this.y,'explosion',0);
      this.explosionPool.add(currentExplosion);
    }
    else {
      currentExplosion.reset(this.x, this.y);
    }

};
*/