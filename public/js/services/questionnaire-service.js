(function(){
	angular.module('gemStore')
	.service('questionnaireService', ['$resource', 'QuestionnaireFactory',
	function($resource,QuestionnaireFactory) {
	var questionnaires = null;
	
	
	var getQuestionnaires = function ()
	{
		return questionnaires;
	}
	var setQuestionnaires = function (_questionnaires)
	{
		questionnaires = _questionnaires;
	}
		
	
	var getQuestionnaire = function (index)
	{
		return questionnaires[index];
	}
	


	
	  return {
	  	questionnaires: questionnaires,
	    getQuestionnaires: getQuestionnaires,
	    setQuestionnaires: setQuestionnaires,
	    getQuestionnaire: getQuestionnaire
	    
	  };

	}]);
})();	
