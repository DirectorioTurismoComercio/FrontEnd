'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog, siteAndTownSaverService,
                                            messageService, MapService) {

        siteAndTownSaverService.resetSearchAndRoute();

        $scope.doSearch = function (result) {
            if (result != undefined) {
                MapService.clearRoute();
                getSites(result);
            }
            else {
                messageService.showErrorMessage("Por favor ingrese un criterio de busqueda");
            }
        };


        $scope.showRoute = function () {
            $location.path('/map');
        };

        $scope.goToHowItWorks = function () {
            $location.path('/howitworks');
        }

        function getSites(result) {
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    siteAndTownSaverService.setCurrentSearchedSite(result);
                    $location.path('/map');
                } else {
                    messageService.showErrorMessage("No se han encontrado resultados");
                }
            }).catch(function (error) {
                messageService.showErrorMessage("GET_SITES_ERROR");
            });
        }
    })
;
