'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', 
        function ($scope, $http, API_CONFIG, uiGmapIsReady, MapService, $rootScope,$location, municipalityInformationService, MunicipiosFactory, $q,  $log, $translate, messageService) {
        $scope.map = {
            center: {
                latitude: 0, // parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude: 0 // parseFloat(municipalityInformationService.getMunicipalityName().longitud)
            },
            control: {},
            zoom: 13
        };

        setPlaceholders();

        $scope.routeName = undefined;
        $scope.routeDescription = undefined;
        $scope.routeSites = [];
        $scope.submitted=false;

        $scope.simulateQuery = false;
        $scope.isDisabled    = false;

 /*        MunicipiosFactory.getTowns().then(function (response) {
            $scope.repos = response;
                  console.log(response);
        }).catch(function (error) {
            messageService.showErrorMessage("GET_TOWNS_ERROR");
        }); 
*/
        $http({
            url: API_CONFIG.url + '/municipio/sitios', 
            method: "GET",
            params: {'municipio_id':60},

         }).then(function (response) {
                            console.log(response);
                            $scope.repos = response.data;
                        }
                    )
                    .catch(
                        function (errors) {
                            console.log("Errores retornado por el servidor", errors);
                            formValidator.emailAlreadyExistsShowError(errors);
                        }
                    );

        $scope.selectedCountry = function(selected) {
            if (selected) {
                window.alert('You have selected ' + selected.title);
            } else {
                console.log('cleared');
            }
        };

        $rootScope.$on('$translateChangeSuccess', function () {
            setPlaceholders();
        });


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


        function setPlaceholders(){
            if($translate.use()=='en'){
                $scope.startPointPlaceholder=$translate.instant("ROUTE_CREATION.ROUTE_START_POINT_ENGLISH");
                $scope.destinationPointPlaceholder=$translate.instant("ROUTE_CREATION.ROUTE_DESTINATION_POINT_ENGLISH");
                $scope.sitePointPlaceholder=$translate.instant("ROUTE_CREATION.ROUTE_POINT_ENGLISH");
            }
            if($translate.use()=='es')
            {
                $scope.startPointPlaceholder=$translate.instant("ROUTE_CREATION.ROUTE_START_POINT");
                $scope.destinationPointPlaceholder=$translate.instant("ROUTE_CREATION.ROUTE_DESTINATION_POINT");
                $scope.sitePointPlaceholder=$translate.instant("ROUTE_CREATION.ROUTE_POINT");


            }
        }

    });
