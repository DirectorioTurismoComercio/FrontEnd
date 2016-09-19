'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', 
        function ($scope, $http, API_CONFIG, uiGmapIsReady, MapService, uiGmapGoogleMapApi,
            $rootScope,$location, municipalityInformationService, $timeout, $q,  $log, $translate, messageService,MapRouteSitesService) {
        $scope.map = {
            center: {
                latitude:  5.050000000000000000,//parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude:  -73.883333333333300000//parseFloat(municipalityInformationService.getMunicipalityName().longitud)
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

        if(municipalityInformationService.getCurrentRoute()){
            var route = municipalityInformationService.getCurrentRoute();
              $scope.routeName = route.nombre;
             $scope.routeDescription = route.descripcion;
            for(var i=0;i<route.sitios.length;i++){     
            $scope.routeSites.push(route.sitios[i].sitio);
            }
            drawRoute();
        }
                
        $http({
            url: API_CONFIG.url + '/municipio/sitios', 
            method: "GET",
            params: {'municipio_id':60},

         }).then(function (response) {                
             $scope.sites = response.data;
        }
        )
        .catch(
            function (errors) {
                            console.log("Errores retornado por el servidor", errors);
                            formValidator.emailAlreadyExistsShowError(errors);
            }
        );
        
        function drawRoute(){            
            if($scope.routeSites.length>0){
            reloadMap();            
            MapRouteSitesService.calculateRoute($scope.routeSites, $scope, undefined);
            }
        }
        function reloadMap() {
            $timeout(function () {
                google.maps.event.trigger($scope.map.control.getGMap(), 'resize');
            });
        }            

        $scope.selectedSite = function(selected) {
            if (selected) {
                selectedSite=selected;

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
                $scope.routeSites.push(selectedSite.originalObject);
                $scope.$broadcast('angucomplete-alt:clearInput');
                selectedSite=undefined;
                   drawRoute();
                }
        }

        $scope.removeSite = function (index) {
            $scope.routeSites.splice(index, 1);
            drawRoute();
        }

        $scope.saveRoute=function(){
            $scope.submitted=true;
             if ($scope.municipalityRouteBasicInfoForm.$valid && $scope.routeSites.length>=2) {
                    sendToServer();
             }

            
            }

        function sendToServer(){
            var sites=[];
            for(var i=0;i<$scope.routeSites.length;i++){
                sites.push({sitio_id: $scope.routeSites[i].id, orden: i+1});
            }
           $http.post(
            API_CONFIG.url + '/ruta/crear',
            {
                'nombre': $scope.routeName,
                'descripcion': $scope.routeDescription,
                'sitio': 3004,
                'sitios': sites
            }
            
            ).then(function (response) {                
               $location.path('/municipalityaccountinfo');
            }
            )
            .catch(
                function (errors) {
                                console.log("Errores retornado por el servidor", errors);
                                
                }
                )
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
