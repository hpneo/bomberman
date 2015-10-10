function Boot(game) {}

Boot.prototype = {
  preload: function() {
  	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.load.image('preloadbar','assets/images/preloader-bar.png');
  },
  create: function() {
  	console.log('En el Boot');
    this.state.start('Preloader');
  }
};