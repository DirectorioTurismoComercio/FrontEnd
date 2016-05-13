'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, popErrorAlertService, CUNDINAMARCA_COORDS,
                                                    BOGOTA_COORDS, API_CONFIG, siteAndTownSaverService) {

        $scope.sitePhoneNumber = undefined;
        $scope.openingHours = undefined;
        $scope.businessName = undefined;
        $scope.businessLocation = undefined;
        $scope.businessDescription = undefined;
        $scope.tags = undefined;
        $scope.businessEmail = undefined;
        $scope.businessAddress=undefined;
        $scope.files = undefined;

        $scope.map = {
            center: {latitude: 4.6363623, longitude: -74.0854427}, control: {}, zoom: 9,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    getClickedPositionCoordinates(originalEventArgs);
                    $scope.$apply();
                },
            }
        };

        var joinOfFormatted_address;

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
        });

        $scope.filesChange = function (elm) {
            $scope.files = elm.files;
            $scope.$apply();
        };

        $scope.register = function () {

            var fd = new FormData();
            var i = 0;
            angular.forEach($scope.files, function (file) {
                fd.append('foto' + i, file);
                i++;
            });

            fd.append('latitud', $scope.businessLocation.lat);
            fd.append('longitud', $scope.businessLocation.lng);
            fd.append('nombre', $scope.businessName);
            fd.append('descripcion', $scope.businessDescription);
            fd.append('municipio',siteAndTownSaverService.getCurrentSearchedTown().id);
            fd.append('telefono',$scope.sitePhoneNumber);
            fd.append('horariolocal',$scope.openingHours);
            fd.append('correolocal',$scope.businessEmail);
            fd.append('ubicacionlocal', $scope.businessAddress);


            $http.post(API_CONFIG.url+API_CONFIG.sitio, fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (d) {
                    console.log("la respyesat de django", d);
                }).error(function (error) {
                console.log("hubo n error", error);
            });
            siteAndTownSaverService.setCurrentSearchedTown(undefined);
        };

        function getClickedPositionCoordinates(originalEventArgs) {
            var e = originalEventArgs[0];
            $scope.businessLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
            getClickedPositionTown();
        }

        function getClickedPositionTown(){
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.businessLocation.lat+','+$scope.businessLocation.lng+'&sensor=true')
                .success(function(response){
                    joinOfFormatted_address=response.results[0].formatted_address+response.results[1].formatted_address;
                    MapService.clearMarkers();
                    drawMarkerIfIsInsideBoundaries();
                });
        }

        function drawMarkerIfIsInsideBoundaries() {
            if(!joinOfFormatted_address.includes(siteAndTownSaverService.getCurrentSearchedTown().nombre)){
                displayOutsideBoundaryErrorMessage("Verifique que la ubicación se encuentre en el municipio seleccionado");
            }else{
                MapService.addMarker($scope.businessLocation, $scope.businessName);
            }
        }

        function displayOutsideBoundaryErrorMessage(message) {
            popErrorAlertService.showPopErrorAlert(message);
            $scope.businessLocation = undefined;
        }

    });