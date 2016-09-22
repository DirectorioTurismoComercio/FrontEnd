'use strict';

angular.module('Municipality')
    .controller('searchMunicipalityController', function ($scope, $log, $translate, $location, MunicipalitiesDAO,
                                                          requestedMunicipalityDetail) {
        $scope.municipalitiesGroupedByLetter = [];
        $scope.search = {};

        MunicipalitiesDAO.getAllMunicipalities().then(function (municipalities) {
            $scope.municipalitiesGroupedByLetter = groupMunicipalitiesByLetter(municipalities);
        });

        $scope.showMunicipalityDetail = function (municipality) {
            requestedMunicipalityDetail.setMunicipality(municipality);
            $location.path('/map');
        };

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

    });
