(function(){
	angular.module('gemStore')
	.factory("ConexionMensajeFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/conversaciones/mensaje");			
			return obj;			
		}]);
})();