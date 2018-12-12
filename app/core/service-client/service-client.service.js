'use strict';

angular
  .module('finch.serviceClient', [])
  .factory('ServiceClient', ['$http',
    function ($http) {
    	const BASE_URL = "http://localhost:50861/"

    	let _requestFilter;
    	function setRequestFilter (filter) {
    		_requestFilter = filter;
    	}
    	function getRequestFilter () {
    		return _requestFilter || () => {};
    	}

    	function _performHttpAction (action, path, data) {
    		const url = BASE_URL + path;
    		getRequestFilter()(action, url, data);
    		return $http[action](url, data)
    			.then((res) => res.data);
    	}

    	function logIn (username, password, rememberMe) {
    		return _performHttpAction ('get', '/auth/credentials', {
    			username, password, rememberMe
    		})
    	}

    	return {
    		getRequestFilter,
    		setRequestFilter,
    		logIn
    	}
    }
  ]);
