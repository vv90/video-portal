/**
 * Created by Vladimir on 7/31/2016.
 */

(function () {
	'use strict';

	function navItemDirective($location) {
		return {
			restrict: 'E',
			templateUrl: '/templates/navItem.html',
			scope: {
				route: '&route'
			},
			link: function (scope) {
				scope.navActive = function () {
					return $location.path() === scope.route();
				}
			},
			transclude: true
		}
	}
	navItemDirective.$inject = ['$location'];

	angular.module('videoPortal').directive('navItem', navItemDirective);
})();