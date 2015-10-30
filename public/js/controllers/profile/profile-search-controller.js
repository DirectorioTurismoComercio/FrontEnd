(function(){
	angular.module('gemStore')
	.controller('ProfileSearchController', ['$scope','Constantes','$location','autenticacionService','GuardarBusquedaFactory',
		function($scope,Constantes,$location,autenticacionService,GuardarBusquedaFactory){                              	
      
      

      GuardarBusquedaFactory.query({'pk': autenticacionService.getUser().id}).$promise.then(function(datos){                    
        console.log(datos);                   
      }).catch(function(error){
        // console.log(error);                    
      });


      $scope.profile = function(){
        $location.path('/profileUpdate');
      } 

      $scope.new_b = function(){
        $location.path('/actionquestionnaire');
      } 
		}
	]);
})();