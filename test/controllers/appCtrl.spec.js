/**
 * Created by Vladimir on 8/1/2016.
 */

describe('App controller', function () {
	beforeEach(module('videoPortal'));
	var $controller;
	var $rootScope;
	var Session;
	beforeEach(inject(function(_$controller_, _$rootScope_, _Session_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		Session = _Session_;
	}));

	it ('does not show login dialog when loaded', function (){
		var $scope = {};
		var controller = $controller('AppCtrl', {$scope: $scope});

		expect($scope.loginActive).toBe(false);
	});

	it ('displays login dialog upon showLogin call', function () {
		var $scope = {};
		var controller = $controller('AppCtrl', {$scope: $scope});

		$scope.showLogin();

		expect($scope.loginActive).toBe(true);
	});

	it ('sets current user from the Session when setUser is called', function () {
		var $scope = {};

		var controller = $controller('AppCtrl', {$scope: $scope});
		Session.username = 'user';

		$scope.setUser();

		expect($scope.currentUser).toBe('user');
	});
});