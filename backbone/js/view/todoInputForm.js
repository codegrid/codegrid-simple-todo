(function() {

SimpleTodo.View.TodoInputForm = Backbone.View.extend({
  events: {
    'submit': 'onSubmit'
  },

  initialize: function() {
    this.$input = this.$('input[type="text"]');
  },

  onSubmit: function(event) {
    event.preventDefault();

    var text = this.$input.val();

    if (text) { 
      this.collection.create({ text: text });
      this.$input.val('');
      this.$input.focus();
    }
  }
});

})();
