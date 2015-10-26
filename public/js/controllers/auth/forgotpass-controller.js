(function(){
	angular.module('gemStore')
	.controller('ForgotPassController', ['$scope','Constantes','autenticacionService','ForgotPassFactory','$routeParams','$location','$mdDialog',
		function($scope,Constantes,autenticacionService,ForgotPassFactory,$routeParams,$location,$mdDialog){                        
			console.log($routeParams)
			$scope.forgotpass = function(){								
				ForgotPassFactory.save({"new_password1": $scope.change.pass1, "new_password2": $scope.change.pass2, "uid": $routeParams.uid, "token": $routeParams.token}).$promise.then(function(datos){            
		            console.log(datos);
		            $mdDialog.show(
	                  $mdDialog.alert()
	                  .parent(angular.element(document.querySelector('#alertPop')))
	                  .clickOutsideToClose(true)
	                  .title('Contraseña Reestablecida')
	                  .content('Se ha procesado su solicitud correctamente.')
	                  .ariaLabel('Alert Dialog Demo')
	                  .ok('Aceptar')
	                  .targetEvent('$event')
	                );                        
		            $location.path('/auth/');          
		          }).catch(function(error){
		            console.log(error);            
		            $mdDialog.show(
		              $mdDialog.alert()
		              .parent(angular.element(document.querySelector('#alertPops')))
		              .clickOutsideToClose(true)
		              .title('')
		              .content('Por favor, verifique la información suministrada.')
		              .ariaLabel('Alert Dialog Demo')
		              .ok('Aceptar')
		              .targetEvent('$event')
		            );                        
		          });	      
			}      
	      
		}
	]);

})();
