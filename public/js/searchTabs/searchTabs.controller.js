angular.module('searchTabs', ['google.places', 'geolocation'])
    .controller('searchTabsController', function ($scope, siteAndTownSaverService) {
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible = false;
        showSearchFormIfUserHasMadeASearch();

        $scope.showSearchForm = function () {
            $scope.isRouteFormVisible = false;
            $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
        }

        $scope.showRouteForm = function () {
            $scope.isSearchFormVisible = false;
            $scope.isRouteFormVisible = !$scope.isRouteFormVisible;
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
    });
