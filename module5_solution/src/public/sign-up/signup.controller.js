(function () {
    'use strict';
    angular.module('public')
    .controller('SignupController', SignupController);


    SignupController.$inject = ['$scope', 'MenuService', 'MyInfoService'];

    function SignupController($scope, MenuService, MyInfoService){
        var ctrl = this;
        ctrl.dishIdError = false;
        ctrl.savedDishIdMessage = false;
        ctrl.user ={};

        $scope.$watch('signupCtrl.user.dishId', function(newValue, oldValue) {
                MenuService.getMenuItem(newValue).then(function(response) {
                    if (response.status===500) {
                        ctrl.dishIdError= "No such menu number exists";
                    } else {
                        ctrl.user.favouriteDish = response;
                        ctrl.dishIdError= false;
                    }
                })
                .catch(function(err) {
                   console.log("error: ", err);
                });
        });

        ctrl.submit = function () {
            MyInfoService.setMyInfo(ctrl.user);
            ctrl.savedDishIdMessage = "Your information has been saved";
        }
    };


})();