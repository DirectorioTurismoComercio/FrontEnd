angular.module('searchTabs', ['google.places', 'geolocation'])
    .controller('searchTabsController', function ($scope, geolocation, messageService,
                                                  siteAndTownSaverService, CUNDINAMARCA_COORDS,
                                                  MapService) {
        var initializedFields = false;
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible = false;
        var routeRequest = {
            origin: undefined,
            destination: undefined
        };

        showSearchFormIfUserHasMadeASearch();

        $scope.showSearchForm = function () {
            $scope.isRouteFormVisible = false;
            $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
        }

        $scope.showRouteForm = function () {
            $scope.isSearchFormVisible = false;
            $scope.isRouteFormVisible = !$scope.isRouteFormVisible;
            initRouteSearchAutocomplete();
        }

        $scope.calculateRoute = function () {
            if (routeRequest.origin == undefined) {
                messageService.showErrorMessage("ERROR_YOU_SHOULD_FILL_YOUR_ROUTE_ORIGIN");
            } else if (routeRequest.destination == undefined) {
                messageService.showErrorMessage("ERROR_YOU_SHOULD_FILL_YOUR_ROUTE_DESTINATION");
            } else {
                $scope.showRoute(routeRequest);
            }
        };

        function initRouteSearchAutocomplete() {
            if (!initializedFields) {
                var originRouteInput = document.getElementById('route-origin');
                var destinationRouteInput = document.getElementById('route-destination');

                MapService.addAutocompleteFeature(originRouteInput, routeOriginChanged);
                MapService.addAutocompleteFeature(destinationRouteInput, routeDestinationChanged);

                initializedFields = true;
            }
        }

        function routeOriginChanged(autocomplete, inputBox) {
            routeRequest.origin = getSelectedPlace(autocomplete, inputBox);
        }

        function routeDestinationChanged(autocomplete, inputBox) {
            routeRequest.destination = getSelectedPlace(autocomplete, inputBox);
        }

        function getSelectedPlace(autocomplete, inputBox) {
            var placeLocation = MapService.placeToLatLngLiteral(autocomplete.getPlace());
            var isPlaceInsideCundinamarca = MapService.isPlaceInsideCundinamarca(placeLocation);

            if (!isPlaceInsideCundinamarca) {
                messageService.showErrorMessage("ERROR_PLACE_OUTSIDE_CUNDINAMARCA");
                inputBox.value = '';
                placeLocation = undefined;
            }

            return placeLocation;
        }

        function showSearchFormIfUserHasMadeASearch() {
            if (siteAndTownSaverService.getCurrentSearchedSite() != null) {
                $scope.isSearchFormVisible = true;
            }

            if (siteAndTownSaverService.getSearchedQuery() != undefined) {
                $scope.isSearchFormVisible = true;
                siteAndTownSaverService.resetSearch();
            }

            if (siteAndTownSaverService.getSearchedRoute() != undefined) {
                $scope.isRouteFormVisible = true;
                siteAndTownSaverService.resetSearch();
            }
        }

        $scope.loadingCurrentPosition = false;

        if (siteAndTownSaverService.getOrigin() != undefined) {
            setSearchedRoutePlaceHolders();
        }

        $scope.getUserPosition = function () {
            $scope.loadingCurrentPosition = true;
            geolocation.getLocation().then(function (data) {
                var coords = MapService.coordsToLatLngLiteral(data.coords.latitude, data.coords.longitude);
                $scope.routeToController.routeFrom = "Mi posición actual";
                siteAndTownSaverService.setOrigin(coords);
                $scope.loadingCurrentPosition = false;
            }).catch(function (error) {
                $scope.loadingCurrentPosition = false;
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
            });
        };

        function setSearchedRoutePlaceHolders() {
            (typeof siteAndTownSaverService.getOrigin().lat === "function") ?
                $scope.routeToController.routeFrom = siteAndTownSaverService.getCurrentOriginPlaceName() : $scope.routeToController.routeFrom = "Mi posición actual";
            $scope.routeToController.routeTo = siteAndTownSaverService.getCurrentDestinationPlaceName();
        }

        $scope.clear = function () {
            event.target.value = '';
            switch (event.target.id) {
                case 'route-origin':
                    routeRequest.origin = undefined;
                    break;
                case 'route-destination':
                    routeRequest.destination = undefined;
                    break;
            }
        }
    })
;