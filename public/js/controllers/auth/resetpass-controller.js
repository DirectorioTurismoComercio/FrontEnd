(function(){
	angular.module('gemStore')
	.controller('ResetPassController', ['$scope','Constantes','autenticacionService','ForgotPassFactory','$routeParams',
		function($scope,Constantes,autenticacionService,ForgotPassFactory,$routeParams){                        
			console.log($routeParams)
			$scope.forgotpass = function(){								
				ForgotPassFactory.save({"new_password1": $scope.change.pass1, "new_password2": $scope.change.pass2, "uid": $routeParams.uid, "token": $routeParams.token}).$promise.then(function(datos){            
		            console.log(datos);                                    		            
		          }).catch(function(error){
		            console.log(error);            
		          });	      
			}      
	      
		}
	]);

})();
