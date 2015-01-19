'use strict';

angular.module('angularPassportApp')
  .controller('ProfileCtrl', function ($scope,$routeParams,$http,Categories) {   
	//Profile controller.
    $scope.initProfileCtrl = function() {    	
    	//Populate Categories
		Categories.query(function(categories) {			  
	          $scope.categoryList= categories;	         
		});    	
    	//Get the blogs written by the user.
    	// Simple GET request example :
    	var link = "/api/profile/" + $routeParams.username;
    	$http.get(link).
    	  success(function(data, status, headers, config) {
    	    console.log("data" , data);
    	    $scope.blogs= data;
    	  }).
    	  error(function(data, status, headers, config) {
    		  //console.log("data" , data);
    	  });
    
    };
  });