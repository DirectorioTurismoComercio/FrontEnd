(function(){
	angular.module('gemStore')
	.controller('ConexionesListController', ['$scope','Constantes','$location','questionnaireService','navBar','$mdToast','LogoutFactory','autenticacionService','ConexionListFactory','conexionService',
		function($scope,Constantes,$location,questionnaireService,navBar,$mdToast,LogoutFactory,autenticacionService,ConexionListFactory,conexionService){                              	
      $scope.ruta = Constantes.ruta_imagenes + "botones/";
      $scope.anterior = $scope.ruta+'boton-regresar.png';
      $scope.load = true;
      $scope.usuario = autenticacionService.getUser();
      console.log($scope.usuario);
      ConexionListFactory.query({'id_user': $scope.usuario.id}).$promise.then(function(datos){                            
        $scope.data = datos;                  
        console.log("COnversa:",$scope.data); 
        $scope.load = false;
      }).catch(function(error){
        console.log(error);                    
      });
      
      $scope.toggleRight = function(){                                
        navBar.open();
      }

      $scope.close= function(){
        navBar.close();
      }

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }      

      $scope.conversacion = function(index){
        console.log(index);        
        conexionService.setBusqueda($scope.data[index].busqueda.id);
        conexionService.setSolucion($scope.data[index].respuesta.id);                
        $location.path('/conexionMain');
      }
      

      $scope.logout = function(){
        // Falta llamar ruta de logout
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