/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function appCtrl($scope, authService, Session) {
		$scope.currentUser = null;
		$scope.loginActive = false;
		$scope.showLogin = function () {
			$scope.loginActive = true;
		};
		$scope.hideLogin = function () {
			$scope.loginActive = false;
		};
		$scope.setUser = function () {
			$scope.currentUser = Session.username;
		};
		$scope.logOut = function () {
			authService.logout().then(function () {
				$scope.currentUser = null;
			});

		};
	}
	appCtrl.$inject = ['$scope', 'authService', 'Session'];

	angular.module('videoPortal').controller('AppCtrl', appCtrl);
})();