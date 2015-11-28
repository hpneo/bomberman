function GameOver(game) {}

GameOver.prototype = {
  preload: function() {
  },
  create: function() {

  	//Fondo de la Introduccion
  	this.background_menu = this.game.add.sprite(0,0,'background-gameover');
  	this.background_menu.width=this.game.width;
  	this.background_menu.height=this.game.height;
  	//Sonido
  	this.background_music = this.add.audio('music-gameover', 1, true);
    this.background_music.play();

        var fontTitle = {
          font: '36px "Pokemon Regular"',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4
        };

    // this.title = this.add.text(this.game.world.width / 2, 50, 'Game Over :,C', fontTitle);
    // this.title.anchor.setTo(0.5);

    this.buttonPlay = this.game.add.button(this.game.width/2,this.game.height-50,'play-menu',this.playGame,this);
    this.buttonPlay.anchor.setTo(0.5,0.5);
  	this.buttonPlay.scale.setTo(0.5);

    console.log('En el GameOver');
    //this.state.start('Preloader');
  },
  update:function(){

  },
  playGame:function(){
  	this.background_music.stop();
		this.state.start('Game');
  }
};
