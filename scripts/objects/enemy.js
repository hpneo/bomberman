var DEFAULT_ENEMY_SPEED = 128;

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

Enemy.prototype.handleArificialMovement = function(rocks,rocksColliding) {
  	
  	var moving = true;
	this.game.physics.arcade.collide(this, this.rocks);
	moveChooser = Math.floor((Math.random() * 5) + 1);
	console.log(moveChooser);
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;

	//TODO:USE rocksColliding to create a fancy movement "IA"

	if (moveChooser == 1)
	{
		if(this.alive)
			{
				this.body.velocity.x = -this.speed;
  				this.facing = "left";
    			moving = true;
			}
	}
	else if (moveChooser == 2)
	{
		if (this.alive)
			{
				this.body.velocity.x = this.speed;
  				this.facing = "right";
    			moving = true;
			}
	}
	else if (moveChooser == 3)
	{
		if (this.alive)
			{
				this.body.velocity.y = -this.speed;
  				this.facing = "up";
    			moving = true;
			}
	}
	else if (moveChooser == 4)
	{
		if (this.alive)
			{
				this.body.velocity.y = this.speed;
  				this.facing = "down";
    			moving = true;
			}
	}
	else if (moveChooser == 5)
	{
		if(this.alive)
		{
    		moving = false;
    		this.freeze();		
		}		
	}
  	if(moving)  {
    	this.animations.play(this.facing);
  	}
	
};