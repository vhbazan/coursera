(function () {
    'use strict';
    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MyInfoService', 'myInfo'];

    function MyInfoController (MyInfoService, myInfo) {
        var ctrl = this; 
        ctrl.myInfo = myInfo;
        console.log("MyInfoController and myInfo is: ", myInfo);
    };
})();