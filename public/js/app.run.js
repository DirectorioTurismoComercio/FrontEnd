angular.module('gemStore')
    .run(function ($rootScope, $location, isUserLoggedIn, authenticationService) {
        $rootScope.$on('$routeChangeStart', function (event, nextView) {
            if (nextView.required_roles !== undefined) {
                if (!isUserLoggedIn()) {
                    event.preventDefault();
                    $location.path('/signin');
                }
            }

            if (authenticationService.getUser()!==null) {
                redirectToProfileMainIfForcesMainMenu(nextView);
            }
        });

        function redirectToProfileMainIfForcesMainMenu(nextView) {
            if (nextView.$$route.templateUrl == 'templates/signin/signin.html') {
                $location.path('/profileMain');
            }
        }
    });