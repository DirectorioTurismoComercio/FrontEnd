'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, popErrorAlertService, CUNDINAMARCA_COORDS,
                                                    BOGOTA_COORDS, categories, API_CONFIG) {

        $scope.sitePhoneNumber = undefined;
        $scope.openingHours = undefined;
        $scope.businessName = undefined;
        $scope.businessLocation = undefined;
        $scope.businessDescription = undefined;
        $scope.tags = undefined;
        $scope.businessEmail = undefined;
        $scope.files = undefined;

        $scope.businessCategories = {
            category: '',
            subcategory: '',
        };

        $scope.item={
            hours:[]
        }

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

        categories.getCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });


        $scope.filesChange = function (elm) {
            $scope.files = elm.files;
            $scope.$apply();
        };

        $scope.register = function () {

            var categorias = [1, 2];


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
            fd.append('categorias', 1);
            fd.append('categorias', 4);

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

        };

        $scope.getControllerSubcategories = function () {
            if ($scope.businessCategories.category == undefined) {
                resetCategoriesModel();
            } else {
                getSubcategories();
            }
        }


        function resetCategoriesModel() {
            $scope.subcategories = undefined;
            $scope.businessCategories.subcategory = undefined;
        }

        function getSubcategories() {
            categories.getSubcategories($scope.businessCategories.category).then(function (response) {
                $scope.subcategories = response;
            }).catch(function (error) {
                console.log("hubo un error", error);
            });
        }


        function getClickedPositionCoordinates(originalEventArgs) {
            var e = originalEventArgs[0];
            $scope.businessLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
        }

        function drawMarkerIfIsInsideBoundaries() {
            var isBusinessInsideCundinamarca = MapService.isPlaceInsideBoundaries($scope.businessLocation.lat, $scope.businessLocation.lng, CUNDINAMARCA_COORDS);
            var isBusinessInsideBogota = MapService.isPlaceInsideBoundaries($scope.businessLocation.lat, $scope.businessLocation.lng, BOGOTA_COORDS);

            if (!isBusinessInsideCundinamarca) {
                displayOutsideBoundaryErrorMessage("La ubicación del local está fuera de Cundinamarca");
            }

            if (isBusinessInsideBogota) {
                displayOutsideBoundaryErrorMessage("La ubicación del local está dentro de Bogotá");
            }

            if (isBusinessInsideCundinamarca && !isBusinessInsideBogota) {
                MapService.addMarker($scope.businessLocation, $scope.businessName);
            }
        }

        function displayOutsideBoundaryErrorMessage(message) {
            popErrorAlertService.showPopErrorAlert(message);
            $scope.businessLocation = undefined;
        }

    });