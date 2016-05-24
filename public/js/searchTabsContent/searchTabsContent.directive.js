angular.module('searchTabs')
    .directive('searchTabsContent',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/searchTabsContent/search-tabs-content.html',
            controller:'searchTabsContentController'
        }
    }]);
