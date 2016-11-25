(function () {
    angular.module('todo')
        .controller('EditTodoController', NewTodoController);

    NewTodoController.$inject = ['todo', 'fetchTodos', '$mdToast', '$mdDialog', '$route', '$routeParams'];
    function NewTodoController(todo, fetchTodos, $mdToast, $mdDialog, $route, $routeParams) {
        var vm = this;
        vm.todo = {};
        vm.edit = function () {
            todo.editTodo(vm.todo._id, vm.todo).then(function (response) {
                $mdDialog.cancel();
                $route.reload();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                )
            })
        };

        fetchTodos.getTodo($routeParams.id, function (todo) {
            vm.todo = todo;
        })
    }
})();
