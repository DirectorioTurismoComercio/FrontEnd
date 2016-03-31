'use strict';

angular.module('home',[])
    .controller('HomeController', function ($scope) {
        $scope.mostrar=false;

        $scope.search =function(){
            console.log("hizo click en buscar");
            $scope.mostrar=!$scope.mostrar;
        }

        $scope.makeSearch =function(){
            console.log("presiono en realizar búsqueda");
        }
    });
