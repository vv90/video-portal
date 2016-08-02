/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';



	function authService ($http, Session) {

		return {
			login: function (username, password) {
				return $http.post('/user/auth', { username: username, password: MD5(password) })
					.then(function (response){
						if (response.data.status === 'success') {
							Session.create(response.data.username, response.data.sessionId);

							return response.data;
						}
					})
			},
			logout: function () {
				return $http.get('/user/logout', { sessionId: Session.sessionId})
					.then(function (response) {
						if (response.status === 'success')
							Session.destroy();
					});
			}
		}
	}
	authService.$inject = ['$http', 'Session'];

	angular.module('videoPortal')
		.factory('authService', authService);
})();