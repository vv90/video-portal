/**
 * Created by Vladimir on 8/2/2016.
 */

(function () {
	'use strict';

	function Session (localStorageService) {
		this.create = function (username, sessionId) {
			this.username = username;
			this.sessionId = sessionId;

			localStorageService.setItem('session', {username: username, sessionId: sessionId});
		};

		this.destroy = function () {
			this.username = null;
			this.sessionId = null;

			localStorageService.removeItem('session');
		}
	}
	Session.$inject = ['localStorageService'];

	angular.module('videoPortal')
		.service('Session', Session);
})();