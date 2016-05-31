angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService, $translate, $rootScope) {


        $scope.selectTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown($scope.municipios[index]);
            $scope.selectedTown = $scope.municipios[index].nombre;
        };

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
            $scope.isonregistersite != true ? setFirstOption('Todo Cundinamarca','All Cundinamarca') : setFirstOption('Seleccione municipio','Seleccione municipio');
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

        function setFirstOption(spanish,english){
            if($translate.use() == 'es'){
                addOption(spanish)
            }
            if($translate.use() == 'en'){
                addOption(english)
            }
        }

        function addOption(name) {
            $scope.municipios.splice(0, 1, {
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
                console.log("entro a cundinamarca español");
                setLabelDependOnTemplate('Todo Cundinamarca', 'Seleccione municipio');
            }

            if ($translate.use() == 'en') {
                console.log("entro a cundinamarca inglés");
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