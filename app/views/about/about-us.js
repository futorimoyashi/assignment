'use strict';

angular.module('myApp.about', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/aboutUs', {
            templateUrl: 'views/about/about.html',
        });
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'views/about/contact.html',
        });
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/feedback', {
            templateUrl: 'views/about/fb.html',
        });
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/faq', {
            templateUrl: 'views/about/faq.html',
        });
    }]);
