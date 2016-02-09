/*describe('QuestionsController', function() {

  beforeEach(module('userModule'));
  beforeEach(module('gemStore'));
    

  var $controller;
  var questionnaireService;
  var QuestionnaireFactory;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  beforeEach(inject(function($injector){
    questionnaireService = function(){
      return $injector.get('questionnaireService');
    }
  }));


  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {


      var $scope = {};
      var controller = $controller('QuestionsController', { $scope: $scope,  questionnaireService: questionnaireService});
      //$scope.next();
      expect(true).toEqual(true);
    });
  });
});

*/



describe('Example mainPageController Test', function() {
  beforeEach(module('gemStore'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.titulo', function() {
    it('Checks if title is: Seleccion de rol', function() {
      var $scope = {};
      var controller = $controller('MainPageController', { $scope: $scope });
      expect($scope.titulo).toEqual('Seleccion de rol');
    });
  });
});


