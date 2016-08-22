'use strict';

angular.module('howItWorks', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/howitworks', {
                templateUrl: 'js/howItWorks/howItWorks.html',
                controller: 'HowItWorksController'
            })

            .when('/howitworksTrader', {
                templateUrl: 'js/howItWorks/howItWorksTrader/howItWorksTrader.html',
                controller: 'HowItWorksTraderController'
            });
    });

