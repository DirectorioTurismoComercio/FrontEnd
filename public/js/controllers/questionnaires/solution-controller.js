angular.module('gemStore')
.controller('SolutionController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'QuestionnaireFactory','questionnaireService', 'navBar','autenticacionService','$mdDialog','GuardarBusquedaFactory','$mdToast',
	function($scope,Constantes,SolutionFactory,solutionService, $location, QuestionnaireFactory, questionnaireService, navBar, autenticacionService, $mdDialog, GuardarBusquedaFactory,$mdToast){
        //Rutas Imagenes        
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img = $scope.ruta + 'boton-empresario.png';
        $scope.img2 = $scope.ruta + 'icono-registro.png';
        $scope.anterior = $scope.ruta+'boton-regresar.png';
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
          if (autenticacionService.getInfo()) {
            questionnaireService.changeView("/profileSearchDetail");                      
          } else{
            questionnaireService.changeView(view);                      
          };          
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
            console.log('Info',qf);
            $scope.load = true;
            SolutionFactory.save ({cuestionario:qf,pagina:pageNumber}).$promise.
            then(function(info){                                
                solutionService.setSolutions(info.problemas_soluciones);
                $scope.solutions = solutionService.getSolutions();
                $scope.totalsolutions = info.total;
                solutionService.setPage(pageNumber);                
            })
            .catch(function(errors){
                console.log(errors);
            })
            .finally(function(){
                console.log("in finally");
                $scope.load = false;
            });          
        }
        
        
        $scope.detalle = function(_id,_index){                      
            // $scope.solution = $scope.solutions[parseInt(_id)];
            // solutionService.setSolution($scope.solution);            
            solutionService.setId(_id);
            solutionService.setIndex(_index);            
            $location.path('/solutions/detail');                               
        }

        $scope.reg = function(){                   
            $location.path('personalData');                               
        }

        $scope.loggin = function(){
            if (autenticacionService.getInfo()) {                
                return false;
            } else{                
                return true;
            };            
        }
        var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      $scope.toastPosition = angular.extend({},last);
      $scope.getToastPosition = function() {    
        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
      };  
      $scope.openToast = function($event) {        
        $mdToast.show(
          $mdToast.simple().content('Búsqueda Agregada')        
          .position($scope.getToastPosition())
          .hideDelay(1000)
        );
      };

        $scope.addB = function(){
            $mdDialog.show({
                  controller: DialogController,
                  templateUrl: 'templates/questionnaires/popup-tmp.html',
                  parent: angular.element(document.body),
                  targetEvent: '$event',
                  clickOutsideToClose:true
                })
                .then(function(answer) {                  
                  console.log(answer.titulo);
                  console.log(answer.descripcion);
                  console.log(questionnaireService.getQuestionnaires());                  
                  console.log(questionnaireService.getTipo());                                   
                  console.log(autenticacionService.getUser());                                   
                  $NuevaBusqueda = new GuardarBusquedaFactory();
                  $NuevaBusqueda.titulo = answer.titulo;
                  $NuevaBusqueda.descripcion = answer.descripcion;
                  $NuevaBusqueda.cuestionario = questionnaireService.getQuestionnaires();
                  $NuevaBusqueda.tipo = questionnaireService.getTipo();
                  $NuevaBusqueda.usuario = autenticacionService.getUser().id;
                  $NuevaBusqueda.categorias = [];
                  $NuevaBusqueda.tags = [];
                  $NuevaBusqueda.respuestas_asociadas = [];
                  $NuevaBusqueda.$save({'pk': autenticacionService.getUser().id}).then(function(datos){                    
                    autenticacionService.setIdBusqueda(datos.id);
                    $scope.openToast();
                    console.log(datos);                    
                  }).catch(function(error){
                    console.log(error);                    
                  });
                }, function() {                                    
                    
                });            
        }
        
}]);
function DialogController($scope, $mdDialog) {
    $scope.save = false;
    // console.log($scope.info.titulo);
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer,answer2) {    
    var a = {};
    a.titulo=answer;
    a.descripcion=answer2;    
    $mdDialog.hide(a);
  };
}