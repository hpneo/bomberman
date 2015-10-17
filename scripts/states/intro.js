function Intro(game) {}

Intro.prototype = {
  preload: function() {
  },
  create: function() {
    var members = [
        'Piero Sifuentes',
        'Gustavo Leon',
        'Gary Figuerola',
        'Bryan Velásquez'
      ],
      membersAvatars = [
        'piero',
        'gustavo',
        'gary',
        'bryan'
      ];

    //Fondo de la Introduccion
    this.background = this.game.add.sprite(0, 0, 'background-intro');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.backgroundMusic = this.add.audio('music-intro', 1, true);
    this.backgroundMusic.play();

    var fontTitle = {
          font: '36px "Pokemon Regular"',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4
        },
        fontBody = {
          font: '15px "Pokemon Regular"',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center',
          wordWrap: true,
          wordWrapWidth: (this.game.world.width / members.length) - 50
        };

    this.title = this.add.text(this.game.world.width / 2, 30, 'VoltorbMan', fontTitle);
    this.title.anchor.setTo(0.5);

    members.forEach(function(member, index) {
      var positionX = (this.game.world.width / (members.length + 1)) * (index + 1);

      var text = this.add.text(positionX, this.game.height - 140, member, fontBody);

      text.anchor.setTo(0.5);
      text.lineSpacing = -10;

      var avatar = this.add.sprite(positionX - 5, this.game.height - 135, membersAvatars[index]);

      avatar.anchor.setTo(0.5, 0);
    }, this);
    //Continuar
    this.buttonContinue = this.game.add.button(this.game.width / 2, (this.game.height / 2) - 50, 'play-menu', this.continueMenu, this);
    this.buttonContinue.anchor.setTo(0.5);
    this.buttonContinue.scale.setTo(0.5);

    console.log('En el Intro');

  },
  continueMenu:function(){
    this.backgroundMusic.stop();
		this.state.start('Game');
  }
};