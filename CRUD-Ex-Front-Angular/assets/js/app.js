'use strict';

angular.module('userCRUD', [
    'ngRoute'
  , 'User'
])
  .config(['$routeProvider', function($routeProvider) {

    //$locationProvider.html5Mode(true); OBS: Injetar locationProvider.

    $routeProvider
    .when('/', {
      templateUrl: 'views/index.html'
    })
      .otherwise({redirectTo: '/'});
  }])
