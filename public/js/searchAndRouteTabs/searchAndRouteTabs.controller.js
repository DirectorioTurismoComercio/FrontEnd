angular.module('searchAndRouteTabs', [])
    .controller('searchAndRouteTabsController', function ($scope, siteAndTownSaverService) {
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible =false;
        showSearchFormIfUserHasMadeASearch();

        $scope.showSearchForm = function () {
            $scope.isRouteFormVisible=false;
            $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
        }

        $scope.showRouteForm = function(){
            $scope.isSearchFormVisible=false;
            $scope.isRouteFormVisible=!$scope.isRouteFormVisible;
        }

        function showSearchFormIfUserHasMadeASearch(){
            if(siteAndTownSaverService.getCurrentSearchedSite()!=null){
                $scope.isSearchFormVisible=true;
            }
        }
    });
