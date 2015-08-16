(function() {
  angular.module("gemStore")
  .directive('myHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/header.html'
    };
  })
  .directive('myBreadcrumbs', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/breadCrumbs.html'
    };
  })
  .directive('myPasos', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pasos.html'
    };
  });
})();