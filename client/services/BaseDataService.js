/**
 * Created by Vladimir on 8/2/2016.
 */

(function (){
	'use strict';

	function baseDataService ($http, $q, Session) {

		// this is a base class for all other services consuming the API
		// all services will inherit from it
		// here we define the common logic for interacting with the API
		var BaseDataService = function () {};

		BaseDataService.prototype.createError = function(errorMessages) {
			return {status: 'error', error: errorMessages}
		};

		// wrap the request logic
		// options - request options
		// responseFilter - optional function(response) indicates what part of the response to return
		// isPublic - optional allow unauthorised access
		BaseDataService.prototype.makeRequest = function (options, responseFilter, isPublic) {
			if (!isPublic && (Session.sessionId === null || Session.sessionId === undefined)) {
				return $q.reject(this.createError('Request unauthorised. You need to log in first.'));
			} else {
				return $http(options)
					.then(function (response) {
						if (response.data.status === 'success') {
							return responseFilter ? responseFilter(response) : response.data;
						} else {
							return $q.reject(response.data);
						}
				}).catch(function (response) {
					if (response.data.status === 'error' && response.data.error === 'Not Authorized.') {
						// this means that current session has expired
						Session.destroy();
						return $q.reject(response);
					} else {
						return $q.reject(response);
					}
				});
			}
		};
		return BaseDataService;
	}
	baseDataService.$inject = ['$http', '$q', 'Session'];

	// export a constructor for inheriting
	// this is supposed to be an abstract class so we don't need to return an instance
	angular.module('videoPortal').factory('BaseDataService', baseDataService);
})();