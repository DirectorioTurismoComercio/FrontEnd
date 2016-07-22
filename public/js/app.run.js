
angular.module('gemStore')
    .run(function ($rootScope, $location, isUserLoggedIn, $window, $route) {

        var window = angular.element($window);

        window.bind('resize', function () {
            console.log('resize',$window.innerWidth);

            if($window.innerWidth<768){

            }

            $route.reload();
        });

        $rootScope.$on('$routeChangeStart', function (event, nextView) {
            if (nextView.required_roles !== undefined) {
                if (!isUserLoggedIn()) {
                    event.preventDefault();
                    $location.path('/home');
                }
            }
        });

    });
