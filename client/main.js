/**
 * Created by Vladimir on 7/31/2016.
 */
var app = {
	login: function (username, password) {
		var request = {
			username: username,
			password: MD5(password)
		};

		return $.post('/user/auth', request)
			.done(function (response) {
				if (response.status === 'success') {
					var user = {
						username: response.username,
						sessionId: response.sessionId
					};
					localStorage.setItem('user', JSON.stringify(user));
				} else {
					alert('authentication failed');
				}
			})
			.fail(function (response) {

				alert('authentication request failed');
			});
	},
	getVideos: function (skip, limit) {
		var user = JSON.parse(localStorage.getItem('user'));

		if (!user) {
			alert("You need to log in first");
			return;
		}

		var query = {
			skip: skip,
			limit: limit
		};

		return $.get('/videos', query);
	}
};
(function (){
	'use strict';


})();