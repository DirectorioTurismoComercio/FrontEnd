angular.module('gemStore')
    .run(function ($rootScope, $location, isUserLoggedIn) {

        $rootScope.$on('$routeChangeStart', function (event, nextView) {
            if (nextView.required_roles !== undefined) {
                if (!isUserLoggedIn()) {
                    event.preventDefault();
                    $location.path('/home');
                }
            }
        });

    });
