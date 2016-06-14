angular.module('searchTabs')
    .directive('searchTabs',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/searchTabs/search-tabs.html',
            controller: 'searchTabsController',
            scope:{
                isonmap:'='
            }
        }
    }]);