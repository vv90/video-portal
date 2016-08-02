/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function loginCtrl($scope, authService) {
		$scope.error = null;
		$scope.cancel = function () {
			$scope.hideLogin();
		};

		$scope.login = function (username, password) {
			authService.login(username, password)
				.then(function (response) {
					// set the user on the App Controller
					$scope.setUser();
					$scope.hideLogin();
				})
				.catch(function (err) {
					$scope.error = err.error;
				});
		};
	}
	loginCtrl.$inject = ['$scope', 'authService'];

	angular.module('videoPortal').controller('LoginCtrl', loginCtrl);
})();