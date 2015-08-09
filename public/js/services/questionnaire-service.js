(function(){
	angular.module('gemStore')
	.service('questionnaireService', ['$resource', 'QuestionnaireFactory',
	function($resource,QuestionnaireFactory) {
	var questionnaires = null;
	
	var answers = [];
	var getQuestionnaires = function ()
	{
		return questionnaires;
	}
	var setQuestionnaires = function (_questionnaires)
	{
		questionnaires = _questionnaires;
	}
	var getAnswers = function()
	{
		return answers;
	}

	var addAnswer = function (answer)
	{
		answers.push(answer);
	}
	var removeAnswer = function (answer)
	{
		var index = answers.indexOf(answer);
		if (index > -1) {
		    answers.splice(index, 1);
		}

	}


	
	var getQuestionnaire = function (index)
	{
		return questionnaires[index];
	}
	


	
	  return {
	  	questionnaires: questionnaires,
	    getQuestionnaires: getQuestionnaires,
	    setQuestionnaires: setQuestionnaires,
	    getQuestionnaire: getQuestionnaire,
	    getAnswers: getAnswers,
	    addAnswer: addAnswer,
	    removeAnswer: removeAnswer
	    
	  };

	}]);
})();	
