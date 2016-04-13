'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory, $location, $mdDialog, siteAndTownSaverService) {
        $scope.doSearch = function (result) {
           if(result!= undefined){
               SearchForResultsFactory.doSearch(result).then(function (response) {
                   if (response.length > 0) {
                       siteAndTownSaverService.setCurrentSearchedSite(result);
                       $location.path('/map');
                   } else {
                       showEmptyResultMessage("No se han encontrado resultados");
                   }
               }).catch(function (error) {
                   console.log("ocurrio un error", error);
               });
           }
            else{
               showEmptyResultMessage("Por favor ingrese un criterio de busqueda");
           }
        }

        function showEmptyResultMessage(message) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#alertPop')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent('$event')
            );
        }
    });
