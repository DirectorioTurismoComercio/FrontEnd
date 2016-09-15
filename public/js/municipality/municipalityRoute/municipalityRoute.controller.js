/*'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', function ($scope, uiGmapIsReady, MapService, $location, municipalityInformationService) {
        $scope.map = {
            center: {
                latitude: parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude: parseFloat(municipalityInformationService.getMunicipalityName().longitud)
            },
            control: {},
            zoom: 13
        };

        $scope.routeName = undefined;
        $scope.routeDescription = undefined;
        $scope.routeSites = [];
        $scope.submitted=false;


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());
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

    });*/


(function () {
    'use strict';
    angular
        .module('Municipality')
        .controller('municipalityRouteController', function($timeout, $q, $log, $scope, MunicipiosFactory){
            

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


            //$scope.repos=loadAll();



            // ******************************
            // Internal methods
            // ******************************

            /**
             * Search for repos... use $timeout to simulate
             * remote dataservice call.
             */
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

            /**
             * Build `components` list of key/value pairs
             */
            function loadAll() {
                var repos = [
                    {
                        'name'      : 'Angular 1',
                        'url'       : 'https://github.com/angular/angular.js',
                        'watchers'  : '3,623',
                        'forks'     : '16,175',
                    },
                    {
                        'name'      : 'Angular 2',
                        'url'       : 'https://github.com/angular/angular',
                        'watchers'  : '469',
                        'forks'     : '760',
                    },
                    {
                        'name'      : 'Angular Material',
                        'url'       : 'https://github.com/angular/material',
                        'watchers'  : '727',
                        'forks'     : '1,241',
                    },
                    {
                        'name'      : 'Bower Material',
                        'url'       : 'https://github.com/angular/bower-material',
                        'watchers'  : '42',
                        'forks'     : '84',
                    },
                    {
                        'name'      : 'Material Start',
                        'url'       : 'https://github.com/angular/material-start',
                        'watchers'  : '81',
                        'forks'     : '303',
                    }
                ];
                return repos.map( function (repo) {
                    repo.value = repo.name.toLowerCase();
                    return repo;
                });
            }

            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(item) {
                    return (item.value.indexOf(lowercaseQuery) === 0);
                };

            }
        

        });





})();

