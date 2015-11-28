var DEFAULT_ENEMY_SPEED = 100	;

function Enemy(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'enemy', 0);

  this.game = game;
  this.game.physics.enable(this);
  this.body.allowGravity = false;
  this.body.setSize(24, 24, 4, 24);
  this.anchor.setTo(0, 0);
  this.maxBombs = 1;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.alive = true;
  this.row = y;
  this.column = x;
  this.x = this.column * 32;
  this.y = this.row * 32;
  this.animations.add('up', [15, 12, 13, 14], 8, true);
  this.animations.add('left', [5, 6, 7, 4], 8, true);
  this.animations.add('right', [9, 10, 11, 8], 8, true);
  this.animations.add('down', [1, 2, 3, 0], 8, true);
  this.facing = 'down';
  this.body.immovable = true;
}

Enemy.prototype = Object.create(Player.prototype);
Enemy.prototype.constructor = Enemy;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Enemy.prototype.easyStarMovement = function(player, level) {
  var easystar = new EasyStar.js(),
      playerX = Math.floor(player.x / 32),
      playerY = Math.floor(player.y / 32),
      thisX = Math.floor(this.x / 32),
      thisY = Math.floor(this.y / 32);

  easystar.setGrid(level.data);
  easystar.setAcceptableTiles([0]);
  easystar.findPath(thisX, thisY, playerX, playerY, function(path) {
    var i = 0;

    if (!path) {
      return;
    }

    if (this.path) {
      this.stopEasystar();
    }

    this.path = path;

    this.timer = this.game.time.create(false);
    this.timer.loop(450, function() {
      if (i < path.length) {
        var newX = (path[i].x) * 32,
            newY = (path[i].y) * 32;

        if (this.x < newX) {
          this.animations.play('right');
        }
        else if (this.x > newX) {
          this.animations.play('left');
        }

        if (this.y < newY) {
          this.animations.play('down');
        }
        else if (this.y > newY) {
          this.animations.play('up');
        }

        this.game.add.tween(this).to({
          x: newX,
          y: newY
        }, 400, Phaser.Easing.Linear.None, true).onComplete.add(function() {
          if (path[i]) {
            this.row = path[i].y;
            this.column = path[i].x;
          }
        }, this);

        // this.x = newX;
        // this.y = newY;

        i++;
      }
      else {
        this.animations.stop();
      }
    }, this);

    this.timer.start();
  }.bind(this));

  easystar.calculate();
};

Enemy.prototype.stopEasystar = function() {
  this.timer.destroy();
  this.animations.stop();
};

Enemy.prototype.canDropBombs = function(bombsPool) {
  return (bombsPool.total < this.maxBombs);
};