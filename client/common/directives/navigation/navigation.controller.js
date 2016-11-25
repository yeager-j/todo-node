/**
 * Created by Jackson on 9/30/16.
 */

(function () {
    angular.module('todo')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$scope', '$route', '$location', '$mdSidenav', '$mdToast', 'authentication', 'fetchUser'];
    function NavigationController($scope, $route, $location, $mdSidenav, $mdToast, authentication, fetchUser) {
        var vm = this;
        vm.user = {
            username: 'Guest'
        };

        vm.toggleSidenav = function () {
            $mdSidenav('navigation').toggle();
        };

        vm.toggleUsernav = function () {
            $mdSidenav('userNav').toggle();
        };

        vm.logout = function () {
            authentication.logout();
            $location.path('/');
            $mdToast.show(
                $mdToast.simple()
                    .textContent('You have successfully logged out.')
                    .hideDelay(3000)
            )
        };

        $scope.$on('$routeChangeStart', function (next, current) {
            if (authentication.isLoggedIn()) {
                authentication.validate()
                    .then(function success(response) {
                        // do nothing
                    }, function failure(response) {
                        vm.logout();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Your token has been invalidated. Please log in again.')
                                .hideDelay(3000)
                        )
                    })
            }
        });

        $scope.$watch(function () {
            return authentication.getToken();
        }, function (newValue, oldValue) {
            vm.nav = [
                {
                    icon: 'home',
                    location: 'Home',
                    path: '#/'
                },
                {
                    icon: 'group',
                    location: 'Members',
                    path: '#/members'
                }
            ];

            if (authentication.isLoggedIn()) {
                fetchUser.getCurrentUser(function (user) {
                    vm.user = user;
                });

                vm.nav.push({
                    icon: 'note',
                    location: 'Todo List',
                    path: '#/todo'
                })
            } else {
                vm.user = {
                    username: 'Guest'
                }
            }

            vm.isLoggedIn = authentication.isLoggedIn();
        });
    }
})();
