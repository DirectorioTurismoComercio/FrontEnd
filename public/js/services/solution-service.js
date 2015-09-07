(function(){
	angular.module('gemStore')	
	.service('solutionService', ['$resource','SolutionFactory','$location',
	function($resource,SolutionFactory,$location) {
	var solutions = null; //Todas
	var solution = null; //Una sola
	var getSolutions = function ()
	{
		return solutions;
	}
	var setSolutions = function (_solutions)
	{
		solutions = _solutions;
		console.log(solutions);
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

	 return {

	 	solutions: solutions,
	 	solution: solution,
	 	getSolutions: getSolutions,
	 	setSolutions: setSolutions,
	 	getSolution: getSolution,
	 	setSolution: setSolution	  		  	
	  };

	}]);
})();	
