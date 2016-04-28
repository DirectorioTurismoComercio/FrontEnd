angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService) {

        setSelectlabelTownShowed();

        $scope.selectTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown($scope.municipios[index]);
            $scope.selectedTown =$scope.municipios[index].nombre;
        };

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
            $scope.municipios.splice(0, 0, {
                nombre: 'Todo Cundinamarca',
            });
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        function setSelectlabelTownShowed() {
            var currentSelectedTown = siteAndTownSaverService.getCurrentSearchedTown();
            if (currentSelectedTown == null) {
                $scope.selectedTown = {
                    nombre: 'Todo Cundinamarca',
                }
            } else {
                $scope.selectedTown = {
                    nombre: currentSelectedTown.nombre
                }
            }
        }
    });