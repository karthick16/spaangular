angular.module('angularPassportApp')
				.factory('AjaxService', ['$http', function ($http) {
        // setting timeout of 1 second to simulate a busy server.
	return {
		AjaxGet : function (route, successFunction, errorFunction) {           
            setTimeout(function () {
                $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {           
                    successFunction(response, status);
                }).error(function (response) {                    
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 1000);

        }
	} 

    }]);



