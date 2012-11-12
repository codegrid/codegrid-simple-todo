(function() {

SimpleTodo.View.TodoFilter = Backbone.View.extend({
  initialize: function() {
    this.$btns = this.$el.find('a');
  },

  current: function(className) {
    this.$btns.removeClass('current');
    this.$('.' + className).addClass('current');
  }
});

})();
