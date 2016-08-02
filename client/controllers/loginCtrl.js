/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function loginCtrl($scope, authService) {
		$scope.cancel = function () {
			$scope.hideLogin();
		};

		$scope.login = function (username, password) {
			authService.login(username, password)
				.then(function (response) {
					// set the user on the App Controller
					$scope.setUser(response.username);
					$scope.hideLogin();
				});
		};
	}
	loginCtrl.$inject = ['$scope', 'authService'];

	angular.module('videoPortal').controller('LoginCtrl', loginCtrl);
})();