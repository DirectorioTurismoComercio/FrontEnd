angular.module('searchAndRouteTabs')
    .controller('searchTabContentHomeController', function ($scope, geolocation, popErrorAlertService,
                                                            siteAndTownSaverService, CUNDINAMARCA_COORDS, MapService) {
        var cundinamarcaPolygon = new google.maps.Polygon({paths: CUNDINAMARCA_COORDS});
        $scope.loadingCurrentPosition = false;
        $scope.autocompleteOptions = {
            componentRestrictions: {country: 'co'},
        };

        if (siteAndTownSaverService.getOrigin() != undefined) {
            setSearchedRoutePlaceHolders();
        }

        $scope.deleteText = function (model) {
            clearText(model);
        };

        $scope.searchIsInCundinamarca = function (latitude, longitude, model) {
            var coords = new google.maps.LatLng(latitude, longitude);
            cundinamarcaPolygon = new google.maps.Polygon({paths: CUNDINAMARCA_COORDS});

            if (!google.maps.geometry.poly.containsLocation(coords, cundinamarcaPolygon)) {
                popErrorAlertService.showPopErrorAlert("El lugar seleccionado no esta disponible por el momento");
                clearText(model);
            }
        };

        $scope.getUserPosition = function () {
            $scope.loadingCurrentPosition = true;
            geolocation.getLocation().then(function (data) {
                var coords = MapService.coordsToLatLng(data.coords.latitude, data.coords.longitude);
                $scope.routeToController.routeFrom = "Mi posición actual";
                siteAndTownSaverService.setOrigin(coords);
                $scope.loadingCurrentPosition = false;
            }).catch(function (error) {
                $scope.loadingCurrentPosition = false;
                popErrorAlertService.showPopErrorAlert("No es posible obtener la ubicación");
            });
        };

        function setSearchedRoutePlaceHolders() {
            (typeof siteAndTownSaverService.getOrigin().lat === "function") ?
                $scope.routeToController.routeFrom = siteAndTownSaverService.getCurrentOriginPlaceName() : $scope.routeToController.routeFrom = "Mi posición actual";
            $scope.routeToController.routeTo = siteAndTownSaverService.getCurrentDestinationPlaceName();
        }

        function clearText(model) {
            if (model == 'routeToController.routeFrom') {
                $scope.routeToController.routeFrom = ''
            }
            if (model == 'routeToController.routeTo') {
                $scope.routeToController.routeTo = ''
            }
        }
    });