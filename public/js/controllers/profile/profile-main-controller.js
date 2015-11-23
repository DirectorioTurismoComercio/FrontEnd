(function(){
	angular.module('gemStore')
	.controller('ProfileMainController', ['$scope','Constantes','$location','questionnaireService','navBar','$mdToast','LogoutFactory','autenticacionService','solutionService',
		function($scope,Constantes,$location,questionnaireService,navBar,$mdToast,LogoutFactory,autenticacionService,solutionService){                              	
      $scope.usuario = autenticacionService.getUser();
      console.log($scope.usuario);
      $scope.ruta = Constantes.ruta_imagenes + "botones/";
      $scope.perfil= $scope.ruta + "boton_registrate.png";    
      $scope.conectar= $scope.ruta + "boton-conectarse.png";    
      $scope.buscar= $scope.ruta + "boton_agregar_busqueda.png";    
      $scope.inicio= $scope.ruta + "boton-comenzar.png";          
      solutionService.setLogged('NOT');
      $scope.toggleRight = function(){                                
        navBar.open();
      }

      $scope.close= function(){
        navBar.close();
      }

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }
      
      $scope.profile = function(){
        $location.path('/profileUpdate');
      } 

      $scope.conexiones = function(){
        $location.path('/profileConections');
      } 

      $scope.busquedas = function(){
        $location.path('/profileSearch');
      } 

      $scope.new_b = function(){
        $location.path('/actionquestionnaire');
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