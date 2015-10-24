function Boot(game) {}

Boot.prototype = {
  preload: function() {
  	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.load.image('preloadbar','assets/images/preloader-bar.png');
  },
  create: function() {
    game.stage.disableVisibilityChange = true;
    game.input.maxPointers = 1;

    if (game.device.desktop) {
      game.stage.scale.pageAlignHorizontally = true;
    } else {
      game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      game.stage.scale.minWidth =  480;
      game.stage.scale.minHeight = 260;
      game.stage.scale.maxWidth = 640;
      game.stage.scale.maxHeight = 480;
      game.stage.scale.forceLandscape = true;
      game.stage.scale.pageAlignHorizontally = true;
      game.stage.scale.setScreenSize(true);
    }

    this.game.state.start('Preloader');
  }
};