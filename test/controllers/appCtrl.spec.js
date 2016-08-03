/**
 * Created by Vladimir on 8/1/2016.
 */

describe('App controller', function () {
	beforeEach(module('videoPortal'));
	var $controller;
	var $rootScope;
	var Session;
	var events;
	beforeEach(inject(function(_$controller_, _$rootScope_, _Session_, _events_, localStorageService) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		Session = _Session_;
		events = _events_;

		spyOn(localStorageService, 'setItem');
	}));

	it ('sets current user from Session on initialization', function () {
		Session.create('user', 1);
		var $scope = $rootScope.$new();
		$controller('AppCtrl', {$scope: $scope});

		expect($scope.currentUser).toBe('user');
	});

	it ('emits logout event on logout', inject(function ($q, authService){
		var $scope = $rootScope.$new();
		$controller('AppCtrl', {$scope: $scope});
		var emitEventSpy = spyOn($scope, '$emit');
		spyOn(authService, 'logout').and.callFake(function () {
			return $q.when({status: 'success'});
		});

		$scope.logOut();
		$scope.$apply();

		expect(emitEventSpy).toHaveBeenCalledWith(events.auth.logout);
	}));

	it ('sets current user on login event', function () {
		var $scope = $rootScope.$new();
		Session.username = 'user';
		$controller('AppCtrl', {$scope: $scope});

		$rootScope.$broadcast(events.auth.login, 'user');

		expect($scope.currentUser).toBe('user');
	});
});