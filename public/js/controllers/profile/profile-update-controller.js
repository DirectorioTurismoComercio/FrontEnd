(function(){
	angular.module('gemStore')
	.controller('ProfileUpdateController', ['$scope','Constantes','autenticacionService','$location',
		function($scope,Constantes,autenticacionService,$location){                        
        $scope.usuario = 	autenticacionService.getUser();
        console.log($scope.usuario);

        $scope.changepass = function(){
          $location.path('/auth/changepass');
        }
		}
	]);

})();
