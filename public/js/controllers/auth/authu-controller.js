(function(){
	angular.module('gemStore')
	.controller('AController', ['$scope','Constantes','AuthFactory','autenticacionService','UserByToken',
		function($scope,Constantes,AuthFactory,autenticacionService,UserByToken){                        
	      console.log(autenticacionService.getInfo());
	      console.log("asdkasdj");	      	
	      data = {};

	      UserByToken.us(autenticacionService.getInfo()).query().$promise.then(function(datos){            
            console.log(datos);                                    
            data = datos;
            console.log(data.nombres);                       
            console.log(autenticacionService.getInfo());                       
          }).catch(function(error){
            console.log(error);            
          });	      
		}
	]);

})();
