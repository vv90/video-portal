/**
 * Created by Vladimir on 8/1/2016.
 */

describe('Login controller', function (){
	beforeEach(module('videoPortal'));

	var $controller;

	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	describe('login', function () {
		// var $q;
		// var authService;
		var $scope = {};
		var loginSpy;


		beforeEach(inject(function($rootScope, authService, $q) {
			//$q = _$q_;
			//authService = _authService_;

			$scope = $rootScope.$new();
			$scope.setUser = jasmine.createSpy('setUSer');
			$scope.hideLogin = jasmine.createSpy('hideLogin');

			$controller('LoginCtrl', {$scope: $scope, authService: authService});
			loginSpy = spyOn(authService, 'login').and.callFake(function (username, password) {
				return $q.when({status: 'success', username: username, sessionId: 'sessionid'});
			});
		}));

		it ('calls authService with correct parameters', function () {
			$scope.login('user', 'password');
			$scope.$apply();

			expect(loginSpy).toHaveBeenCalledWith('user', 'password');
		});

		it ('sets a user on a parent scope upon successful login', function (){
			$scope.login('user1', 'password');
			$scope.$apply();

			expect($scope.setUser).toHaveBeenCalledWith('user1');
		});

		it ('hides login dialog upon successful login', function () {
			$scope.login('user', 'password');
			$scope.$apply();

			expect($scope.hideLogin).toHaveBeenCalled();
		});

		it ('shows error if login failed', function () {
			fail();
		});
	});

	it ('hides login dialog upon clicking cancel', function () {
		var scope = {
			hideLogin: jasmine.createSpy('hideLogin')
		};
		$controller('LoginCtrl', {$scope: scope});

		scope.cancel();

		expect(scope.hideLogin).toHaveBeenCalled();
	})
});