'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady) {

        $scope.map = {
            center: {latitude: 4.6363623, longitude: -74.0854427}, control: {}, zoom: 9,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var position = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    };
                    MapService.clearMarkers();
                    MapService.addMarker(position, "pepe");
                    $scope.$apply();
                },
            }
        };

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
        });


        $scope.files = null;

        $scope.filesChange = function (elm) {
            $scope.files = elm.files;
            $scope.$apply();
        }


        $scope.upload = function () {
            console.log("el contenido de files", $scope.files);


            var fd = new FormData();
            var fotos = [];//new FormData();
            var i = 0;
            /*angular.forEach($scope.files,function(file) {
             fotos.push(file);
             i++;
             });*/
            fd.append('URLfoto', $scope.files[0]);
            fd.append('latitud', -74.12);
            fd.append('longitud', 4.23);
            fd.append('nombre', 'Pepe');


            console.log("el fd", fd);

            $http.post('http://ecosistema.desarrollo.com:8000/sitio', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (d) {
                    console.log("la respyesat de django", d);
                }).error(function (error) {
                console.log("hubo n error", error);
            });

        }

    });