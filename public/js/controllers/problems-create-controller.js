/**
* gemStore Module
*['ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(ProblemFactory, $scope, $routeParams, $location,ResultRetriever){

*/
angular.module('gemStore')
.controller('ProblemsCreateController',
	['CategoryFactory','ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(CategoryFactory, ProblemFactory, $scope, $routeParams, $location,ResultRetriever){

	var isEditing = false;
	if(typeof $routeParams.idProblem === 'undefined'){
		//create problem
		console.log("create a problem");
	    $scope.problem = new ProblemFactory();
	    $scope.problem.categorias=[];
		$scope.problem.tags=[];
		$scope.problem.usuario  = Number($routeParams.idUser);
	}else{
		$scope.problem = ProblemFactory.get({id: $routeParams.idUser,idProblem: $routeParams.idProblem });
		isEditing = true;
	}
	$scope.isSubmitting = false;
	$scope.tag = { result:  ""};

	$scope.categorias = CategoryFactory.query();
	$scope.clearCategoryArray = function(level){
		if (level === 1){
			$scope.problem.categorias[1]= null;
		}
		$scope.problem.categorias[2]= null;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////
	//tag related
	$scope.doSomething = function(typedthings){
      $scope.results = ResultRetriever.getresults(typedthings, 'SuggestedTagsFactory');

      $scope.results.then(function(data){
        $scope.results = data;
      });
    };
	$scope.remove_tag = function(index){
       $scope.problem.tags.splice(index,1);
	};
	$scope.add_tag = function(new_tag){
		if($scope.problem.tags.indexOf(new_tag)==-1){
			$scope.problem.tags.push(new_tag);
		}
		$scope.tag.result = "";
	};
    $scope.doSomethingElse = function(suggestion){
      $scope.add_tag(suggestion);
      	$scope.tag.result = "";
    };
    //
	$scope.saveProblem      =function(problem){
		$scope.isSubmitting =true;
		var promise = null;
		if(isEditing){
			promise = problem.$update({id:$routeParams.idUser,idProblem:$routeParams.idProblem});
		}else{
			promise = problem.$save({id:$routeParams.idUser});
		}
		promise.then(function(problem){
			console.log("------this is the problem returned from server: ",problem);
		}).catch(function(errors){
			console.log("SAVING PROBLEM - ERRORS returned from server: ",errors);
		}).finally(function(){
			$scope.isSubmitting = false;
			$location.path("user/"+$routeParams.idUser+"/problem/"+problem.id);
		});
	};
}]);