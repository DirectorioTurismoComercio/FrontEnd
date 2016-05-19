'use strict';

angular.module('registerTrader', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registertrader', {
                templateUrl: 'js/registerTrader/registertrade.html',
                controller: 'registerTradeController'
            });

    });