'use strict';

angular
  .module('finch.alert', ['oitozero.ngSweetAlert'])
  .factory('AlertUtil', ['SweetAlert',
    function (SweetAlert) {
      const DEFAULT_TITLE_ERROR = 'Não foi possível realizar a operação';
      const DEFAULT_TITLE_SUCCESS = "Successo";
  
      function _getMessage (ex) {
        switch (ex.status) {
          case 400:
            return 'Dados inválidos. ' +
            'Certifique-se que todos os campos estão preenchidos corretamente e que não repetem dados já cadastrados.';
          case 401:
            return 'Ops, parece que o seu usuário não existe.\nCertifique-se que seus dados estão corretos.';
          default:
            return 'Tente novamente mais tarde.';
        }
      }
  
      return {
        wsException: (ex) => {
          console.log('err', ex);
          SweetAlert.swal(DEFAULT_TITLE_ERROR, _getMessage(ex), 'warning');
        },
        wsExceptionTryAgain: (ex, tryAgain) => {
          console.log('err', ex);
          SweetAlert.swal(
            {
              title: DEFAULT_TITLE_ERROR,
              text: _getMessage(ex),
              type: 'warning',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Tentar novamente.',
              closeOnConfirm: true
            }, 
            tryAgain
          );
        },
        error: (msg) => {
          SweetAlert.swal(DEFAULT_TITLE_ERROR, msg, 'warning');
        },
        success: (msg, callback) => {
          SweetAlert.swal(
            {
              title: DEFAULT_TITLE_SUCCESS,
              text: msg,
              type: 'success',
              showCancelButton: true,
              closeOnConfirm: true
            },
            callback
          )
        }
      };
    }
  ]);
