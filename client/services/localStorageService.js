/**
 * Created by Vladimir on 8/2/2016.
 */

(function () {
	'use strict';

	// wrap local storage in a service to help with the testing
	function localStorageService() {
		return {
			setItem: function (key, value) {
				localStorage.setItem(key, JSON.stringify(value));
			},
			getItem: function (key) {
				return JSON.parse(localStorage.getItem(key));
			},
			removeItem: function (key) {
				localStorage.removeItem(key);
			}
		}
	}

	angular.module('videoPortal').factory('localStorageService', localStorageService);
})();