/**
 * Created by Vladimir on 8/4/2016.
 */

(function () {
	'use strict';

	function notificationCtrl($scope, $timeout, events) {
		$scope.notificationActive = false;
		$scope.header = null;
		$scope.text = null;

		$scope.$on(events.notification, function (event, notification) {
			$scope.header = notification.header;
			$scope.text = notification.text;
			$scope.notificationActive = true;
			$timeout(function () {
				$scope.notificationActive = false;
			}, notification.timeout || 5000);
		});
	}
	notificationCtrl.$inject = ['$scope', '$timeout', 'events'];

	angular.module('videoPortal').controller('NotificationCtrl', notificationCtrl);
}());