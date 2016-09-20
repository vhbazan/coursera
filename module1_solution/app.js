(function (){
    'use strict';

    angular.module('lunchChecker', [])
    .controller('LunchCheckerController', LunchCheckerController);

    LunchCheckerController.$inject = ['$scope'];
    function LunchCheckerController ($scope) {
        $scope.message; 
        $scope.list;
        $scope.checkListLength;
        $scope.ckeckList = function () {
            if($scope.list) {

                $scope.checkListLength= $scope.list.split(",").length;
                if($scope.checkListLength <= 3 ) {
                    $scope.message = "Enjoy!";
                }
                else {
                    //var ele = $scope.list.split(",");

                    $scope.message = "Too much!";
                    
                }
            }
            else {
                $scope.checkListLength = 0;
            }
        }

    }; 
})();