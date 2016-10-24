describe('MenuService', function () {
    
    var MenuService; 
    var $httpBackend; 
    var ApiPath;

    beforeEach(function () {
        module('common');

        inject(function($injector) {
            MenuService = $injector.get('MenuService');
            $httpBackend = $injector.get('$httpBackend');
            ApiPath = $injector.get('ApiPath');
        });
    });

    it('should return categories list', function() {
        $httpBackend.whenGET(ApiPath + '/categories.json').respond(['Lunch', 'Dessert']);
        MenuService.getCategories().then(function(response) {
            expect(response.data).toEqual(['Lunch', 'Dessert'])
        });
        $httpBackend.flush();
    })
});
