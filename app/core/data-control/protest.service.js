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

      function upload (protestsFile) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(ServiceClient.uploadProtests(
              DTO.new.UploadProtestsRequest({ textContents: reader.result })
            ));
          };
          reader.onerror = () => {
            reader.abort();
            reject(-1);
          };
          reader.readAsText(protestsFile);
        })
      }

      return {
        search,
        getById,
        update,
        upload
      };
    }
  ]);
