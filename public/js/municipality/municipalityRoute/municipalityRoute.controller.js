'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', function ($scope, uiGmapIsReady, MapService, $location, municipalityInformationService, MunicipiosFactory, $q,  $log, $translate) {
        $scope.map = {
            center: {
                latitude: parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude: parseFloat(municipalityInformationService.getMunicipalityName().longitud)
            },
            control: {},
            zoom: 13
        };

        $scope.texto=$translate.instant("TABS_CONSTANTS.ROUTE_STARTING_POINT");
        $scope.routeName = undefined;
        $scope.routeDescription = undefined;
        $scope.routeSites = [];
        $scope.submitted=false;

        $scope.simulateQuery = false;
        $scope.isDisabled    = false;

        MunicipiosFactory.getTowns().then(function (response) {
            $scope.repos = response;
            console.log($scope.repos);
            $scope.repos=$scope.repos.map( function (repo) {
                repo.value = repo.nombre.toLowerCase();
                return repo;
            });
            console.log("luego del map", $scope.repos)
        }).catch(function (error) {
            messageService.showErrorMessage("GET_TOWNS_ERROR");
        });


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());
        }

        $scope.querySearch =function (query) {
            var results = query ? $scope.repos.filter( createFilterFor(query) ) : $scope.repos,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.searchTextChange = function(text) {
            $log.info('Text changed to ' + text);
        }

        $scope.selectedItemChange = function(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        $scope.changeViewMunicipalityAccount = function () {
            $location.path('/municipalityaccountinfo');
        }

        $scope.cancelRegister = function () {
            $location.path('/municipalityaccountinfo');
        }

        $scope.addSite = function () {
            var newRouteSite = $scope.routeSites.length + 1;
            $scope.routeSites.push({'id': 'site' + newRouteSite});
        }

        $scope.removeSite = function (index) {
            $scope.routeSites.splice(index, 1);
        }

        $scope.saveRoute=function(){
            $scope.submitted=true;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };

        }

    });
