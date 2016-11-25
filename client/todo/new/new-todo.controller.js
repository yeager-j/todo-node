(function () {
    angular.module('todo')
        .controller('NewTodoController', NewTodoController);

    NewTodoController.$inject = ['todo', '$mdToast', '$mdDialog', '$route'];
    function NewTodoController(todo, $mdToast, $mdDialog, $route) {
        var vm = this;
        vm.todo = {};
        vm.create = function () {
            todo.createTodo(vm.todo).then(function (response) {
                $mdDialog.cancel();
                $route.reload();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                )
            })
        }
    }
})();
