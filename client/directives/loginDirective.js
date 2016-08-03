/**
 * Created by Vladimir on 8/3/2016.
 */
(function () {
	'use strict';

	function loginDirective(events) {
		return {
			restrict: 'E',
			templateUrl: '/templates/login.html',
			controller: 'LoginCtrl',
			scope: {}
		}
	}
	loginDirective.$inject = ['events'];

	angular.module('videoPortal').directive('vpLogin', loginDirective);
})();