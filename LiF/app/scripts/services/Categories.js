'use strict';

angular.module('angularPassportApp')
  .factory('Categories', function ($resource) {
	  return $resource('api/categories/:categoryId', {
	      categoryId: '@_id'
	    }, {
	      update: {
	        method: 'PUT'
	      }
	    });
  });