(function(){
	angular.module('gemStore')
	.controller('AController', ['$scope','Constantes','AuthFactory','autenticacionService','UserPrueba',
		function($scope,Constantes,AuthFactory,autenticacionService,UserPrueba){                        
	      console.log(autenticacionService.getInfo());
	      console.log("asdkasdj");	      	
	      data = {};

	      UserPrueba.us(autenticacionService.getInfo()).query().$promise.then(function(datos){            
            console.log(datos);                                    
            data = datos;
            console.log(data.nombres);                       
            console.log(autenticacionService.getInfo());                       
          }).catch(function(error){
            console.log(error);            
          });
	      // UserPrueba.us(autenticacionService.getInfo()).query();
		}
	]);

})();
