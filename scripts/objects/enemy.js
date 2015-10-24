var DEFAULT_ENEMY_SPEED = 100	;

function Enemy(game, x, y) {
  Player.call(this, game, x, y, 'enemy', 0);

  this.body.allowGravity = false;
  this.maxBombs = 1;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.alive = true;
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
Enemy.prototype.handleArificialMovement = function(rocks,rocksColliding,moveChooserVal) {

  	var moving = true;
	this.game.physics.arcade.collide(this, this.rocks);
	if(!moveChooserVal || moveChooserVal==null)
		moveChooser = getRandomInt(1, 5) ;
	else
		moveChooser=moveChooserVal;
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;

	//TODO:USE rocksColliding to create a fancy movement "IA"
	if (moveChooser == 1)
	{
		if(rocksColliding.left!=false && this.x-this.speed>0)
		{	if(this.alive )
			{
				this.body.velocity.x = -this.speed;
  				this.facing = "left";
    			moving = true;
			}
		}
	}
	else if (moveChooser == 2)
	{
		if (rocksColliding.right!=false && this.x+this.width+this.speed<this.game.world.bounds.right)
		{
			if(this.alive)
			{
				this.body.velocity.x = this.speed;
  				this.facing = "right";
    			moving = true;
			}
		}
	}
	else if (moveChooser == 3)
	{
		if(rocksColliding.up != false && this.y+this.height+this.speed<this.game.world.bounds.top )
		{
			if (this.alive)
			{
				this.body.velocity.y = -this.speed;
  				this.facing = "up";
    			moving = true;
			}
		}

	}
	else if (moveChooser == 4 )
	{
		if(rocksColliding.down != false && this.y-this.speed>0)
		{
			if (this.alive)
			{
				this.body.velocity.y = this.speed;
  				this.facing = "down";
    			moving = true;
			}
		}

	}

  	if(moving)  {
    	this.animations.play(this.facing);
  	}

};


Enemy.prototype.canDropBombs = function(bombsPool) {
  return (bombsPool.total < this.maxBombs);
};
