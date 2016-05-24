angular.module('searchTabs')
    .directive('searchTabs',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/searchAndRouteTabs/searchTabContentHome/search-Tab-Content-Home.html',
            controller:'searchTabContentHomeController'
        }
    }]);
