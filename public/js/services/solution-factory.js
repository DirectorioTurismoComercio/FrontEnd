/**
* gemStore Module
*
* Factory to access REST problems in server
*/
angular.module('gemStore')
.factory('SolutionFactory', ['$resource','Constantes',
	function($resource, Constantes){		
		// return $resource(Constantes.url+'/afinidad',{cuestionario: '@cuestionario',pagina: '@pagina'});		
		return $resource(Constantes.url+'/afinidad');
	}
]);