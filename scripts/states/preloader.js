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
  	this.load.image('background-menu','assets/images/menu-3.jpg');
  	this.load.audio('music-intro', 'assets/audio/intro.mp3');
  	this.load.audio('music-menu', 'assets/audio/menu.mp3');
  	this.load.image('continue-intro','assets/images/intro-continue.png');
  	this.load.image('play-menu','assets/images/menu-play.png');

    this.load.tilemap('level_1', 'assets/tilemaps/level_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tilemap_cave', 'assets/images/tilesheet_cave.png');

    this.load.spritesheet('red', 'assets/images/spritesheet_red.png', 32, 48);
  },
  create: function() {
  	console.log('En el Preloader');
    this.state.start('Intro');
  }
};