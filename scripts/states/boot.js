function Boot() {}

Boot.prototype = {
  preload: function() {},
  create: function() {
    this.state.start('Preloader');
  }
};