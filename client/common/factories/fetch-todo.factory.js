(function () {
    angular.module('todo')
        .factory('fetchTodos', FetchTodoFactory);

    FetchTodoFactory.$inject = ['authentication', 'todo'];
    function FetchTodoFactory(authentication, todo) {
        // Maybe use promises instead of callbacks in the future? $q perhaps
        function getTodoList(callback) {
            todo.getTodoList(authentication.uuid().uuid).then(function (response) {
                console.log(response);
                callback(response.data);
            })
        }

        function getTodo(id, callback) {
            todo.getTodo(id).then(function (response) {
                callback(response.data);
            }, function (response) {
                callback(response);
            })
        }

        return {
            getTodoList: getTodoList,
            getTodo: getTodo
        }
    }
})();
