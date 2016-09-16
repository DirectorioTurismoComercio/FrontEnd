'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', 
        function ($scope, $http, API_CONFIG, uiGmapIsReady, MapService, $rootScope,$location, municipalityInformationService, MunicipiosFactory, $q,  $log, $translate, messageService) {
        $scope.map = {
            center: {
                latitude:  parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude: parseFloat(municipalityInformationService.getMunicipalityName().longitud)
            },
            control: {},
            zoom: 13
        };

        var selectedSite = undefined;
        setPlaceholders();

        $scope.routeName = undefined;
        $scope.routeDescription = undefined;
        $scope.routeSites = [];
        $scope.submitted=false;

        $scope.simulateQuery = false;
        $scope.isDisabled    = false;
        


        $http({
            url: API_CONFIG.url + '/municipio/sitios', 
            method: "GET",
            params: {'municipio_id':60},

         }).then(function (response) {
                            console.log(response);
                            $scope.sites = response.data;
                        }
                    )
                    .catch(
                        function (errors) {
                            console.log("Errores retornado por el servidor", errors);
                            formValidator.emailAlreadyExistsShowError(errors);
                        }
                    );

        $scope.selectedSite = function(selected) {
            if (selected) {
                selectedSite=selected;

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
                if(selectedSite){
                $scope.routeSites.push(selectedSite);
                console.log($scope.routeSites);
                $scope.$broadcast('angucomplete-alt:clearInput');
                selectedSite=undefined;
                }
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
