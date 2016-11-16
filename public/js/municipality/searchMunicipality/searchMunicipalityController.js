'use strict';

angular.module('Municipality')
    .controller('searchMunicipalityController', function ($scope, $log, $translate, $location, MunicipalitiesDAO,
                                                          requestedMunicipalityDetail, $rootScope, navigationService, siteAndTownSaverService, ImageService) {
        $scope.municipalitiesGroupedByLetter = [];
        $scope.search = {};
        $scope.languageSelected=$translate.use();

        MunicipalitiesDAO.getAllMunicipalities().then(function (municipalities) {
            $scope.municipalitiesGroupedByLetter = groupMunicipalitiesByLetter(municipalities);
        });

        $scope.showMunicipalityDetail = function (municipality) {
            requestedMunicipalityDetail.setMunicipality(municipality)
            navigationService.setMunicipalityDetailNavigation('fromMunicipalitiesList');
            siteAndTownSaverService.setQueryMadeByUser(undefined);
            $location.path('/map');
        };

        $scope.getMunicipalityDescription=function(municipality){
            if($scope.languageSelected=='en'){
                return municipality.description;
            }
            if($scope.languageSelected=='es'){
                return municipality.descripcion;
            }
        }

        function groupMunicipalitiesByLetter(municipalities) {
            var lastFoundLetter;
            var groupedMunicipalities = [];

            for (var i = 0; i < municipalities.length; i++) {
                var municipality = municipalities[i];
                var nameFirstLetter = municipality.nombre.charAt(0);

                if (lastFoundLetter != nameFirstLetter) {
                    lastFoundLetter = nameFirstLetter;
                    addNewGroup(groupedMunicipalities, lastFoundLetter);
                }

                addNewMunicipality(groupedMunicipalities, municipality);
            }

            return groupedMunicipalities;
        }

        function addNewGroup(array, letter) {
            array.push({
                letter: letter,
                visible: true,
                municipalities: []
            });
        }

        function addNewMunicipality(array, municipality) {
            municipality.visible = true;
            array[array.length - 1].municipalities.push(municipality);
        }

        $scope.getFirstLetter = function (municipality) {
            return municipality.nombre.charAt(0);
        };

        $rootScope.$on('$translateChangeSuccess', function () {
            $scope.languageSelected = $translate.use();
        });

        $scope.getMunicipalityImage=function(municipality){
            return ImageService.getMainMunicipalityImage(municipality)
        }

    });
