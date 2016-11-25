(function () {
    angular.module('todo')
        .controller('TodoListController', TodoListController);

    TodoListController.$inject = ['fetchTodos', '$mdDialog'];
    function TodoListController(fetchTodos, $mdDialog) {
        var vm = this;
        vm.cards = [];
        vm.new = function () {
            $mdDialog.show({
                templateUrl: '/todo/new/new-todo.template.html',
                controller: 'NewTodoController',
                controllerAs: 'vm',
                clickOutsideToClose: true
            })
        };

        fetchTodos.getTodoList(function (todos) {
            vm.cards = todos;
            console.log(vm.cards);
        });
    }
})();
