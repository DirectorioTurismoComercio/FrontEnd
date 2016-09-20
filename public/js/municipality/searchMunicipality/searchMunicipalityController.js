'use strict';

angular.module('Municipality')
    .controller('searchMunicipalityController', function ($scope, $log, $translate, MunicipalitiesDAO) {
        $scope.municipalitiesGroupedByLetter = [];

        MunicipalitiesDAO.getAllMunicipalities().then(function (municipalities) {
            $scope.municipalitiesGroupedByLetter = groupMunicipalitiesByLetter(municipalities);
        });


        function groupMunicipalitiesByLetter(municipalities) {
            var lastFoundLetter;
            var groupedMunicipalities = [];

            for (var i = 0; i < municipalities.length; i++) {
                const municipality = municipalities[i];
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
                municipalities: []
            });
        }

        function addNewMunicipality(array, municipality) {
            array[array.length - 1].municipalities.push(municipality);
        }

        $scope.getFirstLetter = function (municipality) {
            return municipality.nombre.charAt(0);
        }
    });
