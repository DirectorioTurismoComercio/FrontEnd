angular.module('searchAndRouteTabs', [])
    .controller('searchAndRouteTabsController', function ($scope) {
        $scope.isSearchFormVisible = false;
        $scope.isRouteFormVisible =false;

        $scope.showSearchForm = function () {
            $scope.isRouteFormVisible=false;
            $scope.isSearchFormVisible = !$scope.isSearchFormVisible;
        }

        $scope.showRouteForm = function(){
            $scope.isSearchFormVisible=false;
            $scope.isRouteFormVisible=!$scope.isRouteFormVisible;
        }
    });
