var shoppingApp = angular.module('shoppingApp', ['ngRoute', 'ngResource']);
shoppingApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider

            .otherwise({
                templateUrl: 'Templates/list.html',
                controller: 'ListController'
            });
    }]);