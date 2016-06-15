angular.module('map')
.directive('carousel', [function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope:{
                images:'='
            },
        templateUrl: 'js/custom_components/carousel/carousel.html',
        link: function link(scope, element, attrs) {
            var container = $(element);
            var carousel = container.children('.jcarousel')

            carousel.jcarousel({
                wrap: 'circular'
            });

            scope.$watch(attrs.images, function (value) {
                
                console.log("reloading",scope.images);

            });

            container.children('.jcarousel-control-prev')
                .jcarouselControl({
                target: '-=1'
            });

            container.children('.jcarousel-control-next')
                .jcarouselControl({
                target: '+=1'
            });
        }
    }
}]);