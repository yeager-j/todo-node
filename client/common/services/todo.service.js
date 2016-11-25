(function () {
    angular.module('todo')
        .service('todo', TodoService);

    TodoService.$inject = ['$http', 'authentication'];
    function TodoService($http, authentication) {
        this.getTodoList = function () {
            return $http({
                method: 'GET',
                url: '/api/todo_list',
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };

        this.getTodo = function (id) {
            return $http({
                method: 'GET',
                url: '/api/todo/' + id,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };

        this.createTodo = function (todo) {
            return $http({
                method: 'POST',
                url: '/api/create_todo',
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                },
                data: todo
            })
        };

        this.editTodo = function (id, todo) {
            return $http({
                method: 'POST',
                url: '/api/edit_todo/' + id,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                },
                data: todo
            })
        };

        this.deleteTodo = function (id) {
            return $http({
                method: 'POST',
                url: '/api/delete_todo/' + id,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        }
    }
})();
