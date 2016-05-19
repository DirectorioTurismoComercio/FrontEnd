angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService, $translate, $rootScope) {


        $scope.selectTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown($scope.municipios[index]);
            $scope.selectedTown = $scope.municipios[index].nombre;
        };

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
            $scope.isonregistersite != true ? addOption('Todo Cundinamarca') : addOption('Seleccione municipio');
            setSelectlabelTownShowed();
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            if ($translate.use() == 'es') {
                $scope.isonregistersite != true ? addOption('Todo Cundinamarca') : addOption('Seleccione municipio');
            }

            if ($translate.use() == 'en') {
                $scope.isonregistersite != true ? addOption('All Cundinamarca') : addOption('Select town');
            }
            setSelectlabelTownShowed();
        });

        function addOption(name) {
            $scope.municipios.splice(0, 1, {
                nombre: name,
            });
        }

        function setSelectlabelTownShowed() {
            var currentSelectedTown = siteAndTownSaverService.getCurrentSearchedTown();
            if (currentSelectedTown == undefined || (currentSelectedTown.nombre).indexOf('Cundinamarca') > -1 || (currentSelectedTown.nombre).indexOf('Selec') > -1) {
                setCundinamarcaLabel();
            }
            else {
                $scope.selectedTown = currentSelectedTown.nombre;
            }
        }

        function setCundinamarcaLabel() {
            if ($translate.use() == 'es') {
                setLabelDependOnTemplate('Todo Cundinamarca', 'Seleccione municipio');
            }

            if ($translate.use() == 'en') {
                setLabelDependOnTemplate('All Cundinamarca', 'Select town');
            }
        }

        function setLabelDependOnTemplate(homeMessage, registerSiteMessage) {
            if ($scope.isonregistersite != true) {
                $scope.selectedTown = homeMessage;
            } else {
                $scope.selectedTown = registerSiteMessage;
            }
        }
    });