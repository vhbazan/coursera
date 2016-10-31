(function () {
    'use strict';
    angular.module('public')
    .service('MyInfoService', MyInfoService);

    MyInfoService.$inject = [];

    function MyInfoService () {
        var service = this;

        service.myInfo;

        service.setMyInfo = function (my_info) {
            service.myInfo = my_info;
        }

        service.getMyInfo = function () {
            return service.myInfo;
        }
    }
}
    )();
