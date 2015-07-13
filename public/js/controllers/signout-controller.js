
angular.module('gemStore')
.controller('SignoutController', ['$scope', 'registroService', '$location',
        function($scope,registroService,$location){
       
            registroService.reset();
            console.log(registroService.getUsuario());
            $location.path('signin');


        }	
	
]);