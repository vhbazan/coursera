(function (){
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider
        .state('home', {
            url: '/home', 
            templateUrl: 'src/menu/templates/home.template.html'

        })

        .state('categories', {
            url: '/categories', 
            templateUrl: 'src/menu/templates/main-categories.template.html',
            controller: 'CategoriesController as categ',
            resolve: {
                categoriesList: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/:shortName', 
            templateUrl: 'src/menu/templates/main-items.template.html',
            controller: 'ItemsController as items', 
            resolve: {
                itemsList: ['$stateParams', 'MenuDataService', 
                function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }, 
            params: {
                shortName: null
            }
           
        });
    }
})();


