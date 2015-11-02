(function(){
	angular.module('gemStore')
	.controller('ProfileSearchController', ['$scope','Constantes','$location','autenticacionService','GuardarBusquedaFactory',
		function($scope,Constantes,$location,autenticacionService,GuardarBusquedaFactory){                              	
      $scope.data = [];
      console.log(autenticacionService.getUser().id);
      GuardarBusquedaFactory.query({'pk': autenticacionService.getUser().id}).$promise.then(function(datos){                            
        $scope.data = datos;                  
        console.log($scope.data); 
      }).catch(function(error){
        // console.log(error);                    
      });

      $scope.detalle = function(_id,_index){        
        autenticacionService.setIdBusqueda(_id);
        $location.path('/profileSearchDetail'); 
      }

      $scope.profile = function(){
        $location.path('/profileUpdate');
      } 

      $scope.new_b = function(){
        $location.path('/actionquestionnaire');
      } 
		}
	]);
})();