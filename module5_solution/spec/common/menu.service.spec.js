'use strict';

describe('MenuService', function () {
    
    var MenuService; 
    var $httpBackend;
    var ApiPath;
    var category = "A";
    var item_id = "A2";
    var wrong_item_id = "AAAA2";
    var menu_items = {"menu_items":[{"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart","image_present":true},{"id":2,"short_name":"A2","name":"Egg Drop Soup","description":"chicken broth with egg drop","price_small":2.25,"price_large":4.5,"small_portion_name":"pint","large_portion_name":"quart","image_present":true}]};
    var menu_item = {"id":2,"short_name":"A2","name":"Egg Drop Soup","description":"chicken broth with egg drop","price_small":2.25,"price_large":4.5,"small_portion_name":"pint","large_portion_name":"quart","created_at":"2016-10-17T18:07:21.140Z","updated_at":"2016-10-17T18:07:21.140Z","category_short_name":"A","image_present":true};

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
            expect(response).toEqual(['Lunch', 'Dessert'])
        });
        $httpBackend.flush();
    });

    it('should return menu items for a category', function() {
        $httpBackend.whenGET(ApiPath + '/menu_items.json?category=' + category).respond(menu_items);
        MenuService.getMenuItems(category).then(function(response) {
            expect(response).toEqual(menu_items);
        });
        $httpBackend.flush();
    });
    it('should return a menu item for an item id', function() {
        $httpBackend.whenGET(ApiPath + '/menu_items/' + item_id + '.json').respond(menu_item);

        MenuService.getMenuItem(item_id).then(function(response) {
            expect(response).toEqual(menu_item);
        });
        $httpBackend.flush();
    });

    it('should return a 500 error for a wrong item id', function() {
        $httpBackend.whenGET(ApiPath + '/menu_items/' + wrong_item_id + '.json').respond(500, 'No such menu number exists');
         MenuService.getMenuItem(wrong_item_id).then(function(response) {
            expect(response.status).toEqual(500);
            expect(response.data).toEqual("No such menu number exists");
           // expect(function (){MenuService.getMenuItem(wrong_item_id);}).toThrow(new Error("No such menu number exists"));
        });
        $httpBackend.flush();
    });
});
