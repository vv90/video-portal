/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';



	function authService ($rootScope, Session, BaseDataService, md5Service, events) {

		// inherit from the base service
		var AuthService = function () {
			BaseDataService.apply(this, arguments);
		};
		AuthService.prototype = new BaseDataService();

		AuthService.prototype.login = function (username, password) {
			return this.makeRequest({
					url: '/user/auth',
					method: 'POST',
					data: { username: username, password: md5Service.hash(password) }
				}, function (response) {
					return response.data;
				}, true
			)
			.then(function (data) {
				Session.create(data.username, data.sessionId);
				$rootScope.$broadcast(events.auth.login, Session.username);
				return data;
			});
		};

		AuthService.prototype.logout = function () {
			return this.makeRequest({
				url: '/user/logout',
				method: 'GET',
				params: { sessionId: Session.sessionId }
			}).then(function (data) {
				$rootScope.$broadcast(events.auth.logout, Session.username);
				Session.destroy();
				return data;
			});
		};

		AuthService.prototype.isAuthorized = function (path) {
			// enough for now
			return (path === '/' || Session.username);
		};

		return new AuthService();
	}
	authService.$inject = ['$rootScope', 'Session', 'BaseDataService', 'md5Service', 'events'];

	angular.module('videoPortal')
		.factory('authService', authService);
})();