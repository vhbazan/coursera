(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);



ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var buy = this;

    buy.toBuyList = ShoppingListCheckOffService.getToBuyList();

    buy.itemBought = function(IndexId) {

        ShoppingListCheckOffService.itemBought(IndexId);
    }
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
   // bought.alreadyBoughtList = [];
    bought.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
};

ShoppingListCheckOffService.$inject = [];
function ShoppingListCheckOffService () {

    var service = this; 
    //define the arrays 
    var toBuyList = [{ name: "cookies", quantity: 10 },
                    { name: "chickens", quantity: 1 },
                    { name: "potatos", quantity: 4},
                    { name: "tomatos", quantity: 5 }, 
                    { name: "apples", quantity: 6 },
                    { name: "bananas", quantity: 5 }];
    var alreadyBoughtList = [];

    service.getToBuyList =function () {
        return toBuyList;
    };

     service.getAlreadyBoughtList =function () {
        return alreadyBoughtList;
    };

    service.itemBought = function(IndexId) {
        var itemBought = toBuyList[IndexId];
        toBuyList.splice(IndexId, 1);
        alreadyBoughtList.push(itemBought);
    };


    
};


})();