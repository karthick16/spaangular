'use strict';

angular.module('angularPassportApp')
  .controller('MainCtrl', function ($scope, Categories,Blogs, $location, $routeParams, $rootScope) {
	  //Get all the Categories.
	  $scope.getCategories = function() {
		  Categories.query(function(categories) {
			  console.log("categories" , categories);
	          $scope.categoryList = categories;
	      });
	  };		  
	  //Get All the blogs.
	  $scope.find = function() {
	      Blogs.query(function(blogs) {
	    	console.log("Find blogs" , blogs);
	        $scope.blogs = blogs;
	      });
	  };
  });
