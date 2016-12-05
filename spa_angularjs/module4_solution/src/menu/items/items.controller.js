(function () {
    'use strict';
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['$stateParams', 'itemsList'];
    function ItemsController($stateParams, itemsList) {
        var items = this; 
        items.itemsList = itemsList.data;
        console.log("Items controller: ", items.itemsList);
    };

})();