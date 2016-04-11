angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory) {

        $scope.selectedTown = function (index) {
            console.log("El municipio elegido fue", $scope.municipios[index].nombre);
        }

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });
    });