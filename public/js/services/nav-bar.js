(function(){
	angular.module('gemStore')
	.service('navBar',['$timeout', '$mdSidenav', '$mdUtil', '$log',
	function($timeout, $mdSidenav, $mdUtil, $log) {

		
		this.close = function () {
    	  $mdSidenav('right').close()
          .then(function () {
          $log.debug("open RIGHT is done");
        });
        };
        this.open = function () {
    	  $mdSidenav('right').open()
          .then(function () {
          $log.debug("open RIGHT is done");
        });
        };
        
    
	}]);
})();	