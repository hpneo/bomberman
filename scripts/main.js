var game = new Phaser.Game(65 * 15, 65 * 9, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);