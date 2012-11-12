(function() {

SimpleTodo.View.TodoList = Backbone.View.extend({
  initialize: function() {
    this.filterType = 'all';

    this.collection.on('add', this.add, this);
    this.collection.on('reset', this.reset, this);
  },

  add: function(todo) {
    var item = new SimpleTodo.View.TodoItem({ model: todo });
    todo.filter(this.filterType);
    this.$el.append(item.el);
  },

  reset: function(todos) {
    var self = this;

    todos.each(function(todo) {
      self.add(todo);
    });
  },

  filter: function(filterType) {
    this.filterType = filterType;
    this.collection.filter(filterType);
  }
});

})();
