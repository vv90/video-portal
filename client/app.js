/**
 * Created by Vladimir on 7/31/2016.
 */

(function () {
	'use strict';

	angular.module('videoPortal', ['ngRoute'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/videos', {
					templateUrl: '/templates/videos.html',
					controller: 'VideosCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}]);
})();