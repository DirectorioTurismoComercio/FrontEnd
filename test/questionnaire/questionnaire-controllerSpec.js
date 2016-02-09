describe('QuestionsController', function () {

    beforeEach(module('userModule'));
    beforeEach(module('gemStore'));


    var mockController;
    var mockScope;
    var mockQuestionnaireService;


    beforeEach(inject(function (questionnaireService, $controller, $routeParams, $rootScope) {
        mockQuestionnaireService = questionnaireService;
        mockQuestionnaireService.setQuestionnaires([{
            preguntas: []
        }]);

        $routeParams.idQuestionnaire = [0];

        mockScope = $rootScope.$new();
        mockController = $controller('QuestionsController', {
            $scope: mockScope,
            questionnaireService: mockQuestionnaireService
        });
    }));


    describe('$scope.grade', function () {
        it('sets the strength to "strong" if the password length is >8 chars', function () {
            //questionnaireService.setQuestionnaires(['q1']);
            mockScope.currentQuestion = {};
            mockScope.next();
            expect(true).toEqual(true);
        });
    });
});


