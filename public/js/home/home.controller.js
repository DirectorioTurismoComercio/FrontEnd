'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, MunicipiosFactory, ResultRetriever, SearchForResultsFactory, $location) {
        $scope.showExpandableContent = false;
        $scope.results = null;
        $scope.serverResults = [];

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
            SearchForResultsFactory.doSearch(result).then(function(response){
                $location.path('/map');
                console.log("Los resultados en el controlador home son", SearchForResultsFactory.getResults());
            }).catch(function(error){
                console.log("ocurrio un error", error);
            });
        }


        MunicipiosFactory.query().$promise.then(function (response) {
            $scope.municipios = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });
    });
