jQuery(function($) {

  var $form = $('.mod-inputForm');
  var $list = $('.mod-todoList');
  var $filter = $('.mod-todoFilter');

  /**
   * フォームを送信したらaddTodoにテキストを渡してTodoを追加する
   */
  $form.submit(function(e) {
    e.preventDefault();

    var $input = $form.find('input[type="text"]');
    var text = $input.val();

    if (text) {
      addTodo(text);
      $input.val('').focus();
      save();
    }
  });


  /**
   * テキストと完了済みかどうかを引数で受け取ってTodoリストに追加する
   */
  function addTodo(text, completed) {
    var $li = $('<li>').hide();
    var $check = $('<input type="checkbox">').appendTo($li);
    var $text = $('<span class="text">').text(text).appendTo($li);
    var $remove = $('<span class="remove">').text('削除').appendTo($li);

    $remove.click(function() {
      if (window.confirm('削除しますか？')) {
        $li.remove();
        save();
      }
    });

    $check.bind('change', function() {
      if ($check.is(':checked')) {
        $li.addClass('completed');
      }
      else {
        $li.removeClass('completed');
      }
      filterTodos();
      save();
    });

    $list.append($li);

    if (completed) {
      $check.attr('checked', true).trigger('change');
    }

    filterTodos();
  }


  /**
   * ローカルストレージに現在の状態を保存する
   */
  function save() {
    var todos = $list.find('li').map(function() {
      var $li = $(this);

      return {
        text: $li.find('.text').text(),
        completed: $li.find('input[type="checkbox"]').is(':checked')
      };
    }).toArray();

    localStorage.setItem('todos', JSON.stringify(todos));
  }


  /**
   * ローカルストレージからTodoリストを復元する
   */
  function restore() {
    var todos = [];
    try {
      todos = JSON.parse(localStorage.getItem('todos'));
    } catch(e) {}

    todos.forEach(function(todo) {
      addTodo(todo.text, todo.completed);
    });
  }

  /**
   * ハッシュが変更になったときのハンドラ
   */
  function filterTodos() {
    var hash = location.hash.substring(1);
    var $active = $list.find('li').not('.completed');
    var $completed = $list.find('.completed');
    $filter.find('a').removeClass('current');

    if (hash === 'active') {
      $active.show();
      $completed.hide();
      $filter.find('.active').addClass('current');
    }
    else if (hash === 'completed') {
      $active.hide();
      $completed.show();
      $filter.find('.completed').addClass('current');
    }
    else {
      $active.show();
      $completed.show();
      $filter.find('.all').addClass('current');
    }
  }

  /**
   * hashchangeのときにフィルターする
   */
  $(window).bind('hashchange', function() {
    filterTodos();
  });

  /**
   * 初期化
   */
  restore();
});
