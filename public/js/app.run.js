angular.module('gemStore')
    .run(function ($rootScope, $location, isUserLoggedIn) {
        var forbiddenURLsToForce=[
            'templates/signin/signin.html',
            'templates/signup/personal-data.html',
            'templates/signup/profile-summary.html',
            'templates/home/home.html'
        ];

        $rootScope.$on('$routeChangeStart', function (event, nextView) {
            if (nextView.required_roles !== undefined) {
                if (!isUserLoggedIn()) {
                    event.preventDefault();
                    $location.path('/signin');
                }
            }

            if (isUserLoggedIn()) {
                redirectToProfileMainIfForcesAForbiddenURL(nextView);
            }
        });

        function redirectToProfileMainIfForcesAForbiddenURL(nextView) {
            for(var i=0; i<= forbiddenURLsToForce.length; i++){
                if (nextView.$$route.templateUrl == forbiddenURLsToForce[i]) {
                    $location.path('/profileMain');
                }
            }
        }
    });