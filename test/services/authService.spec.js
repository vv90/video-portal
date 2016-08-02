/**
 * Created by Vladimir on 8/2/2016.
 */

describe('Auth service', function () {
	beforeEach(module('videoPortal'));

	var authService;
	var $httpBackend;

	beforeEach(inject(function (_authService_, _$httpBackend_) {
		authService = _authService_;
		$httpBackend = _$httpBackend_;
		$httpBackend.whenPOST('/user/auth')
			.respond({status: 'success', username: 'user', sessionId: '1'});
	}));

	it ('forms login request correctly', function () {
		authService.login('user', 'password');

		$httpBackend.expectPOST('/user/auth', {
			username: 'user',
			password: '5f4dcc3b5aa765d61d8327deb882cf99'
		});
	});

	it ('returns a session upon login', function () {
		var response = null;
		authService.login('user', 'password')
			.then(function(res) {
				response = res;
			});

		$httpBackend.expectPOST('/user/auth');

		$httpBackend.flush();

		expect(response).toEqual({status: 'success', username: 'user', sessionId: '1'});
	});


});