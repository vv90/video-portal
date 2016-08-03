/**
 * Created by Vladimir on 7/31/2016.
 */

(function () {
	'use strict';

	var app = angular.module('videoPortal', ['ngRoute']);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/videos', {
				templateUrl: '/templates/videos.html',
				controller: 'VideosCtrl'
			})
			.when('/video/:id', {
				templateUrl: 'templates/playVideo.html',
				controller: 'PlayVideoCtrl'
			})
			.when('/', {
				templateUrl: 'templates/home.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

	app.run(['$rootScope', '$location', '$window', 'authService', 'Session', 'localStorageService', 'events',
		function ($rootScope, $location, $window, authService, Session, localStorageService, events) {

			// restore current session from the local storage
			var lastSession = localStorageService.getItem('session');
			if (lastSession) {
				Session.create(lastSession.username, lastSession.sessionId);
			}

			$rootScope.$on('$routeChangeStart', function (event, next, current) {
				if (next.$$route && !authService.isAuthorized(next.$$route.originalPath)) {
					$location.path('/');
					$rootScope.$broadcast(events.auth.loginChallenge, next.$$route.originalPath);
				}
			});

			$rootScope.$on(events.auth.loginChallengeSuccess, function (event, originalPath){
				$location.path(originalPath);
			});

			$rootScope.$on(events.auth.logout, function () {
				$location.path('/');
			});


		}
	]);
})();