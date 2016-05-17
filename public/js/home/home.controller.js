'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory, $location, $mdDialog, siteAndTownSaverService, popErrorAlertService, MapRouteService) {

        $scope.routeToController = {
            routeFrom: '',
            routeTo: ''
        }

        $scope.doSearch = function (result) {
            if (result != undefined) {
                getSites(result);
            }
            else {
                popErrorAlertService.showPopErrorAlert("Por favor ingrese un criterio de busqueda");
            }
        };

        $scope.calculateRoute = function () {
            if(MapRouteService.setOriginAndDestinationdata($scope.routeToController.routeFrom, $scope.routeToController.routeTo, 'home')){
                siteAndTownSaverService.setSearchedRoute("", "");
                $location.path('/map');
            }
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
                    popErrorAlertService.showPopErrorAlert("No se han encontrado resultados");
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }
    });
