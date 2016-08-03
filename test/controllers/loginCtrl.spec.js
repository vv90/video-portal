/**
 * Created by Vladimir on 8/1/2016.
 */

describe('Login controller', function (){
	beforeEach(module('videoPortal'));

	var $controller;
	var $rootScope;
	var events;
	var $scope;

	beforeEach(inject(function (_$controller_, _$rootScope_, _events_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		events = _events_;
	}));

	describe('login', function () {
		var $q;
		var authService;

		//var loginSpy;


		beforeEach(inject(function($rootScope, _authService_, _$q_) {
			$q = _$q_;
			authService = _authService_;

			// $scope.setUser = jasmine.createSpy('setUSer');
			// $scope.hideLogin = jasmine.createSpy('hideLogin');


		}));

		it ('calls authService with correct parameters', function () {
			$controller('LoginCtrl', {$scope: $scope, authService: authService});
			var loginSpy = spyOn(authService, 'login').and.callFake(function (username, password) {
				return $q.when({status: 'success', username: username, sessionId: 'sessionid'});
			});

			$scope.login('user', 'password');
			//$scope.$apply();

			expect(loginSpy).toHaveBeenCalledWith('user', 'password');
		});

		it ('hides login dialog upon successful login', function () {
			$controller('LoginCtrl', {$scope: $scope, authService: authService});
			$scope.loginActive = true;
			var loginSpy = spyOn(authService, 'login').and.callFake(function (username, password) {
				return $q.when({status: 'success', username: username, sessionId: 'sessionid'});
			});
			$scope.login('user', 'password');
			$scope.$apply();

			expect($scope.loginActive).toBe(false);
		});

		it ('shows error if login failed', function () {
			$controller('LoginCtrl', {$scope: $scope, authService: authService});
			var loginSpy = spyOn(authService, 'login').and.callFake(function (username, password) {
				return $q.reject({status: 'error', error: 'login failed'});
			});

			$scope.login('user', 'password');
			$scope.$apply();

			expect($scope.error).toBe('login failed');
		});

		it ('emits loginChallengeSuccess event after successful loginChallenge', function () {
			$controller('LoginCtrl', {$scope: $scope, authService: authService});
			spyOn(authService, 'login').and.callFake(function (username, password) {
				return $q.when({status: 'success', username: username, sessionId: 'sessionid'});
			});
			var eventEmitSpy = spyOn($scope, '$emit');

			$rootScope.$broadcast(events.auth.loginChallenge, '/path');
			$scope.login('user', 'password');
			$scope.$apply();

			expect(eventEmitSpy).toHaveBeenCalledWith(events.auth.loginChallengeSuccess, '/path')
		});

		it ('does not emit loginChallengeSuccess without loginChallenge', function () {
			$controller('LoginCtrl', {$scope: $scope, authService: authService});
			spyOn(authService, 'login').and.callFake(function (username, password) {
				return $q.when({status: 'success', username: username, sessionId: 'sessionid'});
			});
			var eventEmitSpy = spyOn($scope, '$emit');

			$scope.login('user', 'password');
			$scope.$apply();

			expect(eventEmitSpy).not.toHaveBeenCalled();
		});
	});

	it ('hides login dialog when cancel is clicked', function () {
		$controller('LoginCtrl', {$scope: $scope});
		$scope.loginActive = true;

		$scope.cancel();

		expect($scope.loginActive).toBe(false);
	});

	it ('displays login dialog when loginRequired event is fired', function () {
		$controller('LoginCtrl', {$scope: $scope});

		$rootScope.$broadcast(events.auth.loginChallenge);

		expect($scope.loginActive).toBe(true);
	});
});