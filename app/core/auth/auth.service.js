'use strict';

angular
  .module('finch.auth', ['LocalStorageModule', 'finch.serviceClient'])
  .factory('Auth', ['localStorageService', 'ServiceClient',
    function (localStorageService, ServiceClient) {
    	const KEY_SESSION = 'session';
    	function _getSession () {
    		return localStorageService.get(KEY_SESSION) || null;
    	}
    	function _setSession (session) {
    		return localStorageService.set(KEY_SESSION, session);
    	}

    	ServiceClient.setRequestFilter(function (action, url, data) {
    		data.sessionId = _getSession();
    	});

    	function isLoggedIn () {
    		return _getSession() !== null;
    	}

    	function logIn (username, password, rememberMe) {
    		return ServiceClient.logIn(username, password, rememberMe)
    			.then((user) => {
    				_setSession(user);
    			});
    	}

    	function logOut () {
    		return new Promise((resolve, reject) => {
    			_setSessionId(null);
    			resolve();
    		});
    	}

    	function register (username, password, email) {
            
    	}

    	return  {
    		isLoggedIn,
    		logIn,
    		logOut,
    		register
    	};
    }
  ]);
