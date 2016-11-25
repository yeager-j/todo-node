/**
 * Created by Jackson on 10/12/16.
 */
(function () {
    angular.module('todo', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate'])
        .run(run);

    run.$inject = ['$rootScope', 'Access', '$location', '$mdToast', 'fetchUser'];
    function run($rootScope, Access, $location, $mdToast, fetchUser) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection == Access.UNAUTHORIZED) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Sorry, you can\'t access this page.')
                );
                $location.path('/');
            } else if (rejection == Access.FORBIDDEN) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('You do not have permission to access this page.')
                );
                $location.path('/');
            }
        });
    }
})();
