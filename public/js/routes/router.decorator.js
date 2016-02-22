angular.module('gemStore')
    .run(function ($rootScope, $location, autenticacionService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.authenticate) {
                if (!autenticacionService.getInfo()) {
                    event.preventDefault();
                    $location.path('/signin');
                }
            }
        });
    });

