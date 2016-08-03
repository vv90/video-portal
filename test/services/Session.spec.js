/**
 * Created by Vladimir on 8/2/2016.
 */

describe('Session', function () {
	beforeEach(module('videoPortal'));

	var Session;
	var localStorageService;
	beforeEach(inject(function (_Session_, _localStorageService_) {
		Session = _Session_;
		spyOn(_localStorageService_, 'setItem');
		spyOn(_localStorageService_, 'getItem');
		spyOn(_localStorageService_, 'removeItem');
		localStorageService = _localStorageService_;
	}));

	it('creates new session correctly', function () {
		Session.create('user', '1');

		expect(Session.username).toBe('user');
		expect(Session.sessionId).toBe('1');
	});

	it ('destroys session correctly', function () {
		Session.create('user', 1);

		Session.destroy();

		expect(Session.username).toBe(null);
		expect(Session.sessionId).toBe(null);
	});

	it ('saves itself to local storage when created', function (){
		Session.create('user', 1);

		expect(localStorageService.setItem)
			.toHaveBeenCalledWith('session', {username: 'user', sessionId: 1});
	});

	it ('removes itself from local storage when destroyed', function () {
		Session.create('user', 1);

		Session.destroy();

		expect(localStorageService.removeItem).toHaveBeenCalledWith('session');
	});
});