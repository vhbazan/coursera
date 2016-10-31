(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(item_id) {
    return $http({
      method: 'GET',
      url: (ApiPath + '/menu_items/' + item_id + '.json')
      })
    .then(function(response) {
            return response.data;
          })
    .catch(function(responseError) {
        return responseError;
        /* I will leave this here to see if I could make it possible to work using the throw new
         Error */
        // throw new Error("No such menu number exists");
    });
  };
};
})();
