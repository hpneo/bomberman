function Preloader(game) {}

Preloader.prototype = {
  preload: function() {
    //Barra de carga
    this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'preloadbar');
  	this.preloadBar.anchor.setTo(0.5);
  	this.preloadBar.scale.setTo(3);
  	this.load.setPreloadSprite(this.preloadBar);
  	//Carga de assets


    this.load.image('background-intro','assets/images/intro-2.png');
  	this.load.image('background-gameover','assets/images/gameover-1.jpg');
  	this.load.image('continue-intro','assets/images/intro-continue.png');
  	this.load.image('play-menu','assets/images/menu-play.png');

    this.load.image('bryan','assets/images/bryan.png');
    this.load.image('gary','assets/images/gary.png');
    this.load.image('gustavo','assets/images/gustavo.png');
    this.load.image('piero','assets/images/piero.png');

    this.load.json('levels', 'assets/data/levels.json')
    this.load.tilemap('level_1', 'assets/tilemaps/level_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level_2', 'assets/tilemaps/level_2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level_3', 'assets/tilemaps/level_3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tilemap_cave', 'assets/images/tilesheet_cave.png');
    this.load.image('tilemap_grass', 'assets/images/tilesheet_grass.png');

    this.load.spritesheet('red', 'assets/images/spritesheet_red.png', 32, 48);
    this.load.spritesheet('enemy', 'assets/images/spritesheet_enemy.png', 32, 48);
    this.load.spritesheet('voltorb','assets/images/bomb1.png', 32, 32);
    this.load.spritesheet('electrode','assets/images/bomb2.png', 32, 32);
    this.load.spritesheet('explosion','assets/images/fire_2.png', 32, 32);

    this.load.audio('music-gameover', 'assets/audio/menu.mp3');
    this.load.audio('music-intro', 'assets/audio/opening.mp3');
    this.load.audio('level_1', 'assets/audio/level1.mp3');
    this.load.audio('level_2', 'assets/audio/level2.mp3');
    this.load.audio('level_3', 'assets/audio/level3.mp3');
    this.load.audio("explosion", "assets/audio/bomb.ogg");
    this.load.audio("powerup", "assets/audio/powerup.ogg");
    this.load.audio("click", "assets/audio/click.ogg");
  },
  create: function() {
    this.state.start('Intro');
  }
};
