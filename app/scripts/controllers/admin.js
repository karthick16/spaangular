'use strict';

angular.module('angularPassportApp')
  .controller('AdminCtrl', function ($scope,Categories) {
	  
	  //Get All the blogs.
	  $scope.create = function() {
		  console.log("collectionDescription", $scope.collectionDescription);
		  console.log("collectionName", $scope.collectionName);
		  
		  	var category = new Categories({
		  		categoryname: $scope.collectionName,
		  		description: $scope.collectionDescription       
		      });
		  	console.log("category-->" , category);
		  	category.$save(function(response) {
		        //$location.path("blogs/" + response._id);
		  		console.log("Collections saved Successfully...");
		  		$scope.collectionDescription = "";
		  		$scope.collectionName = "";
		  		$scope.message = "Collection saved Successfully";
		    });
	  };
  });
