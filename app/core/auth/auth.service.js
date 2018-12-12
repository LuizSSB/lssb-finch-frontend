'use strict';

angular
  .module('finch.auth', ['finch.config', 'finch.serviceClient'])
  .factory('Auth', ['Config', 'ServiceClient',
    function (Config, ServiceClient) {
      ServiceClient.setRequestFilter(function (action, url, data) {
        data.sessionId = Config.getSession();
      });

      function isLoggedIn () {
        return Config.getSession() !== null;
      }

      function logIn (username, password, rememberMe) {
        return ServiceClient.logIn(username, password, rememberMe)
          .then((user) => {
            Config.setSession(user);
          });
      }

      function logOut () {
        return new Promise((resolve, reject) => {
          Config.setSessionId(null);
          resolve();
        });
      }

      function register (username, password, email) {
        const user = DTO.new.User({ username, password, email });
        return ServiceClient.register(user);
      }

      return  {
        isLoggedIn,
        logIn,
        logOut,
        register
      };
    }
  ]);
