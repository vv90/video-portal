/**
 * Created by Vladimir on 8/2/2016.
 */

describe('Auth service', function () {
	beforeEach(module('videoPortal'));

	var authService;
	var $httpBackend;
	var $rootScope;
	var Session;
	var events;

	beforeEach(inject(function (_authService_, _$httpBackend_, _$rootScope_, _Session_, _events_) {
		authService = _authService_;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		Session = _Session_;
		events = _events_;
	}));

	describe('login', function (){
		it ('forms login request correctly', function () {
			$httpBackend.whenPOST('/user/auth')
				.respond({status: 'success', username: 'user', sessionId: '1'});

			authService.login('user', 'password');

			$httpBackend.expectPOST('/user/auth', {
				username: 'user',
				password: '5f4dcc3b5aa765d61d8327deb882cf99'
			});
			$httpBackend.flush();
		});

		it ('does not require authorization', function () {
			Session.destroy();
			$httpBackend.whenPOST('/user/auth')
				.respond({status: 'success', username: 'user', sessionId: '1'});

			authService.login('user', 'password');

			$httpBackend.expectPOST('/user/auth', {
				username: 'user',
				password: '5f4dcc3b5aa765d61d8327deb882cf99'
			});
			$httpBackend.flush();
		});

		it ('returns correct data upon login', function () {
			$httpBackend.whenPOST('/user/auth')
				.respond({status: 'success', username: 'user', sessionId: '1'});

			var response = null;
			authService.login('user', 'password')
				.then(function(res) {
					response = res;
				});

			$httpBackend.expectPOST('/user/auth');
			$httpBackend.flush();
			expect(response).toEqual({status: 'success', username: 'user', sessionId: '1'});
		});

		it ('sets the session correctly upon successful login', function (){
			$httpBackend.whenPOST('/user/auth')
				.respond({status: 'success', username: 'user', sessionId: '1'});

			authService.login('user', 'password')
				.then(function(res) {
					response = res;
				});

			$httpBackend.expectPOST('/user/auth');
			$httpBackend.flush();

			expect(Session.username).toBe('user');
			expect(Session.sessionId).toBe('1');
		});

		it ('rejects promise if login response status is not success', function () {
			var error = null;
			$httpBackend.whenPOST('/user/auth')
				.respond({data: {status: 'error', error: 'error description'}});

			authService.login('user', 'password')
				.catch(function (err) {
					error = err;
				});

			$httpBackend.expectPOST('/user/auth');
			$httpBackend.flush();

			expect(error).not.toBeNull();
		});

		it ('emits login event on successful login', function () {
			$httpBackend.whenPOST('/user/auth')
				.respond({status: 'success', username: 'user', sessionId: '1'});

			var broadcastSpy = spyOn($rootScope, '$broadcast');
			authService.login('user', 'password');

			$httpBackend.expectPOST('/user/auth');
			$httpBackend.flush();
			expect(broadcastSpy).toHaveBeenCalledWith(events.auth.login, 'user');
		});
	});

	describe('logout', function () {
		it ('forms logout request correctly', function () {
			$httpBackend.whenGET('/user/logout?sessionId=1')
				.respond({status: 'success'});

			Session.sessionId = 1;
			authService.logout();

			$httpBackend.expectGET('/user/logout?sessionId=1');
			$httpBackend.flush();
		});

		it ('terminates the current session after logout', function () {
			Session.create('use', 1);

			$httpBackend.whenGET('/user/logout?sessionId=1')
				.respond({status: 'success'});

			Session.sessionId = 1;
			authService.logout();

			$httpBackend.expectGET('/user/logout?sessionId=1');
			$httpBackend.flush();
			expect(Session.username).toBe(null);
			expect(Session.sessionId).toBe(null);
		});
	});

});