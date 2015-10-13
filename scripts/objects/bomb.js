
function getFrame(prefix, number) {
  return "gamesprites/" + prefix + "/" + prefix + "_" + number + ".png";
}

var Bomb = function(game, x, y, key, frame) {

	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.anchor.setTo(.5, .5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;

  this.game.add.existing(this);
  this.sizeTween = this.game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Default, true, 0, true, true);
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.remove = function() {
  this.destroy();
  this.sizeTween.stop(); // stop tween and mark it for deletion
};

Bomb.renderExplosion = function(explosions) {
	explosions.forEach(function(explosion) {
      var explosionSprite = new Phaser.Sprite(game, explosion.x, explosion.y, key, getFrame(explosion.key, "01"));
      explosionSprite.anchor.setTo(.5, .5);

      if(explosion.hide) {
        game.world.addAt(explosionSprite, 1);
      } else {
        game.world.add(explosionSprite);
      }

      explosionSprite.play("explode", 17, false);
    });
}
