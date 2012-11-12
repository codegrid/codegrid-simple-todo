(function() {

SimpleTodo.Model.Todo = Backbone.Model.extend({
  defaults: {
    text: null,
    completed: false
  },

  toggleComplated: function(completed) {
    this.set('completed', completed);
    this.save();
  },

  filter: function(filterType) {
    var completed = this.get('completed');
    var isHidden = (filterType === 'active' && completed) ||
                   (filterType === 'completed' && !completed);

    if (isHidden) {
      this.trigger('hide');
    }
    else {
      this.trigger('show');
    }
  }
});

})();
