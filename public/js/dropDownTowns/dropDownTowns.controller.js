angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService, $translate, $rootScope,messageService) {


        $scope.selectTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown($scope.municipios[index]);
            $scope.selectedTown = $scope.municipios[index].nombre;
        };

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
            $scope.isonregistersite != true ? setFirstOption('Todo Cundinamarca','All Cundinamarca') : setFirstOption('Seleccione municipio','Seleccione municipio');
            setSelectlabelTownShowed();
        }).catch(function (error) {
            messageService.showErrorMessage("GET_TOWNS_ERROR");
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            if ($translate.use() == 'es') {
                $scope.isonregistersite != true ? addOption('Todo Cundinamarca',1) : addOption('Seleccione municipio',1);
            }

            if ($translate.use() == 'en') {
                $scope.isonregistersite != true ? addOption('All Cundinamarca',1) : addOption('Select town',1);
            }
            setSelectlabelTownShowed();
        });

        function setFirstOption(spanish,english){
            if($translate.use() == 'es'){
                addOption(spanish,0)
            }
            if($translate.use() == 'en'){
                addOption(english,0)
            }
        }

        function addOption(name,deleteItemsNumber) {
            $scope.municipios.splice(0, deleteItemsNumber, {
                nombre: name,
                latitud: 4.6363623,
                longitud: -74.0854427
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