/**
 * Created by Vladimir on 8/3/2016.
 */
(function () {
	'use strict';

	function loginDirective() {
		return {
			restrict: 'E',
			templateUrl: '/templates/login.html',
			controller: 'LoginCtrl',
			scope: {}
		}
	}

	angular.module('videoPortal').directive('vpLogin', loginDirective);
})();