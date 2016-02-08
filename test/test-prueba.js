/*describe('QuestionsController', function() {

  //beforeEach(module('$routeParams'));
  
    beforeEach(module('gemStore'));
    

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('QuestionsController', { $scope: $scope });
      //$scope.next();
      expect(true).toEqual(true);
    });
  });
});





describe('PasswordController', function() {
  beforeEach(module('app'));
  beforeEach(module('gemStore'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('PasswordController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('sstrong');
    });
  });
});*/


