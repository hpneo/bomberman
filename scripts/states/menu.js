function Menu(game) {}

Menu.prototype = {
  preload: function() {
  },
  create: function() {

  	//Fondo de la Introduccion
  	this.background_menu = this.game.add.sprite(0,0,'background-menu');
  	this.background_menu.width=this.game.width;
  	this.background_menu.height=this.game.height;
  	//Sonido
  	this.background_music = this.add.audio('music-menu', 1, true);
    this.background_music.play();

    this.buttonPlay = this.game.add.button(this.game.width/2,this.game.height/2,'play-menu',this.playGame,this);
    this.buttonPlay.anchor.setTo(0.5,0.5);
  	this.buttonPlay.scale.setTo(0.5);

    console.log('En el Menu');
    //this.state.start('Preloader');
  },
  update:function(){

  },
  playGame:function(){
  	this.background_music.stop();
		this.state.start('Game');
  }
};