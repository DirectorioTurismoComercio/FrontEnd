angular.module('gemStore')
    .run(function ($rootScope, $location, autenticacionService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.authenticate) {
                if (!autenticacionService.getInfo()) {
                    event.preventDefault();
                    $location.path('/signin');
                }
            }

            if (autenticacionService.isUserAuthenticated()) {
                redirectToProfileMainIfForcesMainMenu(next);
            }
        });

        function redirectToProfileMainIfForcesMainMenu(next) {
            if (next.$$route.templateUrl == 'templates/signin/signin.html') {
                $location.path('/profileMain');
            }
        }
    });

