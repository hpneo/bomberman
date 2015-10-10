function Intro(game) {}

Intro.prototype = {
  preload: function() {
  },
  create: function() {
  	//Fondo de la Introduccion
  	this.background_intro = this.game.add.sprite(0,0,'background-intro');
  	this.background_intro.width=this.game.width;
  	this.background_intro.height=this.game.height;
  	//Sonido
  	this.background_music = this.add.audio('music-intro',1,true);
    this.background_music.play();
  	//Nombres
  	var style_title = {font:'80px Arial', fill:"#fff"};
  	var style_text = {font:'15px Arial', fill:"#fff"};
  	this.title_intro = this.add.text(120,100, 'Teoria de Juegos', style_title);
  	this.member_piero = this.add.text(130,this.game.height-115, 'Piero Sifuentes', style_text);
  	this.member_gustavo = this.add.text(270,this.game.height-115, 'Gustavo Leon', style_text);
  	this.member_gary = this.add.text(450,this.game.height-115, 'Gary Figuerola', style_text);
  	this.member_bryan = this.add.text(5,this.game.height-115, 'Bryan Velásquez', style_text);
  	this.member_boss = this.add.text(570,this.game.height-115, 'El Profe Modo Hembrita', style_text);
  	//Continuar
  	this.btn_continue = this.game.add.button(this.game.world.width/3+50,this.game.height-70,'continue-intro',this.continueMenu,this);
  	this.btn_continue.scale.setTo(0.25);
  	
  	console.log('En el Intro');
    
  },
  continueMenu:function(){
  		this.background_music.stop();
		this.state.start('Menu');
  }
};