(function () {
    angular.module('todo')
        .controller('MemberController', MemberController);

    MemberController.$inject = ['fetchUser'];
    function MemberController(fetchUser) {
        var vm = this;
        vm.users = [];

        fetchUser.getAllUsers(function (users) {
            vm.users = users;
        });
    }
})();
