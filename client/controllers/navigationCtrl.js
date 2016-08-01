/**
 * Created by Vladimir on 7/31/2016.
 */

(function () {
	'use strict';

	function navigationCtrl($scope, $location) {
		$scope.navActive = function(route) {
			return $location.path() === route;
		}
	}
	navigationCtrl.$inject = ['$scope', '$location'];

	angular.module('videoPortal').controller('NavigationCtrl', navigationCtrl);
})();