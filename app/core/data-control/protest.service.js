'use strict';

angular
  .module('finch.dataControl', ['finch.serviceClient'])
  .factory('ProtestDataCtrl', ['ServiceClient',
    function (ServiceClient) {
      function search (searchOptions) {
        return ServiceClient.searchProtests(searchOptions)
      }

      function getById (protestInternalId) {
        return ServiceClient.getProtest(protestInternalId);
      }

      function update (protest) {
        return ServiceClient.updateProtest(DTO.new.UpdateProtestRequest({
          protest
        }));
      }

      return {
        search,
        getById,
        update
      };
    }
  ]);
