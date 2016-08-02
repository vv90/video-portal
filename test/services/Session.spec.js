/**
 * Created by Vladimir on 8/2/2016.
 */

describe('Session', function () {
	beforeEach(module('videoPortal'));

	var Session;
	beforeEach(inject(function (_Session_) {
		Session = _Session_;
	}));

	it('creates new session correctly', function () {
		Session.create('user', '1');

		expect(Session.username).toBe('user');
		expect(Session.sessionId).toBe('1');
	});
});