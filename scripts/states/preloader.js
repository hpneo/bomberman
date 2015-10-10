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
  },
  create: function() {
  	console.log('En el Preloader');
    this.state.start('Intro');
  }
};