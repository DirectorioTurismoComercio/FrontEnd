(function(){
	angular.module('gemStore')	
	.service('solutionService', ['$resource','SolutionFactory','$location',
	function($resource,SolutionFactory,$location) {
	var solutions = null; //Todas
	var solution = null; //Una sola
	var id = null; //Una sola
	var index = null; //Una sola
	var page = null; //Una sola
	var getSolutions = function ()
	{
		return solutions;
	}
	var setSolutions = function (_solutions)
	{
		solutions = _solutions;
		console.log('Soluciones:',solutions);
	}

	var getSolution = function ()
	{
		console.log(solution);
		return solution;
	}
	var setSolution = function (_solution)
	{
		solution = _solution;
		console.log(solution);
	}

	var getId = function ()
	{		
		return id;
	}
	var setId = function (_id)
	{
		id = _id;
		console.log(id);
	}
	var getIndex = function ()
	{		
		return index;
	}
	var setIndex = function (_index)
	{
		index = _index;		
		console.log(index);
	}
	var getPage = function ()
	{
		return page;
	}
	var setPage = function (_page)
	{
		page = _page;				
	}

	 return {

	 	solutions: solutions,
	 	solution: solution,
	 	getSolutions: getSolutions,
	 	setSolutions: setSolutions,
	 	getSolution: getSolution,
	 	setSolution: setSolution,
	 	getId: getId,
	 	setId: setId,
	 	getIndex: getIndex,
	 	setIndex: setIndex,
	 	getPage: getPage,
	 	setPage: setPage	  	  		  		  		  	
	  };

	}]);
})();	
