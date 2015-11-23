(function(){
	angular.module('gemStore')
	.controller('ProfileSearchController', ['$scope','Constantes','$location','autenticacionService','GuardarBusquedaFactory','questionnaireService','navBar','LogoutFactory','solutionService',
		function($scope,Constantes,$location,autenticacionService,GuardarBusquedaFactory,questionnaireService,navBar,LogoutFactory,solutionService){                              	
      $scope.ruta = Constantes.ruta_imagenes + "botones/";
      $scope.anterior = $scope.ruta+'boton-regresar.png';
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
      solutionService.setLogged('NOT');
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
            LogoutFactory.logear(autenticacionService.getInfo()).save().$promise.then(function(respuesta){                                                                                       
                  console.log(respuesta);   
              autenticacionService.setInfo('');                                  
              $location.path('/signin');
            }).catch(function(error){
              console.log(error);            
            });         
        } 
		}
	]);
})();