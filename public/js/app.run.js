angular.module('gemStore')
    .run(function ($rootScope, $location, isUserLoggedIn) {
        var forbiddenURLsToForce=[
            'templates/signin/signin.html',
            'templates/signup/roles.html',
            'templates/signup/personal-data.html',
            'templates/signup/business-data.html',
            'templates/signup/profile-summary.html',
            'templates/auth/auth.html'
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