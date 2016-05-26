angular.module('searchTabs', ['google.places', 'geolocation'])
    .controller('searchTabsController', function ($scope, geolocation, messageService, $timeout,
                                                  siteAndTownSaverService, CUNDINAMARCA_COORDS,
                                                  MapService, $translate, KEYWORD_SEARCH_SECTION,
                                                  ROUTE_SEARCH_SECTION) {
        $scope.KEYWORD_SEARCH_SECTION = KEYWORD_SEARCH_SECTION;
        $scope.ROUTE_SEARCH_SECTION = ROUTE_SEARCH_SECTION;
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible = false;
        $scope.loadingCurrentPosition = false;
        var initializedFields = false;
        var originRouteInput;
        var destinationRouteInput;
        var routeRequest = {
            origin: undefined,
            destination: undefined
        };

        $timeout(function () {
            $scope.showSelectedSection(siteAndTownSaverService.openSection);
        }, 0);

        $scope.showSelectedSection = function (section) {
            switch (section) {
                case KEYWORD_SEARCH_SECTION:
                    $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
                    $scope.isRouteFormVisible = false;
                    siteAndTownSaverService.openSection = $scope.isSearchFormVisible ? KEYWORD_SEARCH_SECTION : undefined;
                    break;
                case ROUTE_SEARCH_SECTION:
                    $scope.isSearchFormVisible = false;
                    $scope.isRouteFormVisible = !$scope.isRouteFormVisible;
                    siteAndTownSaverService.openSection = $scope.isRouteFormVisible ? ROUTE_SEARCH_SECTION : undefined;
                    initRouteSearchAutocomplete();
                    break;
            }
        };


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
                originRouteInput = document.getElementById('route-origin');
                destinationRouteInput = document.getElementById('route-destination');

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


        $scope.getUserPosition = function () {
            $scope.loadingCurrentPosition = true;
            geolocation.getLocation().then(function (data) {
                var myPosition = MapService.coordsToLatLngLiteral(data.coords.latitude, data.coords.longitude);
                originRouteInput.value = $translate.instant("MY_POSITION");
                routeRequest.origin = myPosition;
                siteAndTownSaverService.setOrigin(myPosition);

                $scope.loadingCurrentPosition = false;
            }).catch(function (error) {
                $scope.loadingCurrentPosition = false;
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
            });
        };


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