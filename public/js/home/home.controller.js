'use strict';

angular.module('home',[])
    .controller('HomeController', function ($scope) {
        $scope.search =function(){
            console.log("hizo click en buscar");
        }
    });
