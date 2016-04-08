angular.module('searchAndRouteTabs')
    .directive('searchAndRouteTabsSection',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/searchAndRouteTabs/search-Route-Tabs.html',
            controller: 'searchAndRouteTabsController'
        }
    }]);