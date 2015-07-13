
angular.module('gemStore')
.controller('SignoutController', ['$scope', 'registroService', 
        function($scope,registroService){
       
            registroService.reset();
            console.log(registroService.getUsuario());
            $location.path('signin');


        }	
	
]);