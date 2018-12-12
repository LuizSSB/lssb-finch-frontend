'use strict';

angular
  .module('finch.auth', ['finch.serviceClient'])
  .factory('Auth', ['ServiceClient',
    function (ServiceClient) {
    	ServiceClient.setRequestFilter(function (action, url, data) {
    		if (isLoggedIn()) {
    			data.sessionId = 'token';
    		}
    	});

    	function isLoggedIn () {
    		return false;
    	}

    	function logIn (username, password, rememberMe) {
    		return ServiceClient.logIn(username, password, rememberMe)
    			.then((data) => {

    			});
    	}

    	function logOut () {
    	}

    	function register (username, password, email) {
    	}

    	return  {
    		isAuthenticated,
    		logInt,
    		logOut,
    		register
    	};
    }
  ]);
