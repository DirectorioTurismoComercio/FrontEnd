(function(){
	angular.module('gemStore')
	.controller('RecoveryController', ['$scope','Constantes','autenticacionService','ResetPassFactory','$location','$mdDialog',
		function($scope,Constantes,autenticacionService,ResetPassFactory,$location,$mdDialog){                        
       data ={};
       $scope.recuperar = function(){        
        ResetPassFactory.save({"email": $scope.recovery.email}).$promise.then(function(datos){            
                console.log(datos);                                                   
                $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#alertPop')))
                  .clickOutsideToClose(true)
                  .title('')
                  .content('Se ha enviado la información a su correo electrónico')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Aceptar')
                  .targetEvent('$event')
                );                        
                $location.path('/auth/');          
              }).catch(function(error){
                console.log(error);            
              });                    
       }      
		}
	]);

})();
