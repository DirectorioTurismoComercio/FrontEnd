(function(){
	angular.module('gemStore')
	.controller('ChangePassController', ['$scope','Constantes','autenticacionService','changePassFactory',
		function($scope,Constantes,autenticacionService,changePassFactory){                        
			$scope.changepass = function(){
				console.log(autenticacionService.getInfo());	      		
				
				changePassFactory.change_pass(autenticacionService.getInfo()).save({"new_password1": $scope.change.pass1, "new_password2": $scope.change.pass2}).$promise.then(function(datos){            
		            console.log(datos);                                    
		            console.log(autenticacionService.getInfo());                       
		          }).catch(function(error){
		            console.log(error);            
		          });	      
			}      
	      
		}
	]);

})();
