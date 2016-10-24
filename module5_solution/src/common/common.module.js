(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://vhbazanm-restaurant.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
