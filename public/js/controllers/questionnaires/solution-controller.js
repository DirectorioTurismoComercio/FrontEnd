angular.module('gemStore')
.controller('SolutionController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'QuestionnaireFactory','questionnaireService', 'navBar',
	function($scope,Constantes,SolutionFactory,solutionService, $location, QuestionnaireFactory, questionnaireService, navBar){
        //Rutas Imagenes
        window.scrollTo(0, 1);
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img = $scope.ruta + 'boton-empresario.png';
        $scope.img2 = $scope.ruta + 'icono-registro.png';
        $scope.detail = false;
        $scope.id = null;
        $scope.load = true;
        
        $scope.toggleRight = function(){                                
          navBar.open();
        }

        $scope.close= function(){
          navBar.close();
        }

        $scope.menu_bar = function (view){
          questionnaireService.changeView(view);                      
        }
        
        //Total de soluciones 
        $scope.totalsolutions = 0; 
        // Soluciones por página
        $scope.solPerPage = 10;
        // inicialmente trae la página 1
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        //Cambio de Pagina
        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {            
        //Definición de objeto para envio cuestionario y tipo
            var qf = new QuestionnaireFactory();
            qf.cuestionarios = questionnaireService.getQuestionnaires();                                        
            qf.tipo = questionnaireService.getTipo();

            $scope.load = true;
            SolutionFactory.get({cuestionario:qf,pagina:pageNumber}).$promise.
            then(function(info){                
                $scope.datos = info.problemas_soluciones;
                solutionService.setSolutions(info.problemas_soluciones);
                $scope.totalsolutions = info.total;
                console.log($scope.datos);
            })
            .catch(function(errors){
                console.log(errors);
            })
            .finally(function(){
                console.log("in finally");
                $scope.load = false;
            });          
        }
        //   promesa = SolutionFactory.query().$promise.
        //   then(function(solutions){                
        //         solutionService.setSolutions(solutions);
        //         $scope.solutions=solutionService.getSolutions();                
        // })
        // .catch(function(errors){
        //   console.log(errors);
        // })
        // .finally(function(){
        //   console.log("in finally");
        //   $scope.load = false;
        // });
            // $http.get('path/to/api/users?page=' + pageNumber)
            //     .then(function(result) {
            //         $scope.users = result.data.Items;
            //         $scope.totalUsers = result.data.Count
            //     });
        
        $scope.detalle = function(_id){            
            $scope.solution = $scope.solutions[parseInt(_id)];
            solutionService.setSolution($scope.solution);
            $location.path('/solutions/detail');                               
        }

        $scope.reg = function(){                   
            $location.path('personalData');                               
        }

        
}]);