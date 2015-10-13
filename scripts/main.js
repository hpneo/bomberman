//15 * 32, 9 * 32
var game = new Phaser.Game(15 * 32, 9 * 32, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Intro', Intro);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.start('Boot');