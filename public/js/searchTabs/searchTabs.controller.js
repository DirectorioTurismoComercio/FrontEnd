angular.module('searchTabs', ['google.places', 'geolocation'])
    .controller('searchTabsController', function ($scope, geolocation, messageService, $timeout,
                                                  siteAndTownSaverService, CUNDINAMARCA_COORDS,
                                                  MapService, $translate, KEYWORD_SEARCH_SECTION,
                                                  ROUTE_SEARCH_SECTION, $window, categories) {
        $scope.KEYWORD_SEARCH_SECTION = KEYWORD_SEARCH_SECTION;
        $scope.ROUTE_SEARCH_SECTION = ROUTE_SEARCH_SECTION;
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible = false;
        $scope.loadingCurrentPosition = false;
        $scope.searchedRoute = siteAndTownSaverService.searchedRoute;
        var initializedFields = false;
        var originRouteInput;
        var destinationRouteInput;
        var originRouteInputMap;
        var destinationRouteInputMap;
        var originRouteInputMapMobile;
        var destinationRouteInputMapMobile;

        getViewPortSize();


       
        $timeout(function () {
            $scope.showSelectedSection(siteAndTownSaverService.openSection);
        }, 0);

        categories.getCategories().then(function (response) {
            $scope.categories = response;
            setAllCategoriesAsUnselected();

        }).catch(function (error) {
            console.log("Hubo un error", error);
        });

        $scope.showSelectedSection = function (section) {
            switch (section) {
                case KEYWORD_SEARCH_SECTION:
                    $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
                    $scope.isRouteFormVisible = false;
                    if (!$scope.isMobile) {
                        siteAndTownSaverService.openSection = $scope.isSearchFormVisible ? KEYWORD_SEARCH_SECTION : undefined;
                    }
                    break;
                case ROUTE_SEARCH_SECTION:
                    $scope.isSearchFormVisible = false;
                    $scope.isRouteFormVisible = !$scope.isRouteFormVisible;
                    if (!$scope.isMobile) {
                        siteAndTownSaverService.openSection = $scope.isRouteFormVisible ? ROUTE_SEARCH_SECTION : undefined;
                    }
                    initRouteSearchAutocomplete();
                    break;
            }
        };

        $scope.$on('businessbrowser::keypressed', function (event, args) {
            calldoSearch(args.keyword);
        });

        $scope.setCategoryNameAsInputText=function(category){
            $scope.result=category.nombre;
            setAllCategoriesAsUnselected();
            setSelectedCategory(category);

        }

        $scope.doSearchByKeyWord = function (result) {
            calldoSearch(result);
        };


        $scope.calculateRoute = function () {
            if ($scope.searchedRoute.origin == undefined) {
                messageService.showErrorMessage("ERROR_YOU_SHOULD_FILL_YOUR_ROUTE_ORIGIN");
            } else if ($scope.searchedRoute.destination == undefined) {
                messageService.showErrorMessage("ERROR_YOU_SHOULD_FILL_YOUR_ROUTE_DESTINATION");
            } else {
                if ($scope.isMobile) {
                    $scope.isRouteFormVisible = !$scope.isRouteFormVisible;
                }
                $scope.showRoute();
            }
        };

        function setAllCategoriesAsUnselected(){
            for (var i = 0; i < $scope.categories.length; i++) {
                $scope.categories[i].isSelected = false;
            }
        }

        function setSelectedCategory(category){
            for (var i = 0; i < $scope.categories.length; i++) {
                if($scope.categories[i].nombre==category.nombre){
                    $scope.categories[i].isSelected = true;
                }
            }
        }

        function getViewPortSize() {
            $scope.isMobile = $window.innerWidth < 992;
        }

        function calldoSearch(result) {
            if ($scope.isMobile) {
                $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
            }
            $scope.doSearch(result);
        }


        function initRouteSearchAutocomplete() {
            if (!initializedFields) {
                originRouteInput = document.getElementById('route-origin');
                destinationRouteInput = document.getElementById('route-destination');

                MapService.addAutocompleteFeature(originRouteInput, routeOriginChanged);
                MapService.addAutocompleteFeature(destinationRouteInput, routeDestinationChanged);

                originRouteInputMap = document.getElementById('route-origin-map');
                destinationRouteInputMap = document.getElementById('route-destination-map');

                MapService.addAutocompleteFeature(originRouteInputMap, routeOriginChanged);
                MapService.addAutocompleteFeature(destinationRouteInputMap, routeDestinationChanged);

                originRouteInputMapMobile = document.getElementById('route-origin-map-mobile');
                destinationRouteInputMapMobile = document.getElementById('route-destination-map-mobile');

                MapService.addAutocompleteFeature(originRouteInputMapMobile, routeOriginChanged);
                MapService.addAutocompleteFeature(destinationRouteInputMapMobile, routeDestinationChanged);

                initializedFields = true;
            }
        }

        function routeOriginChanged(autocomplete, inputBox) {
            var place = getSelectedPlace(autocomplete, inputBox);

            try {
                setSearchedRouteOrigin(place);
            } catch (err) {
                setSearchedRouteOrigin(undefined);
            }
        }


        function routeDestinationChanged(autocomplete, inputBox) {
            var place = getSelectedPlace(autocomplete, inputBox);

            try {
                setSearchedRouteDestination(place);
            } catch (err) {
                setSearchedRouteDestination(undefined);
            }
        }


        function getSelectedPlace(autocomplete, inputBox) {
            var isPlaceInsideCundinamarca;
            var place = {
                location: MapService.placeToLatLngLiteral(autocomplete.getPlace()),
                name: autocomplete.getPlace().formatted_address
            };

            isPlaceInsideCundinamarca = MapService.isPlaceInsideCundinamarca(place.location);

            if (!isPlaceInsideCundinamarca) {
                messageService.showErrorMessage("ERROR_PLACE_OUTSIDE_CUNDINAMARCA");
                inputBox.value = '';
                place = undefined;
            }

            return place;
        }

        function setSearchedRouteDestination(place) {
            $scope.searchedRoute.destination = place;
            siteAndTownSaverService.searchedRoute.destination = place;
        }

        function setSearchedRouteOrigin(place) {
            $scope.searchedRoute.origin = place;
            siteAndTownSaverService.searchedRoute.origin = place;
        }

        $scope.getUserPosition = function () {
            $scope.loadingCurrentPosition = true;
            geolocation.getLocation().then(function (data) {
                var userPosition = MapService.coordsToLatLngLiteral(data.coords.latitude, data.coords.longitude);
                setSearchedRouteOrigin({
                    name: $translate.instant("MY_POSITION"),
                    location: userPosition
                });

                MapService.setPinOnUserPosition(userPosition);

                $scope.loadingCurrentPosition = false;
            }).catch(function (error) {
                $scope.loadingCurrentPosition = false;
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
                console.log(error);
            });
        };


        $scope.clear = function () {
            event.target.value = '';
            switch (event.target.id) {
                case 'route-origin':
                    setSearchedRouteOrigin(undefined);
                    break;
                case 'route-destination':
                    setSearchedRouteDestination(undefined);
                    break;
            }
        }
    })
;