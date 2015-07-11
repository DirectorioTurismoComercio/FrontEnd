/**
* UserAdminController Module
*
* to redirect to edit user, create problems, complete social networks
*/
angular.module('gemStore')
.controller('SigninController', ['$scope', 'registroService', 'UserFactory',
        function($scope,registroService,UserFactory){
        $scope.mensaje="";
        $scope.signin=function(user)
        {
        	
                usuario = registroService.getUsuario();
				
                UserFactory.get({id:user}).$promise
                .then(function(user){
                    registroService.setUsuario(user);
                    registroService.changeView('personalData');
               	
                }).catch(function(errors){
                    $scope.mensaje="No se encontró al usuario";
                }).finally(function(){
                    
                    //registroService.changeView('personalData');
                });



        }	
	
}]);