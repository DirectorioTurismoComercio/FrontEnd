angular.module('searchTabs', ['google.places', 'geolocation'])
    .controller('searchTabsController', function ($scope, geolocation, messageService, $timeout,
                                                  siteAndTownSaverService, CUNDINAMARCA_COORDS,
                                                  MapService, $translate, KEYWORD_SEARCH_SECTION, $rootScope,
                                                  ROUTE_SEARCH_SECTION, $window, categories, navigationService) {
        $scope.KEYWORD_SEARCH_SECTION = KEYWORD_SEARCH_SECTION;
        $scope.ROUTE_SEARCH_SECTION = ROUTE_SEARCH_SECTION;
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible = false;
        $scope.searchedRoute = siteAndTownSaverService.searchedRoute;
        $scope.categoryScrollPorcentaje=0;
        $scope.subcategoryScrollPorcentaje=0;
        $scope.selectedLanguage = $translate.use();

        var initializedFields = false;
        var originRouteInput;
        var destinationRouteInput;
        var originRouteInputMap;
        var destinationRouteInputMap;
        var originRouteInputMapMobile;
        var destinationRouteInputMapMobile;

        getViewPortSize();


        $scope.configCategoriesDesktop={
            autoHideScrollbar: false,
            theme: 'dark-thick',
            advanced:{
                updateOnContentResize: true
            },
            scrollButtons: {
                scrollAmount: 'auto',
                enable: false
            },
            axis: 'x',
            setHeight: 110,
            callbacks:{
                whileScrolling: function() {
                    $scope.categoryScrollPorcentaje=this.mcs.leftPct;
                    $scope.$apply();
                }
            }
        };

        $scope.configSubategoriesDesktop={
            autoHideScrollbar: false,
            scrollbarPosition:"inside",
            theme: 'dark-thick',
            advanced:{
                updateOnContentResize: true
            },
            scrollButtons: {
                scrollAmount: 'auto',
                enable: false
            },
            axis: 'x',
            setHeight: 85,
            callbacks:{
                whileScrolling: function() {
                    $scope.subcategoryScrollPorcentaje=this.mcs.leftPct;
                    $scope.$apply();
                }
            }
        };

       
        $timeout(function () {
            $scope.showSelectedSection(siteAndTownSaverService.openSection);
        }, 0);
        categories.getCategories().then(function (response) {
            $scope.categories = response;
            setAllAsUnselected($scope.categories);
            if($scope.isonmap){
                try {
                    setHomeCategorySelected();
                }catch(e){}
            }

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
            siteAndTownSaverService.setQueryMadeByUser("SEARCH_BY_KEY_WORD");
            calldoSearch(args.keyword);
        });

        $scope.$watch('result', function() {
            try{
                setIsSelectedCategory();
            }catch(e){}
        });

        $scope.setCategoryNameAsInputText=function(category){
            $scope.previousSlide('subCategory');
                if(category.isSelected){
                    category.isSelected=false;
                    $scope.result='';
                    $scope.isSubcategoriesVisible=false;
                    setAllAsUnselected($scope.categories);
                }else{
                    $scope.result=category.nombre;
                    setSubcategories(category.id);
                }

        };
        
        $scope.selectSubcategory=function(subcategory){
            if(!subcategory.isSelected){
                setAllAsUnselected($scope.subcategories);
                subcategory.isSelected=true;
                $scope.subcategoryname=subcategory.nombre;
                $scope.subcategorySearch($scope.subcategoryname);
            }
        };

        $scope.doSearchByKeyWord = function (result) {
            calldoSearch(result);
            siteAndTownSaverService.setQueryMadeByUser("SEARCH_BY_KEY_WORD");
        };

        $scope.calculateRoute = function () {
            navigationService.setMunicipalityDetailNavigation(undefined);
            if ($scope.searchedRoute.origin == undefined) {
                messageService.showErrorMessage("ERROR_YOU_SHOULD_FILL_YOUR_ROUTE_ORIGIN");
            } else if ($scope.searchedRoute.destination == undefined) {
                messageService.showErrorMessage("ERROR_YOU_SHOULD_FILL_YOUR_ROUTE_DESTINATION");
            } else {
                if ($scope.isMobile) {
                    $scope.isRouteFormVisible = !$scope.isRouteFormVisible;
                }
                $scope.showRoute();
                siteAndTownSaverService.setQueryMadeByUser("PLAN_A_ROUTE");
            }
        };
        
        $scope.clearSubcategories=function(){
            setAllAsUnselected($scope.subcategories);
        };

        $scope.nextSlide=function(object){
            if(object=="category"){
                $scope.updateCategoryScrollbar('scrollTo', "last");
            }

            if(object=="subCategory"){
                $scope.updateSubcategoryScrollbar('scrollTo', "last");
            }
        };

        $scope.previousSlide=function(object){
            if(object=="category"){
                $scope.updateCategoryScrollbar('scrollTo', "first");
            }
            if(object=="subCategory"){
                $scope.updateSubcategoryScrollbar('scrollTo', "first");

            }
        };

        function setHomeCategorySelected(){
            for(var i=0; i<$scope.categories.length;i++){
                if($scope.categories[i].id==siteAndTownSaverService.getSelectedCategory().id){
                    $scope.categories[i].isSelected=true;
                    getSubcategories( $scope.categories[i].id);
                }
            }
        }

        function setSubcategories(categoryId){
            if($scope.isonmap){
                getSubcategories(categoryId);
            }
        }

        function getSubcategories(categoryId) {
            categories.getSubcategories(categoryId).then(function (response) {
                $scope.subcategories=response;
                setAllAsUnselected($scope.subcategories);
                $scope.isSubcategoriesVisible=true;
            }).catch(function (error) {
                console.log("hubo un error", error);
            });
        }


        function setAllAsUnselected(object){
            $scope.subcategoryname=undefined;
            try {
                for (var i = 0; i < object.length; i++) {
                    object[i].isSelected = false;
                }
            }catch(e){}

        }


        function setIsSelectedCategory(){
            for(var i = 0; i < $scope.categories.length; i++){
                if($scope.result==$scope.categories[i].nombre){
                    $scope.categories[i].isSelected = true;
                    siteAndTownSaverService.setSelectedCategory($scope.categories[i]);
                    setSubcategories($scope.categories[i].id);
                }else{
                    $scope.categories[i].isSelected = false;
                    $scope.isSubcategoriesVisible=false;
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
            geolocation.getLocation().then(function (data) {
                var userPosition = MapService.coordsToLatLngLiteral(data.coords.latitude, data.coords.longitude);
                setSearchedRouteOrigin({
                    name: $translate.instant("MY_POSITION"),
                    location: userPosition
                });

                MapService.setPinOnUserPosition(userPosition);

            }).catch(function (error) {
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
                console.log(error);
            });
        };

        $rootScope.$on('$translateChangeSuccess', function () {
            $scope.selectedLanguage = $translate.use();

        }
        );

        $scope.getCategoryText = function(category){
            if($scope.selectedLanguage=='en'){
                return category.name;
            }
            if($scope.selectedLanguage=='es'){
                return category.nombre;
            }

        }

        $scope.display_limit = 5;
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