'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory, $location, $mdDialog, siteAndTownSaverService, popErrorAlertService) {
        $scope.doSearch = function (result) {
           if(result!= undefined){
                getSites(result);
           }
            else{
               popErrorAlertService.showPopErrorAlert("Por favor ingrese un criterio de busqueda");
           }
        };

        function getSites(result){
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
