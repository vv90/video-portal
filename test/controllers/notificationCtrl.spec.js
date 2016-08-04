/**
 * Created by Vladimir on 8/4/2016.
 */

describe('Notification controller', function () {
	beforeEach(module('videoPortal'));

	var $controller;
	var $rootScope;
	var events;
	var $scope;
	var $q;
	var $timeout;

	beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$timeout_, _events_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		events = _events_;
		$scope = $rootScope.$new();
		$q = _$q_;
		$timeout = _$timeout_;

	}));

	it ('is hidden by default', function () {
		$controller('NotificationCtrl', {$scope: $scope});

		expect($scope.notificationActive).toBe(false);
	});

	it ('displays a notification upon notification event', function () {
		$controller('NotificationCtrl', {$scope: $scope});

		$rootScope.$broadcast(events.notification, {});

		expect($scope.notificationActive).toBe(true);
	});

	it ('closes notification after timeout', function () {
		$controller('NotificationCtrl', {$scope: $scope});

		$rootScope.$broadcast(events.notification, {header: 'header', text: 'notification'});
		$timeout.flush();

		expect($scope.notificationActive).toBe(false);
	});

	it ('displays correct information', function () {
		$controller('NotificationCtrl', {$scope: $scope});

		$rootScope.$broadcast(events.notification, {header: 'header', text: 'notification'});

		expect($scope.header).toBe('header');
		expect($scope.text).toBe('notification');
	});

	// it ('removes the information after the timeout', function () {
	// 	$controller('NotificationCtrl', {$scope: $scope});
	//
	// 	$rootScope.$broadcast(events.notification, {header: 'header', text: 'notification'});
	// 	$timeout.flush();
	//
	//
	// 	expect($scope.header).toBe(null);
	// 	expect($scope.text).toBe(null);
	// });
});