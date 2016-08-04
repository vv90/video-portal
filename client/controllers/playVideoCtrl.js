/**
 * Created by Vladimir on 8/3/2016.
 */

(function() {
	'use strict';

	function playVideoCtrl($scope, $routeParams, $rootScope, videoService, events) {

		$scope.video = null;
		videoService.get($routeParams.id).then(function (video) {
			$scope.video = video;
		});
		$scope.rate = function (rating) {
			videoService.rate($scope.video._id, rating).then(function (video) {
				$scope.video = video;
				$rootScope.$broadcast(events.notification, {
					header: 'Thank you!',
					text: 'Your rating has been submitted'
				})
			});
		};
	}
	playVideoCtrl.$inject = ['$scope', '$routeParams', '$rootScope', 'videoService', 'events'];

	angular.module('videoPortal').controller('PlayVideoCtrl', playVideoCtrl);
})();