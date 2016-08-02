/**
 * Created by Vladimir on 8/1/2016.
 */

describe('App controller', function () {
	beforeEach(module('videoPortal'));
	var $controller;
	var $rootScope;
	beforeEach(inject(function(_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
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
});