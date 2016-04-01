'use strict';

angular.module('home',[])
    .controller('HomeController', function ($scope, MunicipiosFactory) {
        $scope.showExpandableContent=false;

        $scope.search =function(){
            console.log("hizo click en buscar");
            $scope.showExpandableContent=!$scope.showExpandableContent;
        }

        $scope.makeSearch =function(){
            console.log("presiono en realizar búsqueda");
        }

        $scope.selectedTown = function(index){
            console.log("El municipio elegido fue", $scope.municipios[index].nombre);
        }

        MunicipiosFactory.query().$promise.then(function (response) {
            $scope.municipios = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });
    });
