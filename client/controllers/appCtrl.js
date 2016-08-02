/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function appCtrl($scope, authService) {
		$scope.currentUser = null;
		$scope.loginActive = false;
		$scope.showLogin = function () {
			$scope.loginActive = true;
		};
		$scope.hideLogin = function () {
			$scope.loginActive = false;
		};
		$scope.setUser = function (username) {
			$scope.currentUser = "Tom Anderson";
		};
		$scope.logOut = function () {
			authService.logout().then(function () {
				$scope.currentUser = null;
			});

		};
	}
	appCtrl.$inject = ['$scope', 'authService'];

	angular.module('videoPortal').controller('AppCtrl', appCtrl);
})();