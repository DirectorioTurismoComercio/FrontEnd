'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, popErrorAlertService) {

        $scope.sitePhoneNumber='';
        $scope.openingHours='';
        $scope.businessLocation='';
        $scope.businessDescription='';
        $scope.tags='';
        $scope.businessEmail='';

        $scope.map = {
            center: {latitude: 4.6363623, longitude: -74.0854427}, control: {}, zoom: 9,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    $scope.businessLocation = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    };
                    MapService.clearMarkers();
                    MapService.addMarker($scope.businessLocation, "pepe");
                    $scope.$apply();
                },
            }
        };

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
        });


        $scope.register=function(){
            doPhoneOnlyNumbersValidation();
            doEmailPatternValidation();
            doLocationInsideCundinamarcaValidation();
            doFieldValidation($scope.sitePhoneNumber, "Por favor ingrese un número teléfonico, o verifique el número ingresado");
            doFieldValidation($scope.openingHours, "Por favor ingrese un horario de atención");
            doFieldValidation($scope.businessName, "Por favor ingrese el nombre del local");
            doFieldValidation($scope.businessLocation, "Por favor ubique su local haciendo click en el mapa");
            doFieldValidation($scope.businessDescription, "Por favor ingrese una descripción de su local");
            doFieldValidation($scope.tags, "Por favor ingrese almenos un tag");
            doFieldValidation($scope.businessEmail, "Por favor ingrese un correo electrónico");
        }

        function doFieldValidation(field,errorMessage){
            if(field==''){
                popErrorAlertService.showPopErrorAlert(errorMessage);
            }
        }

        function doPhoneOnlyNumbersValidation(){
            if(!/^\d+$/.test($scope.sitePhoneNumber)){
                popErrorAlertService.showPopErrorAlert("Por favor, verifique el número ingresado")
            }
        }

        function doEmailPatternValidation(){
            if(!/^.+@.+\..+$/.test($scope.businessEmail)){
                popErrorAlertService.showPopErrorAlert("Por favor, verifique el email ingresado")
            }
        }

        function doLocationInsideCundinamarcaValidation(){
            if(!MapService.isPlaceInCundinamarca($scope.businessLocation.lat,$scope.businessLocation.lng)){
                popErrorAlertService.showPopErrorAlert("La ubicación del local está fuera de Cundinamarca")
            }
        }


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