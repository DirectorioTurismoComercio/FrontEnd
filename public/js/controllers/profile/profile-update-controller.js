(function(){
	angular.module('gemStore')
	.controller('ProfileUpdateController', ['$scope','Constantes','autenticacionService','$location','UserByToken','navBar','LogoutFactory','questionnaireService',
		function($scope,Constantes,autenticacionService,$location,UserByToken,navBar,LogoutFactory,questionnaireService){                        
        $scope.ruta = Constantes.ruta_imagenes + "botones/";
        $scope.anterior = $scope.ruta+'boton-regresar.png';
        $scope.usuario = 	autenticacionService.getUser();
        $scope.token = autenticacionService.getInfo();        
        console.log($scope.usuario);
        console.log($scope.token);

        $scope.menu_bar = function (view){
            questionnaireService.changeView(view);                      
        }

        $scope.changepass = function(){
          $location.path('/auth/changepass');
        }

        $scope.update = function(){        	        	        	
        	UserByToken.up(autenticacionService.getInfo()).update(
            {"nombres": $scope.usuario.nombres,
             "apellido1": $scope.usuario.apellido1,
             "apellido2": $scope.usuario.apellido2,
             "rol": $scope.usuario.rol,
             "correo": $scope.usuario.correo,
             "telefono_institucion": $scope.usuario.telefono_institucion,
             "ubicacion_institucion": $scope.usuario.ubicacion_institucion
            }).$promise.then(function(response){                                                                         
              autenticacionService.setUser(response);                        
              console.log(response);
            }).catch(function(error){
              console.log(error);            
            });      
          
        }
		}
	]);

})();
