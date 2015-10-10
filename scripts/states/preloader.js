function Preloader() {}

Preloader.prototype = {
  preload: function() {},
  create: function() {
    this.state.start('Game');
  }
};