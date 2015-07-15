/**
* gemStore Module
*['ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(ProblemFactory, $scope, $routeParams, $location,ResultRetriever){

*/
angular.module('gemStore')
.controller('ProblemsCreateController',
	['CategoryFactory','ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(CategoryFactory, ProblemFactory, $scope, $routeParams, $location,ResultRetriever){

	$scope.problem = new ProblemFactory();

	$scope.problem.categorias=[];
	$scope.problem.tags=[];
	$scope.problem.usuario  =Number($routeParams.idUser);
	$scope.isSubmitting     =false;

	//categoreis related code
	// $scope.categories = CategoryFactory.query({nivel:"2",categoria_padre:"1"});
	$scope.rootCategories = CategoryFactory.query({nivel:"1"});
	$scope.getCategoriesLevel2 = function(idParent,level){
		$scope.problem.categorias[1]= null;
		$scope.problem.categorias[2]= null;
		console.log("Level2 idParent",idParent);
		$scope.subcategoryTwo = CategoryFactory.query({categoria_padre:idParent,nivel:level});
		console.log($scope.subcategoryTwo);
	};

	$scope.getCategoriesLevel3 = function(idParent,level){
		console.log("Level3 idParent",idParent);
		$scope.subcategoryThree = CategoryFactory.query({categoria_padre:idParent,nivel:level});
		console.log($scope.subcategoryThree);
	};
	//tags related code
	$scope.tag = { result:  ""};

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
		problem.$save({id:$routeParams.idUser})
		.then(function(problem){
			// console.log("------this is the problem returned from server: ",problem);
			$location.path("user/"+$routeParams.idUser+"/problem/"+problem.id);
		}).catch(function(errors){
			//validations
			console.log("SAVING PROBLEM - ERRORS returned from server: ",errors);
		}).finally(function(){
			$scope.isSubmitting = false;
		});
	};
}]);