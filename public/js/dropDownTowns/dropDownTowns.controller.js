angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService, $translate, $rootScope) {
        setSelectlabelTownShowed();
        $scope.selectedTown = {
            nombre: 'Todo Cundinamarca',
        }


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

        $rootScope.$on('$translateChangeSuccess', function () {
            if($translate.use()=='es'){

                $scope.municipios.splice(0, 1, {
                    nombre: 'Todo Cundinamarca',
                });

                $scope.selectedTown = {
                    nombre: 'Todo Cundinamarca',
                }


            }

            if($translate.use()=='en'){
                $scope.municipios.splice(0, 1, {
                    nombre: 'All Cundinamarca',
                });

                $scope.selectedTown = {
                    nombre: 'All Cundinamarca',
                }
                
            }

            console.log("municipio agregado", $scope.municipios[0].nombre);
            console.log("municipio seleccionado", $scope.selectedTown.nombre);

        });

        function addOption(name) {
            $scope.municipios.splice(0, 0, {
                nombre: name,
            });
        }

        function setSelectlabelTownShowed() {
            /*var currentSelectedTown = siteAndTownSaverService.getCurrentSearchedTown();
            if (currentSelectedTown == null) {
                $scope.isonregistersite != true ? setSelectedTown('Todo Cundinamarca') : setSelectedTown('Seleccione municipio');

            }
            else {
                setSelectedTown(currentSelectedTown.nombre);
            }*/
        }

        function setSelectedTown(name) {
            $scope.selectedTown = {
                nombre: name,
            }
        }
    });