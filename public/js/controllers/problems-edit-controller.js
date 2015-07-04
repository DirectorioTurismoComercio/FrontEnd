/**
* gemStore Module
*
* ProblemEditController
*/
angular.module('gemStore')
.controller('ProblemsEditController', 
	['ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(ProblemFactory, $scope, $routeParams, $location,ResultRetriever){
	$scope.problem = ProblemFactory.get({id: $routeParams.idUser,idProblem: $routeParams.idProblem });
	$scope.isSubmitting = false;
	$scope.tag = { result:  ""};
	$scope.doSomething = function(typedthings){
      $scope.results = ResultRetriever.getresults(typedthings, 'SuggestedTagsFactory');
      $scope.results.then(function(data){
        $scope.results = data;
      });
    }
	$scope.remove_tag = function(index){	
       $scope.problem.tags.splice(index,1);    
	}
	$scope.add_tag = function(new_tag){
		if($scope.problem.tags.indexOf(new_tag)==-1){
			$scope.problem.tags.push(new_tag);	
		}
		$scope.tag.result = "";
	}

    $scope.doSomethingElse = function(suggestion){
      $scope.add_tag(suggestion);
      	$scope.tag.result = "";
    }
	$scope.saveProblem = function(problem){
		$scope.isSubmitting = true;
		console.log("problem:",problem);
		problem.$update({id:$routeParams.idUser,idProblem:$routeParams.idProblem})
		.then(function(problem){
			console.log("problema guardado exitosamente: ",problem);
		})
		.catch(function(error){
			console.log("Update problem in server errors: ",error);
		})
		.finally(function(){
			$scope.isSubmitting = false;
			$location.path("/user/"+$routeParams.idUser+"/problem/"+$routeParams.idProblem);
		});
	};
}]);