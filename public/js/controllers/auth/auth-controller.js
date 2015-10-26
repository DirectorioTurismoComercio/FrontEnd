(function(){
	angular.module('gemStore')
	.controller('AuthController', ['$scope','Constantes','AuthFactory','autenticacionService','$location','$mdDialog',
		function($scope,Constantes,AuthFactory,autenticacionService,$location,$mdDialog){                        
       data ={};
       $scope.login = function(){
          $authentication = new AuthFactory();
          $authentication.username= $scope.login.usuario;
          $authentication.email= $scope.login.usuario;
          $authentication.password= $scope.login.contrasena;
          //autenticación          
          $authentication.$save().then(function(datos){
            autenticacionService.setInfo(datos.key);            
            console.log(datos.key);
            $location.path('/signin');
          }).catch(function(error){
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#alertPop')))
              .clickOutsideToClose(true)
              .title('Error')
              .content('Los datos de acceso no son correctos, por favor verifique.')
              .ariaLabel('Alert Dialog Demo')
              .ok('Aceptar')
              .targetEvent('$event')
            );                        
          });
        } 
      $scope.forgot = function(){
          $location.path('/auth/recovery');
      }  	
		}
	]);

})();
