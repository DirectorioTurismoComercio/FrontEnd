(function(){
	angular.module('gemStore')
	.controller('socialNetworksController',
        ['$scope','registroService', '$routeParams', 'Constantes', 'UsuarioRedFactory','UsuarioRedesFactory', 'RedFactory',
		function socialNetworksController($scope,registroService, $routeParams, Constantes, UsuarioRedFactory,UsuarioRedesFactory, RedFactory) 
    {
	var idusuario = $routeParams.idusuario;
    
    $scope.bAgregar=false;
    $scope.bGuardar=true;
    var usuarioredes=[];
    UsuarioRedesFactory.query({idusuario: idusuario}).$promise 
        .then(function(usuarioRedes){
                usuarioredes=usuarioRedes;
                $scope.usuarioredes=usuarioredes;
                
            }).catch(function(errors){
                console.log("Error al recuperar usuarioredes desde el servidor: ",errors);
            }).finally(function(){
               
            });
     
    RedFactory.query().$promise 
        .then(function(redes){
                $scope.redes=redes;
                nuevaRed();

            }).catch(function(errors){
                console.log("Error al recuperar las redes sociales desde el servidor: ",errors);
            }).finally(function(){
               
            });
    $scope.bEditar=new Array(usuarioredes.length);
    $scope.bGuardar=new Array(usuarioredes.length);
    console.log($scope.usuarioredes);

    $scope.changeView = function (view) {
            registroService.changeView(view);
        } 
    function error(errores) {
            alert("error de conexion con el servidor");
            Console.log(errores);
    }
    $scope.getRedById=function(id)
    {
        var longitud=0;
        if($scope.redes)
        {
            longitud=$scope.redes.length;
        }
    
        var i;
        for(i=0;i<longitud;i++)
        {
            if($scope.redes[i].id==id)
                return $scope.redes[i];
        }    
        return -1;
    }

    $scope.editar=function(index)
    {
    $scope.bGuardar[index]=true;
    
    
     
    }
    $scope.borrar=function(index)
    {
        UsuarioRedFactory.delete({id: $scope.usuarioredes[index].id }).$promise 
        .then(function(data){
                $scope.bGuardar.splice(index,1);
                $scope.bEditar.splice(index,1);
                $scope.usuarioredes.splice(index,1);
            }).catch(function(errors){
                error(errors);
            }).finally(function(){
               
            });

     
    }
    
    $scope.guardar=function(index)
    {
     console.log($scope.usuarioredes[index]);
     UsuarioRedFactory.update({id: $scope.usuarioredes[index].id },$scope.usuarioredes[index]).$promise
     .then(function(data){
              $scope.bEditar[index]=true;
              $scope.bGuardar[index]=false;
            }).catch(function(errors){
                error(errors);
            }).finally(function(){
               
            });

      
    }
    function nuevaRed()
    {
        $scope.nuevared={"url":"","usuario":idusuario,"red_social":$scope.redes[0].id};  
    }
    $scope.crear=function()
    {
      console.log($scope.nuevared);
      UsuarioRedFactory.save($scope.nuevared).$promise 
      .then(function(data){
              $scope.bAgregar=false;
              $scope.bEditar.push(false);
              $scope.bGuardar.push(false); 
              $scope.usuarioredes.push(data);
              nuevaRed();
            }).catch(function(errors){
                error(errors);
            }).finally(function(){
               
            });

      
   
    
    }
   /*
    UsuarioRedesFactory.query({idusuario: idusuario},function(usuarioredes) {
        $scope.bEditar=new Array(usuarioredes.length);
        $scope.bGuardar=new Array(usuarioredes.length);
        $scope.usuarioredes = usuarioredes;
    });
*/
    
    }

	]);

	var gem = {name:"andres"};
})();