(function() {
    angular.module("gemStore")
    .directive('myHeader', function() {
        return {
            restrict: 'E',
            //templateUrl: 'templates/ecosistema-header.html'
        };
    })
    .directive('myBreadcrumbs', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/breadCrumbs.html'
        };
    })
    .directive('sideBarMap', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/side-bar-map.html',
            controller: function ($scope, $timeout, $mdSidenav, $log) {

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $mdSidenav('left').close();
    $scope.close = function(){
        $mdSidenav('left').close();
    }

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  }
  
        };
    })
    .directive("pageNavigation", function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/navbar.html',
            controller: function ($scope) {
                $scope.MobileMenu = true;
                $scope.toggleMobileMenu = function () {
                    $scope.MobileMenu = $scope.MobileMenu === false ? true : false;
                };
            }
        };
    })
    .directive('sideBar', ['navBar', '$location', 'authenticationService', 'isUserLoggedIn','$auth', function (navBar, $location, authenticationService, isUserLoggedIn, $auth) {
        return {
            restrict: "E",
            templateUrl: 'templates/directives/side-bar.html',
            link: function (scope, element, attr) {

                scope.isAuthenticated = function() {
                    return isUserLoggedIn();
                };

                scope.logout=function(){
                    authenticationService.logout()
                        .finally(function(){
                            $location.path('/signin');
                        });
                    $auth.removeToken();
                }

                scope.toggleRight = function(){
                    navBar.open();
                }

                scope.close= function(){
                    navBar.close();
                }

                scope.isOnProfileMainMenuPage=function(){
                    return $location.path().match(/profileMain/) != null;
                }

                scope.redirectToProfileMain = function(){
                    $location.path('/profileMain');
                }
            }
        };
    }]);
})();