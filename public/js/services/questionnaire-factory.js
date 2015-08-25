/**
* gemStore Module
*
* Factory to access REST problems in server
*/
angular.module('gemStore')
.factory('QuestionnaireFactory', ['$resource','Constantes',
	function($resource, Constantes){
		return $resource(Constantes.url+'/roles/:id/cuestionarios',{tipo: '@tipo'}
		);		
	}
]);