/**
 * Created by Vladimir on 8/4/2016.
 */

(function () {
	'use strict';

	function notificationDirective() {
		return {
			restrict: 'E',
			templateUrl: '/templates/notification.html',
			controller: 'NotificationCtrl',
			scope: {}
		}
	}

	angular.module('videoPortal').directive('vpNotification', notificationDirective);
})();