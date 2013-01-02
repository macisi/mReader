'use strict';

/* app module */
angular.module('reader', ['reader.filters', 'reader.services', 'reader.directives']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/result', {templateUrl: 'partials/searchResult.html', controller: MyCtrl1});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
//        $routeProvider.otherwise({redirectTo: '/view1'});
}]);
