var DEFAULT_ENEMY_SPEED = 120;

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

Enemy.prototype.handleArificialMovement = function(rocks) {
  	var moving = true;
	this.game.physics.arcade.collide(this, this.rocks);
	moveChooser = Math.floor((Math.random() * 4) + 1);
	console.log(moveChooser);
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	var walkCounter = 5000;
	var direction;
	if (moveChooser == 1)
	{
		setTimeout(function(){
			if(this.alive)
			{
				console.log("left");
				this.sprite.body.velocity.x = -this.speed;
  				this.facing = "left";
				direction = 1;
			}
		}, walkCounter)
	}
	else if (moveChooser == 2)
	{
		setTimeout(function(){
			if (this.alive)
			{
				this.sprite.body.velocity.x = this.speed;
  				this.facing = "right";
				direction = 2;
			}
		}, walkCounter)
	}
	else if (moveChooser == 3)
	{
		setTimeout(function(){
			if (this.alive)
			{
				this.sprite.body.velocity.y = -this.speed;
  				this.facing = "up";
				direction = 3;
			}
		}, walkCounter)
	}
	else if (moveChooser == 4)
	{
		setTimeout(function(){
			if (this.alive)
			{
				console.log("down");
				this.sprite.body.velocity.y = this.speed;
  				this.facing = "down";
				direction = 4;
			}
		}, walkCounter)
	}

	//walkCounter += 560;

	if (direction == 1)
	{
		this.sprite.body.velocity.x = -this.speed;
		this.facing = "left";
	}
	else if (direction == 2)
	{
		this.sprite.body.velocity.x = this.speed;
		this.facing = "right";
	}
	else if (direction == 3)
	{
		this.sprite.body.velocity.y = -this.speed;
		this.facing = "up";
	}
	else if (direction == 4)
	{
		this.sprite.body.velocity.y = this.speed;
		this.facing = "down";
	}	
  	if(moving)  {
    	this.animations.play(this.facing);
  	}
	
};