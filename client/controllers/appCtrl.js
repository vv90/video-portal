/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function appCtrl($scope) {
		$scope.currentUser = null;
		$scope.loginActive = false;
		$scope.logIn = function () {
			$scope.currentUser = "Tom Anderson";
		};
		$scope.logOut = function () {
			$scope.currentUser = null;
		};
	}
	appCtrl.$inject = ['$scope'];

	angular.module('videoPortal').controller('AppCtrl', appCtrl);
})();