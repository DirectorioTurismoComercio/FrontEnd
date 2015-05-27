/**
* gemStore Module
*
* Factory to access REST problems in server
*/
angular.module('gemStore')
.factory('ProblemFactory', ['$resource','Constantes', 
	function($resource, Constantes){
		console.log("Constantes.url",Constantes.url);
		return $resource(Constantes.url+'/usuarios/:id/problemas_soluciones'
			, {id:"@id"}, {
			update : {
				method : "PUT"
			}
		});
	}
]);