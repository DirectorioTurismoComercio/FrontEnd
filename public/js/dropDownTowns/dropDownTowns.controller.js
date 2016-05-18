angular.module('dropDownTowns', [])
    .controller('dropDownTownsController', function ($scope, MunicipiosFactory, siteAndTownSaverService, $translate, $rootScope) {


        $scope.selectTown = function (index) {
            siteAndTownSaverService.setCurrentSearchedTown($scope.municipios[index]);
            $scope.selectedTown = $scope.municipios[index].nombre;
        };

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipios = response;
            setSelectlabelTownShowed();
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            if($translate.use()=='es'){
                addOption('Todo Cundinamarca');
            }

            if($translate.use()=='en'){
                addOption('All Cundinamarca');
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
            if (currentSelectedTown == null) {
                setAllCundinamarcaLabel();
            }
            else {
                $scope.selectedTown = currentSelectedTown.nombre;
            }
        }

        function setAllCundinamarcaLabel(){
            if($translate.use()=='es'){
                $scope.selectedTown = 'Todo Cundinamarca';
            }

            if($translate.use()=='en'){
                $scope.selectedTown = 'All Cundinamarca';
            }
        }

    });