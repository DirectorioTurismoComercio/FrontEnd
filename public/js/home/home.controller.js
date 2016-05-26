'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory, $location, $mdDialog, siteAndTownSaverService, messageService, MapRouteService) {

        $scope.routeToController = {
            routeFrom: '',
            routeTo: ''
        }

        $scope.doSearch = function (result) {
            if (result != undefined) {
                getSites(result);
            }
            else {
                messageService.showErrorMessage("Por favor ingrese un criterio de busqueda");
            }
        };


        $scope.showRoute = function (routeRequest) {
            MapRouteService.calculateRoute(routeRequest, $scope);
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
                console.log("ocurrio un error", error);
            });
        }
    })
;
