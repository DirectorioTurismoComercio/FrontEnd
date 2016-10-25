angular.module('map')
    .directive('pgClamp', function( $timeout, $clamp){
    return{
        link : link
    };

    function link(scope, element, attrs){
        var line = parseInt(attrs.pgClamp,10);

        if(attrs.ngBind){
            scope.$watch(attrs.ngBind, doClamp);
        }

        doClamp();

        function doClamp(){
            $timeout(function(){
                $clamp(element[0], { clamp : line });
            }, 0, false);
        }
    }
});