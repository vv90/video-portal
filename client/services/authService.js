/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';



	function authService ($http, $q, Session, BaseDataService) {

		// inherit from the base service
		var AuthService = function () {
			BaseDataService.apply(this, arguments);
		};
		AuthService.prototype = new BaseDataService();

		AuthService.prototype.login = function (username, password) {
			return this.makeRequest({
				url: '/user/auth',
				method: 'POST',
				data: { username: username, password: MD5(password) }
			}).then(function (data) {
				Session.create(data.username, data.sessionId);
				return data;
			});
		};

		AuthService.prototype.logout = function () {
			return this.makeRequest({
				url: '/user/logout',
				method: 'GET',
				params: { sessionId: Session.sessionId }
			}).then(function (data) {
				Session.destroy();
				return data;
			});
		};

		return new AuthService();
	}
	authService.$inject = ['$http', '$q', 'Session', 'BaseDataService'];

	angular.module('videoPortal')
		.factory('authService', authService);
})();