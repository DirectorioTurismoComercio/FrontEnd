(function(){
	angular.module('gemStore')
	.controller('AuthController', ['$scope','Constantes','AuthFactory','autenticacionService','$location','$mdDialog','UserByToken','questionnaireService','navBar',
		function($scope,Constantes,AuthFactory,autenticacionService,$location,$mdDialog,UserByToken,questionnaireService,navBar){                        
       data ={};
       $scope.toggleRight = function(){                                
          navBar.open();
        }

        $scope.close= function(){
          navBar.close();
        }

        $scope.menu_bar = function (view){          
          questionnaireService.changeView(view);
        }

       $scope.login = function(){
          $authentication = new AuthFactory();
          $authentication.username= $scope.login.usuario;
          $authentication.email= $scope.login.usuario;
          $authentication.password= $scope.login.contrasena;
          //autenticación          
          $authentication.$save().then(function(datos){
            autenticacionService.setInfo(datos.key);                        
            data = {};
            UserByToken.us(autenticacionService.getInfo()).query().$promise.then(function(usuario){                                                           
              data = usuario;
              autenticacionService.setUser(usuario);                        
              console.log('Id: ',data.id);                                     
            }).catch(function(error){
              console.log(error);            
            });         
            $location.path('/profileMain');
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
