(function() {

SimpleTodo.View.TodoItem = Backbone.View.extend({
  tagName: 'li',

  render: function() {
    var tmpl = $('#tmpl-todoItem').html();
    var html = _.template(tmpl, this.model.toJSON());

    this.$el.append(html);

    return this.el;
  },

  events: {
    'click .remove': 'remove',
    'change input[type="checkbox"]': 'toggleComplated'
  },

  initialize: function() {
    this.render();
    this.toggleComplatedClass(this.model.get('completed'));
    this.$checkbox = this.$('input[type="checkbox"]');

    this.model.on('show', this.show, this);
    this.model.on('hide', this.hide, this);
  },

  remove: function() {
    if (window.confirm('削除しますか？')) {
      this.$el.remove();
      this.model.destroy();
    }
  },

  toggleComplatedClass: function(completed) {
    if (completed) {
      this.$el.addClass('completed');
    }
    else {
      this.$el.removeClass('completed');
    }
  },

  toggleComplated: function() {
    var completed = this.$checkbox.is(':checked');

    this.toggleComplatedClass(completed);
    this.model.toggleComplated(completed);
  },

  show: function() {
    this.$el.show();
  },

  hide: function() {
    this.$el.hide();
  }
});

})();
