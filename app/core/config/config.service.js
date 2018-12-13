'use strict'

angular
  .module('finch.config', ['LocalStorageModule'])
  .factory('Config', ['localStorageService',
    function (localStorageService) {
      const KEY_SESSION = 'session'
      const KEY_BASEURL = 'baseURL'

      return {
        getSession: () => localStorageService.get(KEY_SESSION) || null,
        setSession: session => localStorageService.set(KEY_SESSION, session),
        getBaseURL: () => localStorageService.get(KEY_BASEURL) || null,
        setBaseURL: baseURL => {
          if (baseURL && baseURL.indexOf('http') !== 0) {
            baseURL = 'http://' + baseURL
          }

          if (baseURL.lastIndexOf('/') !== baseURL.length - 1) {
            baseURL += '/'
          }

          localStorageService.set(KEY_BASEURL, baseURL)
        }
      }
    }
  ])
