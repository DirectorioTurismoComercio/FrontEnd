'use strict';

angular.module('vote', ['ngMaterial'])
    .config(function ($routeProvider) {
    	console.log("cargado");
        $routeProvider
            .when('/vote', {
                templateUrl: 'js/vote/vote.html',
                controller: 'VoteController'
            });
    });
