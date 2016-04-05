'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, MunicipiosFactory, ResultRetriever, SearchForResultsFactory, $location, $mdDialog) {
        $scope.showExpandableContent = false;
        $scope.results = null;
        $scope.serverResults = [];

        MunicipiosFactory.query().$promise.then(function (response) {
            $scope.municipios = response;
            $scope.municipios.push(
                {
                    id: -1,
                    nombre: "Todo Cundinamarca"
                });
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        $scope.showSearchForm = function () {
            console.log("hizo click en buscar");
            $scope.showExpandableContent = !$scope.showExpandableContent;
        }

        $scope.selectedTown = function (index) {
            console.log("El municipio elegido fue", $scope.municipios[index].nombre);
        }

        $scope.lookForSuggestions = function (typedthings) {
            $scope.newresults = ResultRetriever.getresults(typedthings, "SuggestionsFactory");
            $scope.newresults.then(function (data) {
                $scope.results = data;
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
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
