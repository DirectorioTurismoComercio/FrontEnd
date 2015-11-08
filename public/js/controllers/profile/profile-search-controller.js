(function(){
	angular.module('gemStore')
	.controller('ProfileSearchController', ['$scope','Constantes','$location','autenticacionService','GuardarBusquedaFactory','questionnaireService','navBar',
		function($scope,Constantes,$location,autenticacionService,GuardarBusquedaFactory,questionnaireService,navBar){                              	
      $scope.load = true;
      $scope.data = [];
      console.log(autenticacionService.getUser().id);
      GuardarBusquedaFactory.query({'pk': autenticacionService.getUser().id}).$promise.then(function(datos){                            
        $scope.data = datos;                  
        console.log("Busq:",$scope.data); 
        $scope.load = false;
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

      $scope.toggleRight = function(){                                
        navBar.open();
      }

      $scope.close= function(){
        navBar.close();
      }

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }
      
      $scope.logout = function(){
        // Falta llamar ruta de logout
        $location.path('/signin');
      } 
		}
	]);
})();