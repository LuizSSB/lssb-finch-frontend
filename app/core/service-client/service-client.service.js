'use strict';

angular
  .module('finch.serviceClient', ['finch.config'])
  .factory('ServiceClient', ['$http', 'Config',
    function ($http, Config) {

      let _requestFilter = null;
      function setRequestFilter (filter) {
        _requestFilter = filter;
      }
      function getRequestFilter () {
        return _requestFilter || function (action, path, data) {};
      }

      function _performHttpAction (action, path, data) {
        const requestFilter = getRequestFilter();
        _requestFilter(action, path, data);

        let queryString = "?format=json";
        if (action === 'get') {
          for (let key in data) {
            queryString += `&${key}=${data[key]}`;
          }
        }

        const url = Config.getBaseURL() + path + queryString;
        return $http[action](url, data)
          .then((res) => res.data);
      }

      function logIn (username, password, rememberMe) {
        return _performHttpAction('get', 'auth/credentials', {
          username, password, rememberMe
        })
          .then(data => {
            return DTO.new.User({
              username: data.UserName,
              sessionId: data.SessionId
            });
          })
      }

      function register (user) {
        return _performHttpAction('post', 'register', user);
      }

      return {
        getRequestFilter,
        setRequestFilter,
        logIn,
        register
      };
    }
  ]);
