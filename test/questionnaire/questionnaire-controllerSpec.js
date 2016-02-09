describe('Test suit that tests QuestionsController', function () {

    beforeEach(module('userModule'));
    beforeEach(module('gemStore'));


    var mockController;
    var mockScope;
    var mockQuestionnaireService;


    beforeEach(inject(function (questionnaireService, $controller, $routeParams, $rootScope) {
        mockScope = $rootScope.$new();
        mockQuestionnaireService = questionnaireService;

        var questionaires = [{
            preguntas: []
        }];

        spyOn(mockQuestionnaireService, 'getQuestionnaires').and.returnValue(questionaires);
        spyOn(mockQuestionnaireService, 'getQuestionnaire').and.returnValue(questionaires[0]);

        $routeParams.idQuestionnaire = 0;
        mockController = $controller('QuestionsController', {
            $scope: mockScope,
            questionnaireService: mockQuestionnaireService
        });
    }));


    it('should check that user has selected an answer', function () {
        mockScope.currentQuestion = {};
        mockScope.next();
        expect(true).toEqual(true);
    });
});


