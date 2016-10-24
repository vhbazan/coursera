(function () {
    'use strict';
    angular.module('public')
    .controller('SignupController', SignupController);


    SignupController.$inject = ['MenuService', 'MyInfoService'];

    function SignupController(MenuService, MyInfoService){
        var ctrl = this; 
        ctrl.dishIdError = false;
        ctrl.savedDisIdMessage = false; 

        ctrl.submit = function () {
            console.log("submit pressed: " , ctrl.user.dishId);
            MenuService.getMenuItem(ctrl.user.dishId).then(function(response) {
                console.log('response: ', response)
                if (response.status===500) {
                    ctrl.dishIdError= "No such menu number exists";
                    ctrl.savedDisIdMessage = false; 
                }
                else {
                    ctrl.user.favouriteDish = response;
                    MyInfoService.setMyInfo(ctrl.user);
                    ctrl.savedDisIdMessage = "Your information has been saved";
                    ctrl.dishIdError= false;   
                }
            });

        }
    };


})();