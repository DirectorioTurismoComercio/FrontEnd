angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService) {

        $scope.selectedTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown(index);
        }

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });
    });