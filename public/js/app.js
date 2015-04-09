(function() {
    //'gemStore' module depends on 'store-products' modules
  angular.module('gemStore',['ngRoute','ngResource','userModule'])
  .constant("Constantes",{"url":"http://www.epsilondx.com/django/index.fcgi"})
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  })
  .directive("pageNavigation", function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/navbar.html',
      controller : function($scope){
        $scope.MobileMenu = true;
        $scope.toggleMobileMenu = function() {
          $scope.MobileMenu = $scope.MobileMenu === false ? true: false;
        };
      }
    };
  })
  .directive("pageFooter", function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/footer.html'
    };
  });
})();