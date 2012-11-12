(function() {

SimpleTodo.Controller.Todo = Backbone.Router.extend({
  initialize: function() {
    this.todos = new SimpleTodo.Collection.Todos();
    
    this.filter = new SimpleTodo.View.TodoFilter({
      el: '.mod-todoFilter'
    });

    this.inputForm = new SimpleTodo.View.TodoInputForm({
      el: '.mod-todoInputForm',
      collection: this.todos
    });

    this.todoList = new SimpleTodo.View.TodoList({
      el: '.mod-todoList',
      collection: this.todos
    });

    Backbone.history.start();

    this.todos.fetch();
  },

  routes: {
    'active': 'active',
    'completed': 'completed',
    '*all': 'all'
  },

  all: function() {
    this.todoList.filter('all');
    this.filter.current('all');
  },

  active: function() {
    this.todoList.filter('active');
    this.filter.current('active');
  },

  completed: function() {
    this.todoList.filter('completed');
    this.filter.current('completed');
  }
});

})();
