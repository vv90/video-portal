/**
 * Created by Vladimir on 8/3/2016.
 */

(function () {
	'use strict';

	angular.module('videoPortal').constant('events', {
		auth: {
			login: 'auth:login',
			logout: 'auth:logout',
			loginChallenge: 'auth:loginChallenge',
			loginChallengeSuccess: 'loginChallengeSuccess'
		},
		notification: 'notification'
	});
})();