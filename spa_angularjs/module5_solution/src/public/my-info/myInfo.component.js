(function () {
    'use strict';
    angular.module('public')
    .component('myInfoDetails', {
        templateUrl: 'src/public/my-info/myInfo-details.html',
        bindings: {
            myInfo: '<'
        }, 
        controller: MyInfoDetailsController
    });

    MyInfoDetailsController.$inject = ['ApiPath']; 

    function MyInfoDetailsController(ApiPath) {
        var $ctrl = this; 
        $ctrl.basePath = ApiPath;

    }
})();