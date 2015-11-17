(function(){
	angular.module('gemStore')
	.service('questionnaireService', ['$resource','QuestionnaireFactory','$location',
	function($resource,QuestionnaireFactory,$location) {
	var questionnaires = null;
	var rol = null;
	var tipo = null;
	var answers = [];
	var full= [];
	var conta_respuestas= 0;
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

	var clearAnswers = function()
	{
		answers = [];
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
	//Para ver si ya se respondio la respuesta
	var getFull = function(_id){		
		 if (full[_id] == 'COMPLETO') {
		 	return true;
		 } 
		 else{
			return false;
		 };		 
	};	
	var setFull = function(_id){		
		console.log('Entra');
		 full[_id]= 'COMPLETO';		
	};	
	var clearFull = function(_dato){		
		if (_dato == 'ALL') {
			full = [];	
		} else {
			full[_dato] = 'ELIMINADO';	
		};		
	};	
	
	//Cuenta respuestas para mostrar el botón de buscar
	var getConta = function(){		
		 return conta_respuestas;
	};	
	var setConta = function(_conta){				
		if (_conta == 0) {
			conta_respuestas = 0;
		} else if (_conta == -1) {
			conta_respuestas--;
		} else {
			conta_respuestas++;
		};		 
	};	
	//Resetear servicio de cuestionario
	var reset = function(){
		questionnaires = null;
		rol = null;
		tipo = null;
		answers = [];
		full= [];
		conta_respuestas= 0;		
	}	
	  return {
	  	questionnaires: questionnaires,
	    getQuestionnaires: getQuestionnaires,
	    setQuestionnaires: setQuestionnaires,
	    getQuestionnaire: getQuestionnaire,
	    getAnswers: getAnswers,
	    clearAnswers: clearAnswers,
	    addAnswer: addAnswer,
	    removeAnswer: removeAnswer,
	    changeView: changeView,	    
	    getRol: getRol,
	    setRol: setRol,
	    getTipo: getTipo,
	    setTipo: setTipo,
	    getFull: getFull,
	    setFull: setFull,
	    clearFull: clearFull,
	    getConta: getConta,
	    setConta: setConta,
	    reset: reset
	  };

	}]);
})();	
