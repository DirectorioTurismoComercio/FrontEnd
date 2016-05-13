angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService) {
        setSelectlabelTownShowed();

        $scope.selectTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown($scope.municipios[index]);
            $scope.selectedTown = $scope.municipios[index].nombre;
        };

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
            $scope.isonregistersite != true ? addOption('Todo Cundinamarca') : addOption('Seleccione municipio');
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        function addOption(name) {
            $scope.municipios.splice(0, 0, {
                nombre: name,
            });
        }

        function setSelectlabelTownShowed() {
            var currentSelectedTown = siteAndTownSaverService.getCurrentSearchedTown();
            if (currentSelectedTown == null) {
                $scope.isonregistersite != true ? setSelectedTown('Todo Cundinamarca') : setSelectedTown('Seleccione municipio');
            }
            else {
                setSelectedTown(currentSelectedTown.nombre);
            }
        }

        function setSelectedTown(name) {
            $scope.selectedTown = {
                nombre: name,
            }
        }
    });