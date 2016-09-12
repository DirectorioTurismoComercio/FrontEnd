(function() {
    angular.module("gemStore")
   .directive('loader', loader);
    loader.$inject = ['$rootScope'];

    function loader($rootScope) {
        
       return {
       restrict: 'E',
       templateUrl: 'js/loader/loader.html',
       replace: true,
       link: function($scope, element, attrs) {
           $scope.$on("loader_show", function () {
            
              if (element.hasClass("hidden_loader")) {
                   element.removeClass("hidden_loader")
                   
               }
            });
            return $scope.$on("loader_hide", function () {
                if(!element.hasClass("hidden_loader")){
                    element.addClass("hidden_loader")
                } 
            });
        }
     }
    }
})();