(function() {
    //'gemStore' module depends on 'store-products' modules
  angular.module('gemStore',['ngRoute','ngResource','userModule','ngAnimate','ngMaterial','ngAria','angularUtils.directives.dirPagination'])
 .constant("Constantes",{"url":"http://www.epsilondx.com/django/index.fcgi","ruta_imagenes":"./images/"})
 // .constant("Constantes",{"url":"http://10.203.167.97:8282","ruta_imagenes":"./images/"})
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');    
  })
  //Autenticación
  .config(['$httpProvider', function($httpProvider){    
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }])
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