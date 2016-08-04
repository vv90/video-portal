/**
 * Created by Vladimir on 8/1/2016.
 */

(function (){
	'use strict';

	function loginCtrl($scope, authService, events) {
		$scope.error = null;
		$scope.loginActive = false;
		$scope.username = '';
		$scope.password = '';

		var loginChallengeReturnPath = null;

		function close() {
			$scope.loginActive = false;
			$scope.error = null;
			loginChallengeReturnPath = null;
		}

		$scope.cancel = function () {
			close();
		};

		$scope.login = function (username, password) {
			if (!username || ! password) {
				$scope.error = 'Please enter correct login credentials';
				return;
			}
			authService.login(username, password)
			 	.then(function (response) {

				    if (loginChallengeReturnPath) {
					    $scope.$emit(events.auth.loginChallengeSuccess, loginChallengeReturnPath);
				    }

				    close();
			 	})
				.catch(function (err) {
					$scope.error = err.error;
				});
		};

		$scope.$on(events.auth.loginChallenge, function (event, originalPath) {
			$scope.loginActive = true;
			loginChallengeReturnPath = originalPath;
		});
	}
	loginCtrl.$inject = ['$scope', 'authService', 'events'];

	angular.module('videoPortal').controller('LoginCtrl', loginCtrl);
})();