(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


        function FoundItemsDirective () {
            return {
                restrict: 'EA',
                templateUrl: '../foundItems.html',
                scope: {
                    found: '<', 
                    onRemove: '&', 
                    emptySearch: '<', 
                    emptyResults: '<'
                }, 
                controller: FoundItemsDirectiveController, 
                controllerAs: 'narrow',
                bindToController: true,

            }
        };
    
        function FoundItemsDirectiveController() {
            var narrow = this;
        };

        NarrowItDownController.$inject = ['MenuSearchService'];

        function NarrowItDownController(MenuSearchService) {
            var narrow = this;
            narrow.itemsFound = [];
            narrow.emptySearch = false;
            narrow.emptyResults = false;
            narrow.searchMenuItems = function(term) {
                if(!term) {
                    narrow.emptySearch = true;
                }
                else {
                    narrow.itemsFound = [];
                    narrow.emptySearch = false;   
                    var promise = MenuSearchService.getMatchedMenuItems(term);
                    promise.then(function(result) {
                        if(result.length ===0) {
                            narrow.emptyResults = true;
                        }
                        else {
                            narrow.emptyResults = false;   
                            narrow.itemsFound = result;
                        }
                    })
                    .catch(function(error) {
                        narrow.error = error;
                    });
                }
            };

            narrow.removeItem = function(index) {
                narrow.itemsFound.splice(index, 1);
            }
        };

        MenuSearchService.$inject = ['$http', 'ApiBasePath'];
        function MenuSearchService ($http, ApiBasePath) {
            var service = this;

            service.getMatchedMenuItems = function(searchTerm) {
                return $http({
                    method: 'GET',
                    url: (ApiBasePath +'/menu_items.json')
                    
                }).then(function(result) {
                    var allItems = result.data;
                    var found = [];
                    allItems.menu_items.forEach(function(allItem) {
                        if(allItem.description.indexOf(searchTerm) !== -1 ||
                         allItem.name.indexOf(searchTerm) !== -1 ) {
                            found.push(allItem);
                        }
                    });
                   return found;
                }, function(error) {
                    return error; 
                });

            }

        };
    })();

