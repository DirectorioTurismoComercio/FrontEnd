
angular.module('gemStore')
.factory('QuestionnaireSave', ['$resource','Constantes',
	function($resource, Constantes){
		return $resource(Constantes.url+'/cuestionarios/guardar'
		);
	}
]);
