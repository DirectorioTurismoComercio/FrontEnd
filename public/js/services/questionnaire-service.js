(function(){
	angular.module('gemStore')
	.service('questionnaireService', ['$resource','QuestionnaireFactory','$location',
	function($resource,QuestionnaireFactory,$location) {
	var questionnaires = null;
	var rol = null;
	var tipo = null;
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
	
	var changeView = function(view){			
			$location.path(view);
	};	

	var getRol = function(){
		return rol;
	};	

	var setRol = function(_rol){		
		rol = _rol;		
	};	

	var getTipo = function(){
		return tipo;
	};	

	var setTipo = function(_tipo){		
		tipo = _tipo;		
	};	
	
	  return {
	  	questionnaires: questionnaires,
	    getQuestionnaires: getQuestionnaires,
	    setQuestionnaires: setQuestionnaires,
	    getQuestionnaire: getQuestionnaire,
	    getAnswers: getAnswers,
	    addAnswer: addAnswer,
	    removeAnswer: removeAnswer,
	    changeView: changeView,	    
	    getRol: getRol,
	    setRol: setRol,
	    getTipo: getTipo,
	    setTipo: setTipo
	  };

	}]);
})();	
