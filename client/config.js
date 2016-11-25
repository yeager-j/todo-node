(function () {
    angular.module('todo')
        .config(config);

    config.$inject = ['$routeProvider', '$mdThemingProvider'];
    function config($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.shouldBeLoggedIn(false);
                    }]
                }
            })

            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.shouldBeLoggedIn(false);
                    }]
                }
            })

            .when('/members', {
                templateUrl: 'members/members.view.html',
                controller: 'MemberController',
                controllerAs: 'vm'
            })

            .when('/profile/:user', {
                templateUrl: '/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })

            .when('/todo', {
                templateUrl: '/todo/todo-list.view.html',
                controller: 'TodoListController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.shouldBeLoggedIn(true);
                    }]
                }
            })

            .when('/todo/:id', {
                templateUrl: '/todo/todo.view.html',
                controller: 'TodoController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.shouldBeLoggedIn(true);
                    }]
                }
            })

            .otherwise({
                redirectTo: '/'
            });

        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('indigo')
            .warnPalette('red')
            .backgroundPalette('grey');
    }
})();
