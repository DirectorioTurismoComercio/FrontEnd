'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, MunicipiosFactory, ResultRetriever, SearchForResultsFactory) {
        $scope.showExpandableContent=false;
        $scope.results =null;
        $scope.serverResults = [];

        $scope.showSearchForm=function(){
            console.log("hizo click en buscar");
            $scope.showExpandableContent=!$scope.showExpandableContent;
        }

        $scope.makeSearch =function(){
            console.log("presiono en realizar búsqueda");
        }

        $scope.selectedTown = function(index){
            console.log("El municipio elegido fue", $scope.municipios[index].nombre);
        }

        $scope.lookForSuggestions = function (typedthings) {
            $scope.newresults = ResultRetriever.getresults(typedthings, "SuggestionsFactory");
            $scope.newresults.then(function (data) {
                $scope.results = data;
            }).catch(function(error){
                console.log("ocurrio un error", error);
            });
        }

        $scope.doSearch = function (result) {
            SearchForResultsFactory.query({search: result},
                function (data) {
                    $scope.serverResults = data;
                }
            );
            console.log("Los resultados fueron ", JSON.stringify($scope.serverResults));
        }

        $scope.doSearchBySuggestion = function (suggestion) {
            SearchForResultsFactory.query({search: suggestion},
                function (data) {
                    $scope.serverResults = data;
                }
            );
        };

        MunicipiosFactory.query().$promise.then(function (response) {
            $scope.municipios = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });
    });
