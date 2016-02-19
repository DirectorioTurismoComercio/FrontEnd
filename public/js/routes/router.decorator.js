angular.module('gemStore')
    .run(function ($rootScope, $location, autenticacionService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.authenticate) {
                if (!autenticacionService.isUserAuthenticated()) {
                    event.preventDefault();
                    $location.path('/signin');
                }
            }
        });
    });

