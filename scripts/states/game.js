function Game() {}

Game.prototype = {
  preload: function() {},
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var map = this.add.tilemap('level_1');
    map.addTilesetImage('Level 1', 'tilemap_cave');

    this.ground = map.createLayer('Ground'),
    this.rocks = map.createLayer('Rocks');

    this.rocks.enableBody = true;
    // this.rocks.debug = true;

    // this.player = game.add.sprite(32, 32, 'red', 0);
    this.player = new Player(this.game, 32 * 6, 32 * 4, 'red', 0);

    this.game.physics.enable(this.rocks);

    map.setCollision(1214, true, 'Rocks');

    this.cursors = game.input.keyboard.createCursorKeys();

    this.ground.resizeWorld();
    this.rocks.resizeWorld();
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.rocks);

    this.player.body.velocity.set(0);

    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -100;
        this.player.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 100;
        this.player.play('right');
    }
    else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -100;
        this.player.play('up');
    }
    else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 100;
        this.player.play('down');
    }
    else
    {
        this.player.animations.stop();
    }
  },
  render: function() {
    // this.game.debug.body(this.player);
  }
};