function Intro(game) {}

Intro.prototype = {
  preload: function() {
  },
  create: function() {
    var members = [
        'Sifuentes',
        'Leon',
        'Figuerola',
        'Velásquez'
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
    // this.backgroundMusic.play();

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
      var positionX = (Math.floor(index / 2)) * this.game.world.width,
          positionY = (index % 2) * 160;

      if (positionX === 0) {
        positionX += 50;
      }
      else {
        positionX -= 50;
      }

      if (positionY === 0) {
        positionY += 20;
      }

      var text = this.add.text(positionX, positionY, member, fontBody);

      text.anchor.setTo(0.5);
      text.lineSpacing = -10;

      var avatar = this.add.sprite(positionX - 5, positionY, membersAvatars[index]);

      avatar.anchor.setTo(0.5, 0);
    }, this);

    this.introVideo = this.game.add.video('intro');
    this.introVideo.onComplete.addOnce(this.showButton, this);
    this.introVideo.addToWorld(240, 160, 0.5, 0.5);
    this.introVideo.play();
    console.log('En el Intro');

  },
  showButton: function() {
    //Continuar
    this.buttonContinue = this.game.add.button(this.game.width / 2, this.game.height / 2, 'play-menu', this.continueMenu, this);
    this.buttonContinue.anchor.setTo(0.5, -1.8);
    this.buttonContinue.scale.setTo(0.5);
  },
  continueMenu:function(){
    this.backgroundMusic.stop();
		this.state.start('Game');
  }
};