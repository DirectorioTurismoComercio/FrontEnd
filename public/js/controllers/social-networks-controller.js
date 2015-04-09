(function(){
	angular.module('redesSocialesModule', [])
	.controller('socialNetworksController',['$http', '$scope', 'Constantes','UserFactory','RoleFactory',
		function socialNetworksController($scope,$http,$routeParams, UsuarioRedFactory,UsuarioRedesFactory, RedFactory) {
	       var idusuario = $routeParams.idusuario;
    $scope.nuevared={"url":"","usuario":1,"red_social":1};
    $scope.bAgregar=false;
   //  $scope.redes = [{id:1,nombre:"Facebook",icono:""},{id:2,nombre:"Twitter",icono:""}];
    function error(errores)
    {
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
      //  UsuarioRedFactory.delete({id: $scope.usuarioredes[index].id }, function(data){  
        $scope.bGuardar.splice(index,1);
        $scope.bEditar.splice(index,1);
        $scope.usuarioredes.splice(index,1);
    //    },error);
     
    }
    
    $scope.guardar=function(index)
    {

     // UsuarioRedFactory.update({id: $scope.usuarioredes[index].id },$scope.usuarioredes[index],function(data)
     // {
      $scope.bEditar[index]=true;
      $scope.bGuardar[index]=false;
     
    //  },error); 
      
    }
    $scope.crear=function()
    {
    //    console.log($scope.nuevared);
    //  UsuarioRedFactory.save($scope.nuevared, function(data){  
      $scope.bAgregar=false;
      $scope.bEditar.push(false);
      $scope.bGuardar.push(false);
      $scope.usuarioredes.push($scope.nuevared);

      $scope.nuevared={"url":"","usuario": idusuario,"red_social":1};
   //   }, error);
    
    }
   
    UsuarioRedesFactory.query({idusuario: idusuario},function(usuarioredes) {
        $scope.bEditar=new Array(usuarioredes.length);
        $scope.bGuardar=new Array(usuarioredes.length);
        $scope.usuarioredes = usuarioredes;
    });
    
    RedFactory.query(function(redes) {
        $scope.redes = redes;
   
    });

    }
	]);
	var gem = {name:"andres"};
})();