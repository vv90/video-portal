/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function appCtrl($scope, authService, Session, events) {
		$scope.currentUser = null;

		$scope.setUser = function () {
			$scope.currentUser = Session.username;
		};
		$scope.logOut = function () {
			authService.logout().then(function () {
				$scope.setUser();
			});

		};

		$scope.setUser();

		$scope.$on(events.auth.login, function () {
			$scope.setUser();
		})
	}
	appCtrl.$inject = ['$scope', 'authService', 'Session', 'events'];

	angular.module('videoPortal').controller('AppCtrl', appCtrl);
})();