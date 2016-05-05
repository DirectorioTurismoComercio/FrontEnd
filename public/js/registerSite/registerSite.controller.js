'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, popErrorAlertService, CUNDINAMARCA_COORDS, BOGOTA_COORDS) {

        $scope.sitePhoneNumber=undefined;
        $scope.openingHours=undefined;
        $scope.businessLocation=undefined;
        $scope.businessDescription=undefined;
        $scope.tags=undefined;
        $scope.businessEmail=undefined;

        $scope.map = {
            center: {latitude: 4.6363623, longitude: -74.0854427}, control: {}, zoom: 9,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    getClickedPositionCoordinates(originalEventArgs);
                    MapService.clearMarkers();
                    drawMarkerIfIsInsideBoundaries();
                    $scope.$apply();
                },
            }
        };

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
        });

        $scope.register=function(){
            alert("presiono registrarse");
        }

        function getClickedPositionCoordinates(originalEventArgs){
            var e = originalEventArgs[0];
            $scope.businessLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
        }

        function drawMarkerIfIsInsideBoundaries(){
            var isBusinessInsideCundinamarca=MapService.isPlaceInsideBoundaries($scope.businessLocation.lat,$scope.businessLocation.lng, CUNDINAMARCA_COORDS);
            var isBusinessInsideBogota=MapService.isPlaceInsideBoundaries($scope.businessLocation.lat,$scope.businessLocation.lng, BOGOTA_COORDS);

            if(!isBusinessInsideCundinamarca){
                displayOutsideBoundaryErrorMessage("La ubicación del local está fuera de Cundinamarca");
            }

            if(isBusinessInsideBogota){
                displayOutsideBoundaryErrorMessage("La ubicación del local está dentro de Bogotá");
            }

            if(isBusinessInsideCundinamarca && !isBusinessInsideBogota){
                MapService.addMarker($scope.businessLocation, "pepe");
            }
        }

        function displayOutsideBoundaryErrorMessage(message){
            popErrorAlertService.showPopErrorAlert(message);
            $scope.businessLocation=undefined;
        }

        $scope.files = null;

        $scope.filesChange = function (elm) {
            $scope.files = elm.files;
            $scope.$apply();
        }



        $scope.upload = function () {
            console.log("el contenido de files", $scope.files);




            var fd=new FormData();
            var i=0;
            angular.forEach($scope.files,function(file) {
                fd.append('foto'+i,file);
                i++;
            });

            fd.append('latitud',-74.12);
            fd.append('longitud',4.23);
            fd.append('nombre','juancho2');


            console.log("el fd",fd);

            $http.post('http://ecosistema.desarrollo.com:8000/sitio', fd,
                {
                    transformRequest:angular.identity,
                    headers: {'Content-Type':undefined}
                })
                .success(function (d) {
                    console.log("la respyesat de django", d);
                }).error(function (error) {
                console.log("hubo n error", error);
            });

        }

    });