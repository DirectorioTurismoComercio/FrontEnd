angular.module('searchAndRouteTabs')
    .controller('searchTabContentHomeController', function ($scope, geolocation, popErrorAlertService,
                                                            siteAndTownSaverService, CUNDINAMARCA_COORDS) {
        $scope.autocompleteOptions = {
            componentRestrictions: {country: 'co'},
        }

        if (siteAndTownSaverService.getOrigin() != undefined) {
            setSearchedRoutePlaceHolders();
        }

        $scope.searchIsInCundinamarca = function (latitude, longitude, model) {
            var coords = new google.maps.LatLng(latitude, longitude);
            var cundinamarcaPolygon = new google.maps.Polygon({paths: CUNDINAMARCA_COORDS});

            if (!google.maps.geometry.poly.containsLocation(coords, cundinamarcaPolygon)) {
                popErrorAlertService.showPopErrorAlert("El lugar seleccionado no esta disponible por el momento");
                if (model == 'routeToController.routeFrom') {
                    $scope.routeToController.routeFrom = ''
                }
                if (model == 'routeToController.routeTo') {
                    $scope.routeToController.routeTo = ''
                }
            }
        }

        $scope.getUserPosition = function () {
            geolocation.getLocation().then(function (data) {
                var coords = {lat: data.coords.latitude, long: data.coords.longitude};
                var formattedCoords = coords.lat + ',' + coords.long;
                $scope.routeToController.routeFrom = "Mi posición actual";
                siteAndTownSaverService.setOrigin(formattedCoords);
            }).catch(function (error) {
                popErrorAlertService.showPopErrorAlert("No es posible obtener la ubicación");
            });
        }

        function setSearchedRoutePlaceHolders() {
            (siteAndTownSaverService.getOrigin().indexOf('4.') > -1 && siteAndTownSaverService.getOrigin().indexOf('-74.') > -1) ?
                $scope.routeToController.routeFrom = "Mi posición actual" : $scope.routeToController.routeFrom = siteAndTownSaverService.getOrigin();
            $scope.routeToController.routeTo = siteAndTownSaverService.getDestination();
        }
    });