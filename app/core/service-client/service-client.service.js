'use strict'

angular
  .module('finch.serviceClient', ['finch.config'])
  .factory('ServiceClient', ['$http', 'Config',
    function ($http, Config) {
      let _requestFilter = null
      function setRequestFilter (filter) {
        _requestFilter = filter
      }
      function getRequestFilter () {
        return _requestFilter || function () {}
      }

      let _unauthorizedHandler = null
      function setUnauthorizedHandler (handler) {
        _unauthorizedHandler = handler
      }
      function getUnauthorizedHandler () {
        return _unauthorizedHandler || function () {}
      }

      function _performHttpAction (action, path, data, options) {
        data = data || {}
        options = options || {}
        const requestFilter = getRequestFilter()
        requestFilter(action, path, data || {})

        let queryString = '?format=json'
        if (action === 'get') {
          for (let key in data) {
            if (data[key] !== undefined && data[key] !== null) {
              queryString += `&${key}=${data[key]}`
            }
          }
        }

        const url = Config.getBaseURL() + path + queryString
        return $http[action](url, data)
          .then(res => res.data)
          .catch(ex => {
            if (ex.status === 401 && !options.ignoreUnauthorized) {
              const unauthorizedHandler = getUnauthorizedHandler()
              unauthorizedHandler(action, path, data)
            }

            throw ex
          })
      }

      function logIn (username, password, rememberMe) {
        return _performHttpAction('get', 'auth/credentials', {
          username, password, rememberMe
        }, { ignoreUnauthorized: true })
          .then(data => {
            return DTO.new.User({
              username: data.UserName,
              sessionId: data.SessionId
            })
          })
      }

      function register (user) {
        return _performHttpAction('post', 'register', user)
      }

      function searchProtests (searchRequest) {
        return _performHttpAction('get', 'protests', searchRequest)
          .then(data => data.protests)
      }

      function getProtest (protestId) {
        return _performHttpAction('get', 'protests/' + protestId)
          .then(data => data.protest)
      }

      function updateProtest (updateRequest) {
        return _performHttpAction('put', 'protests/update', updateRequest)
      }

      function uploadProtests (uploadRequest) {
        return _performHttpAction('post', 'protests/file', uploadRequest)
      }

      return {
        getRequestFilter,
        setRequestFilter,
        setUnauthorizedHandler,
        getUnauthorizedHandler,
        logIn,
        register,
        searchProtests,
        getProtest,
        updateProtest,
        uploadProtests
      }
    }
  ])
