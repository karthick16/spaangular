'use strict';

angular.module('angularPassportApp')
  .factory('User', function ($resource) {
    return $resource('/auth/users/:userId/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
