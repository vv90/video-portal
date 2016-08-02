/**
 * Created by Vladimir on 8/2/2016.
 */

(function () {
	'use strict';

	function Session () {
		this.create = function (username, sessionId) {
			this.username = username;
			this.sessionId = sessionId;
		};

		this.destroy = function () {
			this.username = null;
			this.sessionId = null;
		}
	}

	angular.module('videoPortal')
		.service('Session', Session);
})();