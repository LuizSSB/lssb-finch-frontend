'use strict';

angular
  .module('finch.alert', ['oitozero.ngSweetAlert'])
  .factory('AlertUtil', ['SweetAlert',
    function (SweetAlert) {
    	return {
    		alertWSException: function (ex) {
    			let msg = null;

    			switch (ex.status) {
    				case 400:
    					msg = 'Campos preenchidos incorretamente. ' +
    					'Certifique-se de que todos os campos estão preenchidos e que não repetem dados já cadastrados.'
    					break;
    				case 401:
	    				msg = 'Ops, parece que o seu usuário não existe.\nCertifique-se que seus dados estão corretos.'
	    				break;
    				default:
    					msg = 'Tente novamente mais tarde.'
    					break;
    			}

				SweetAlert.swal('Não foi possível realizar a operação', msg, 'warning');
    		}
    	};
    }
  ]);
