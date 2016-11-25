(function () {
    angular.module('todo')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['fetchTodos', '$routeParams', '$mdDialog', 'todo', '$mdToast', '$location'];
    function TodoController(fetchTodos, $routeParams, $mdDialog, todo, $mdToast, $location) {
        var vm = this;
        vm.todo = {};

        vm.edit = function () {
            $mdDialog.show({
                templateUrl: '/todo/edit/edit-todo.template.html',
                controller: 'EditTodoController',
                controllerAs: 'vm',
                clickOutsideToClose: true
            })
        };

        vm.delete = function () {
            todo.deleteTodo(vm.todo._id).then(function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                );

                $location.path('/todo');
            });
        };

        fetchTodos.getTodo($routeParams.id, function (todo) {
            if (todo._id) {
                vm.todo = todo;
            } else {
                $location.path('/todo');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(todo.data.message)
                )
            }
        })
    }
})();
