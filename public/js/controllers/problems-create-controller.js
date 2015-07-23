/**
* gemStore Module
*['ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(ProblemFactory, $scope, $routeParams, $location,ResultRetriever){

*/
angular.module('gemStore')

.controller('ProblemsCreateController',
	['CategoryFactory','ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever','registroService',
	function(CategoryFactory, ProblemFactory, $scope, $routeParams, $location,ResultRetriever,registroService){
    var idUsuario = registroService.getUsuario().id;	
	
	var isEditing = false;
	if(typeof $routeParams.idProblem === 'undefined'){
		//create problem
		console.log("create a problem");
	    $scope.problem = new ProblemFactory();
	    $scope.problem.categorias=[];
		$scope.problem.tags=[];
		$scope.problem.usuario  =Number(idUsuario);
	}else{
		$scope.problem = ProblemFactory.get({id: $routeParams.idUser,idProblem: $routeParams.idProblem });
		isEditing = true;
	}
	$scope.isSubmitting = false;
	$scope.tag = { result:  ""};
	$scope.form="";
	$scope.showErrors=false;
	$scope.categorias = CategoryFactory.query();
	$scope.clearCategoryArray = function(level){
		if (level === 1){
			$scope.problem.categorias[1]= null;
		}
		$scope.problem.categorias[2]= null;
	};

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
	$scope.saveProblem      =function(problem,form){
		$scope.isSubmitting =true;
		if(form.$valid)
		{	
			var promise = null;
			if(isEditing){
				promise = problem.$update({id:idUsuario,idProblem:$routeParams.idProblem});
			}else{
				promise = problem.$save({id:idUsuario});
			}
			promise.then(function(problem){
				console.log("------this is the problem returned from server: ",problem);
				$location.path("user/problems");
			}).catch(function(errors){
				console.log("SAVING PROBLEM - ERRORS returned from server: ",errors);
			}).finally(function(){
				$scope.isSubmitting = false;
				$location.path("user/"+$routeParams.idUser+"/problem/"+problem.id);
			});
							
		}
		else
		{
			$scope.showErrors=true;
		}	
		

    };
     $scope.validate = function(model,icon,error)
            { 
                
                if(!$scope.showErrors)
                {    
                    if(model.$untouched)
                    {
                        return "";
                    }    
                }    
              
                
                if(icon!=undefined)
                {
                          if(model.$invalid)
                            {
                                
                                return "glyphicon glyphicon-remove form-control-feedback";   
                                
                            }
                            else
                            {

                                return "glyphicon glyphicon-ok form-control-feedback";               
                            
                            }

                }
                else{ 
                	
                        if(model.$invalid)
                        {
                            
                            return "form-group has-error has-feedback";   
                            
                        }
                        else
                        {

                            
                            return "form-group has-success has-feedback";               
                        
                        }
                        
                    }
                  
             };                
}
]);