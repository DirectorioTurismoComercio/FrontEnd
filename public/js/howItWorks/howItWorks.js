'use strict';

angular.module('howItWorks', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/howitworks', {
                templateUrl: 'js/howItWorks/howItWorks.html',
                controller: 'HowItWorksController'
            });
    });

