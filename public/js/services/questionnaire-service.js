(function(){
	angular.module('gemStore')
	.service('questionnaireService', ['$resource', '$location','QuestionnaireFactory',
	function($resource,$location,QuestionnaireFactory) {
	var questionnaires = new QuestionnaireFactory();
	
	
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
