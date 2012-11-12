(function() {

SimpleTodo.Collection.Todos = Backbone.Collection.extend({
  model: SimpleTodo.Model.Todo,
  localStorage: new Store('todo'),

  filter: function(filterType) {
    this.each(function(todo) {
      todo.filter(filterType);
    });
  }
});

})();
