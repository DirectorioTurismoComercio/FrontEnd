'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory, $location, $mdDialog) {
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible =false;
        $scope.results = null;
        $scope.serverResults = [];

        $scope.showSearchForm = function () {
            $scope.isRouteFormVisible=false;
            $scope.isSearchFormVisible = !$scope.isSearchFormVisible;

            console.log("selcciono buscar");

        }

        $scope.showRouteForm = function(){
            $scope.isSearchFormVisible=false;
            $scope.isRouteFormVisible=!$scope.isRouteFormVisible;
        }

        $scope.doSearch = function (result) {
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    $location.path('/map');
                } else {
                    showEmptyResultMessage("No se han encontrado resultados");
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
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
